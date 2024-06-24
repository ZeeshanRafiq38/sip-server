import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import React, { useEffect } from "react";
import defaultUser from "assets/images/default.png";
import UserDetailItem from "components/userdetail/UserDetailItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Username from "assets/svgs/Username";
import CopyReferralCode from "components/global/CopyReferralCode";
import { useState } from "react";
import Accordion from "react-accordion-comp";
import WalletDetails from "components/userdetail/WalletDetails";
import UserDescription from "components/userdetail/UserDescription";
import DepositsTable from "components/userdetail/DepositsTable";
import WithdrawlsTable from "components/userdetail/WithdrawlsTable";
import InvestsTable from "components/userdetail/InvestsTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios, { baseURL } from "api/axios";
import { toast } from "react-toastify";
import { setDescription, setSingleDoc, setTotalBalance } from "store/userSlice";
import moment from "moment/moment";

const usersUrl = "/api/user";
const UsersView = () => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => {
        setShow(!show);
    };
    const dispatch = useDispatch();
    const { singleDoc } = useSelector((state) => state.users);

    // get id from url
    const params = useParams();
    // token
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;


    // get user data
    const singleUser = async () => {
        try {
            let response = await axios.get(`${usersUrl}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            toast.error(error.message);
        }
    };
    // fetch by react-query
    const { data: Doc, isLoading } = useQuery({
        queryKey: ["getSingleUser"],
        queryFn: singleUser,
    });

    // set user data in state
    useEffect(() => {
        if (Doc) {
            const {
                data: {
                    data: { doc },
                },
            } = Doc;
            dispatch(setSingleDoc(doc));
            dispatch(setTotalBalance(doc?.wallet?.totalBalance));
            dispatch(setDescription(doc?.description));
        }
    }, [Doc]);

    return (
        <Layout>
            <div>
                <div>
                    <DashboardHeader text="User Details" />
                </div>
                <div className="grid grid-cols-5 my-6 rounded-md shadow-md">
                    <div className="bg-primary p-2 rounded-tl-md rounded-bl-md">
                        <div className="text-end ">
                            <i className="uil uil-pen border-pure border text-pure rounded-full p-1 px-2 text-lg hover:bg-pure transition-all hover:text-black cursor-pointer"></i>
                        </div>
                        <div className="flex gap-3">
                            <div className="border-pure border rounded-full">
                                <img
                                    src={baseURL + singleDoc?.image}
                                    alt=""
                                    className="w-40"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-pure font-medium">
                                    {singleDoc?.username}
                                </h3>
                                <span className="text-pure text-sm">
                                    {singleDoc?.phone}
                                </span>
                                <div className="ouline-none rounded-md flex items-center justify-center gap-2 bg-green-200 px-2">
                                    <span className="rounded-full w-2 h-2 bg-green-500"></span>
                                    <span className="text-xs text-green-500">
                                        {singleDoc?.isActive == true
                                            ? "Active"
                                            : "Offline"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-pure font-medium text-sm my-2">
                            Joined
                            {moment(singleDoc?.createdAt).format(
                                " DD MMM YYYY"
                            )}
                        </div>
                    </div>
                    <UserDetailItem
                        value={singleDoc?.wallet?.totalDepositAmount}
                        title="Total Deposit"
                    />
                    <UserDetailItem
                        value={singleDoc?.wallet?.totalWithdraw}
                        title="Total Withdraw"
                    />
                    <UserDetailItem
                        value={singleDoc?.wallet?.totalInvestAmount}
                        title="Total Invested"
                    />
                    <UserDetailItem
                        value={singleDoc?.wallet?.totalProfitEarned}
                        title="Profile Earned"
                    />
                </div>
                {/* tabs */}
                <Tabs>
                    <TabList>
                        <Tab>Users Info</Tab>
                        <Tab>Deposits</Tab>
                        <Tab>Withdrawals</Tab>
                        <Tab>Invests</Tab>
                        <Tab>Team Details</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="flex flex-col gap-6">
                            {Doc?.data?.upliner?.length > 0 ? (
                                <div className="bg-pure rounded-lg p-4 shadow-lg">
                                    <div className="flex items-center justify-between border-pure border-b-[1px]">
                                        <div className="flex items-center gap-2">
                                            <Username />
                                            <p className="text-lg font-semibold">
                                                Upliner Details
                                            </p>
                                        </div>
                                        <i
                                            onClick={toggleMenu}
                                            className="uil uil-angle-down text-2xl cursor-pointer"
                                        ></i>
                                    </div>
                                    <Accordion isOpen={show}>
                                        <div>
                                            <div className="py-8 flex items-center gap-4">
                                                <img
                                                    src="http://66.29.144.68:4646/users/1699880103925-927383349.jpg"
                                                    alt="upliner-details"
                                                    className="w-28"
                                                />
                                                <div className="flex flex-col leading-tight">
                                                    <p className="text-primary font-semibold text-lg">
                                                        Level1
                                                    </p>
                                                    <span className="text-gray text-sm">
                                                        03160680394
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <CopyReferralCode value="http://66.29.144.68:3000/register?ref_code=SIP-4okl46-_lliGZ_2ksnutJ" />
                                            </div>
                                        </div>
                                    </Accordion>
                                </div>
                            ) : (
                                <h2>Upliner Not Found</h2>
                            )}

                            <div>
                                <WalletDetails />
                            </div>
                            <div>
                                <UserDescription />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <DepositsTable />
                    </TabPanel>
                    <TabPanel>
                        <WithdrawlsTable />
                    </TabPanel>
                    <TabPanel>
                        <InvestsTable />
                    </TabPanel>
                </Tabs>
            </div>
        </Layout>
    );
};

export default UsersView;
