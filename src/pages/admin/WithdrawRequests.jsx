import axios from "api/axios";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import FilterWithdrawRequests from "components/withdrawRequests/FilterWithdrawRequests";
import WithdrawHistoryTable from "components/withdrawRequests/WithdrawHistoryTable";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setDocsCount, setPage, setPages } from "store/withdrawRequestsSlice";
import ReactLoading from "react-loading";

const withdrawRequestsUrl = "/api/withdraw";
const WithdrawRequests = () => {
    const [getAllWithdraws, setGetAllWithdraws] = useState([]);
    const [searchWithdraw, setSearchWithdraw] = useState({
        status: "",
        from: "",
        to: "",
    });
    const { user } = useSelector((state) => state.admin);
    const { keyword, page } = useSelector((state) => state.withdrawRequests);
    const token = user?.token;
    const dispatch = useDispatch();
    // get all deposits
    const getWithdraws = async () => {
        try {
            const queryString = `?page=${page}&keyword=${keyword}&status=${searchWithdraw?.status}&from=${searchWithdraw?.from}&to=${searchWithdraw?.to}`;
            const response = await axios.get(
                `${withdrawRequestsUrl}/${queryString}`,
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
        queryKey: ["getwithdraws", keyword, page, searchWithdraw?.status],
        queryFn: getWithdraws,
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { docs, docsCount, page, pages },
                },
            } = data;
            setGetAllWithdraws(docs);
            dispatch(setDocsCount(docsCount));
            dispatch(setPage(page));
            dispatch(setPages(pages));
            console.log(docs)
        }
    }, [data]);
    // update deposit status
    const handleWithdraw = async (id, status) => {
        let body = { status };
        if (window.confirm(`Are you sure, you want to ${status} deposit?`)) {
            try {
                let response = await axios.put(
                    `${withdrawRequestsUrl}/${id}`,
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
                const filter = getAllWithdraws.filter(
                    (item) => item?._id !== doc?._id
                );
                setGetAllWithdraws([...filter, doc]);
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
                    <DashboardHeader text="Withdraw Requests" />
                    <BackBtn />
                </div>
                <div>
                    <FilterWithdrawRequests
                        searchWithdraw={searchWithdraw}
                        setSearchWithdraw={setSearchWithdraw}
                        handleSubmit={handleSubmit}
                        refetch={refetch}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-primary text-lg font-semibold mt-4">
                        Withdrawals
                    </h2>
                    {isLoading ? (
                        <div className=" loading-center">
                            <ReactLoading
                                type={"balls"}
                                color="orange"
                                height={"10%"}
                                width={"10%"}
                            />
                        </div>
                    ) : (
                        <WithdrawHistoryTable
                            getAllWithdraws={getAllWithdraws}
                            handleWithdraw={handleWithdraw}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default WithdrawRequests;
