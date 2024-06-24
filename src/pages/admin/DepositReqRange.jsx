import Layout from "components/global/Layout";
import React, { useState } from "react";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import { Link } from "react-router-dom";
import axios from "api/axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import ReactLoading from "react-loading";

const getBanksUrl = "/api/deposit-bank";
const DepositReqRange = () => {
    const [selectedItem, setSelectedItem] = useState("");

    const getDepositReqRange = async () => {
        try {
            const response = await axios.get(getBanksUrl);
            const {
                data: {
                    data: { docs },
                },
            } = response;
            return docs;
        } catch (error) {
            const {
                response: {
                    data: { message },
                },
            } = error;
            toast.error(message);
        }
    };
    const { data: docs, isLoading } = useQuery({
        queryKey: ["getDepositReqRange"],
        queryFn: getDepositReqRange,
    });

    return (
        <Layout>
            <div className="h-screen">
                {isLoading ? (
                    <div className="loading-center">
                        <ReactLoading
                            type={"balls"}
                            color="orange"
                            height={"10%"}
                            width={"10%"}
                        />
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between">
                            <DashboardHeader text="Select Deposit Range" />
                            <BackBtn />
                        </div>
                        <div className="flex flex-col gap-4">
                            {docs?.map((item) => (
                                <div
                                    className={`flex items-center justify-center bg-pure rounded-lg p-4 border-slate-200 border cursor-pointer ${
                                        selectedItem === item?._id &&
                                        "bg-orange-100"
                                    }`}
                                    onClick={() => setSelectedItem(item?._id)}
                                    key={item?._id}
                                >
                                    <p>
                                        <span>{item?.minDeposit}</span>-
                                        {item?.maxDeposit}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="text-end py-8">
                            <Link to={`/deposit-requests/${selectedItem}`}>
                                <button
                                    className="btn-primary"
                                    disabled={!selectedItem}
                                >
                                    Next
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default DepositReqRange;
