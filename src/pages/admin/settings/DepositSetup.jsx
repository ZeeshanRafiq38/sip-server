import axios from "api/axios";
import DepositTable from "components/depositSetup/DepositTable";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBanks } from "store/depositBankSlice";
import ReactLoading from "react-loading";

const bankUrl = "/api/deposit-bank";
const DepositSetup = () => {
    const { user } = useSelector((state) => state.users);
    const token = user?.token;
    const dispatch = useDispatch();
    const fetchBanks = async () => {
        try {
            let response = await axios.get(bankUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const { isLoading, data: bank } = useQuery({
        queryKey: ["banks"],
        queryFn: fetchBanks,
        staleTime: 10000,
    });
    useEffect(() => {
        if (bank) {
            const {
                data: {
                    data: { docs },
                },
            } = bank;
            dispatch(setBanks(docs));
        }
    }, [bank]);

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Deposit Setup" />
                    <Link to="/settings/deposit-setup/add-new">
                        <button className="btn-secondary">Add New Bank</button>
                    </Link>
                </div>
                <div>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <ReactLoading
                                type={"balls"}
                                color="orange"
                                height={"10%"}
                                width={"10%"}
                            />
                        </div>
                    ) : (
                        <DepositTable />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DepositSetup;
