import axios from "api/axios";
import DepositRequestsTable from "components/depositRequests/DepositRequestsTable";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import Search from "components/global/Search";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import {
    setDocsCount,
    setKeyword,
    setPage,
    setPages,
} from "store/depositRequestSlice";

const getAllDepositsUrl = "/api/deposit/bank";
const updateDepositRequests = "/api/deposit";
const DepositRequests = () => {
    const { keyword, docsCount, page, pages } = useSelector(
        (state) => state.depositRequest
    );
    const { user } = useSelector((state) => state.admin);
    const [getAllDeposits, setGetAllDeposits] = useState([]);
    const [searchDeposit, setSearchDeposit] = useState({
        status: "pending",
    });
    const params = useParams();
    const token = user?.token;
    const dispatch = useDispatch();
    const getAllDepositReq = async () => {
        try {
            const queryString = `?page=${page}&keyword=${keyword}&status=${searchDeposit?.status}`;
            const response = await axios.get(
                `${getAllDepositsUrl}/${params.id}${queryString}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
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
        queryKey: ["getAllDepositReq", keyword, page],
        queryFn: getAllDepositReq,
    });

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
                toast.error(error.message);
            }
        }
    };
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

    // Debounced function to handle search input changes
    return (
        <Layout>
            <div className="h-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="uil uil-history text-2xl text-primary"></i>
                        <DashboardHeader text="Pending Deposit Requests" />
                    </div>
                    <BackBtn />
                </div>

                <Search
                    placeholder="search..."
                    name="keyword"
                    setFetcher={setKeyword}
                />

                <div>
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
                        <DepositRequestsTable
                            getAllDeposits={getAllDeposits}
                            handleDeposit={handleDeposit}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DepositRequests;
