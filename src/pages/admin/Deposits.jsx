import axios from "api/axios";
import DepositsTable from "components/deposits/DepositsTable";
import FilterSearch from "components/deposits/FilterSearch";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { setDocsCount, setPage, setPages } from "store/depositsSlice";

const getAllDepositsUrl = "/api/deposit/bank";
const updateDepositRequests = "/api/deposit";
const type = "balls";
const Deposits = () => {
    const [getAllDeposits, setGetAllDeposits] = useState([]);
    const [searchDeposit, setSearchDeposit] = useState({
        status: "",
        from: "",
        to: "",
    });
    const { user } = useSelector((state) => state.admin);
    const { keyword, page } = useSelector((state) => state.deposits);
    const token = user?.token;
    const params = useParams();
    const dispatch = useDispatch();
    // get all deposits
    const getAllDeposit = async () => {
        try {
            const queryString = `?page=${page}&keyword=${keyword}&status=${searchDeposit?.status}&from=${searchDeposit?.from}&to=${searchDeposit?.to}`;
            const response = await axios.get(
                `${getAllDepositsUrl}/${params?.id}${queryString}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response;
        } catch (error) {
            const {
                response: {
                    data: { message },
                },
            } = error;
            toast.error(message);
        }
    };
    const {
        data: data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["getAllDeposit", keyword, page, searchDeposit?.status],
        queryFn: getAllDeposit,
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { docs, docsCount, page, pages },
                },
            } = data;
            setGetAllDeposits(docs);
            dispatch(setDocsCount(docsCount));
            dispatch(setPage(page));
            dispatch(setPages(pages));
        }
    }, [data]);
    // update deposit status
    const handleDeposit = async (id, status, amount) => {
        let body = { status };
        if (status === "approved") {
            body.transferAmount = amount;
        }
        if (window.confirm(`Are you sure, you want to ${status} deposit?`)) {
            try {
                let response = await axios.put(
                    `${updateDepositRequests}/${id}`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const {
                    data: {
                        data: { doc, message },
                    },
                } = response;
                const filter = getAllDeposits.filter(
                    (item) => item?._id !== doc?._id
                );
                setGetAllDeposits([...filter, doc]);
                toast.success(message);
            } catch (error) {
                const {
                    response: {
                        data: { message },
                    },
                } = error;
                toast.error(message);
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        refetch();
    };
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="uil uil-history text-2xl text-primary"></i>
                        <DashboardHeader text="Deposit History" />
                    </div>
                    <BackBtn />
                </div>
                <FilterSearch
                    searchDeposit={searchDeposit}
                    setSearchDeposit={setSearchDeposit}
                    handleSubmit={handleSubmit}
                    refetch={refetch}

                />
                <div className="flex flex-col gap-4">
                    <h6 className="text-primary font-bold mt-4 text-lg">
                        Withdrawals
                    </h6>
                    {isLoading ? (
                        <div className=" loading-center">
                            <ReactLoading
                                type={type}
                                color="orange"
                                height={"10%"}
                                width={"10%"}
                            />
                        </div>
                    ) : (
                        <DepositsTable
                            getAllDeposits={getAllDeposits}
                            handleDeposit={handleDeposit}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Deposits;
