import axios, { baseURL } from "api/axios";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import FileInput from "components/global/FileInput";
import Layout from "components/global/Layout";
import NormalSelectBox from "components/global/NormalSelectBox";
import TextArea from "components/global/TextArea";
import Fetcher from "components/utils/Fetcher";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const withdrawDetailsUrl = "/api/withdraw";
const WithdrawRequestsDetails = () => {
    const [editWithdrawRequests, setEditWithdrawRequests] = useState({
        status: "",
        description: "",
    });
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;
    const params = useParams();
    const navigate = useNavigate();
    const { data: data, isLoading } = useQuery({
        queryKey: ["withdetails"],
        queryFn: () => Fetcher(`${withdrawDetailsUrl}/${params.id}`, user),
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { doc },
                },
            } = data;
            setEditWithdrawRequests(doc);
        }
    }, [data]);
    // console.log(editWithdrawRequests);
    const handleDepositDetails = async () => {
        try {
            const body = {
                status: editWithdrawRequests?.status,
                description: editWithdrawRequests?.description,
            };
            let response = await axios.put(
                `${withdrawDetailsUrl}/${params.id}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {
                data: {
                    data: { message },
                },
            } = response;
            toast.success(message);
            navigate(-1);
        } catch (error) {
            const {
                response: {
                    data: { message },
                },
            } = error;
            toast.error(message);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        handleDepositDetails();
    };
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Withdraw Requests Details" />
                    <BackBtn />
                </div>
                <form
                    className="p-4 rounded-md shadow-md bg-pure"
                    onSubmit={handleUpdate}
                >
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Username</h3>
                        <span className="text-primary font-medium">
                            {editWithdrawRequests?.username}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Phone No</h3>
                        <span className="text-primary font-medium">
                            {editWithdrawRequests?.phone}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Withdrawal Amount</h3>
                        <span className="text-primary font-medium">
                            {editWithdrawRequests?.withdrawAmount}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Sevice Charges</h3>
                        <span className="text-primary font-medium">
                            {Math.round(editWithdrawRequests?.withdrawFee)}
                        </span>
                    </div>
                    {/* <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Transfer Amount</h3>
                        <span className="text-primary font-medium">1,067</span>
                    </div> */}
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Date</h3>
                        <span className="text-primary font-medium">
                            {moment(editWithdrawRequests?.createdAt).format(
                                "DD MMM YYYY"
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Bank Name</h3>
                        <span className="text-primary font-semibold">
                            {editWithdrawRequests?.withdrawBank?.bankName}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Account Holder</h3>
                        <span className="text-primary font-semibold">
                            {editWithdrawRequests?.withdrawBank?.accountHolder}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b-[1px] border-slate-200">
                        <h3 className="font-semibold">Account Number</h3>
                        <span className="text-primary font-semibold">
                            {editWithdrawRequests?.withdrawBank?.accountNo}
                        </span>
                    </div>
                    <div className="my-4">
                        <NormalSelectBox
                            label="Status"
                            options={[
                                { value: "pending", label: "Pending" },
                                { value: "completed", label: "Completed" },
                                { value: "declined", label: "Declined" },
                            ]}
                            name="status"
                            data={editWithdrawRequests}
                            setData={setEditWithdrawRequests}
                        />
                    </div>

                    <TextArea
                        label="Reason"
                        placeholder="write here..."
                        name="description"
                        data={editWithdrawRequests}
                        setData={setEditWithdrawRequests}
                    />
                    {/* <div className="py-2">
                        <FileInput
                            label="Receipt Proof"
                            value={editWithdrawRequests?.proof}
                            setValue={(value) =>
                                setEditWithdrawRequests({
                                    ...editWithdrawRequests,
                                    proof: value,
                                })
                            }
                        />
                    </div> */}
                    <div className="my-2">
                        <button className="btn-primary">Done</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default WithdrawRequestsDetails;
