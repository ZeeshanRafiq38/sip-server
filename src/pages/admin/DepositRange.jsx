import Layout from "components/global/Layout";
import React, { useState } from "react";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import { Link } from "react-router-dom";
import axios from "api/axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const getBanksUrl = "/api/deposit-bank";
const DepositRange = () => {
    const [selectedItem, setSelectedItem] = useState("");

    const getDepositRange = async () => {
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
    const { data: docs } = useQuery({
        queryKey: ["getDepositRange"],
        queryFn: getDepositRange,
    });

    return (
        <Layout>
            <div className="h-screen">
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Select Deposit Range" />
                    <BackBtn />
                </div>
                <div className="flex flex-col gap-4">
                    {docs?.map((item) => (
                        <div
                            className={`flex items-center justify-center bg-pure rounded-lg p-4 border-slate-200 border cursor-pointer ${
                                selectedItem === item?._id && "bg-orange-100"
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
                    <Link to={`/deposits/${selectedItem}`}>
                        <button
                            className="btn-primary"
                            disabled={!selectedItem}
                        >
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default DepositRange;
