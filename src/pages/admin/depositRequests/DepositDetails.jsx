import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { baseURL } from "api/axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import Input from "components/global/Input";
import TextArea from "components/global/TextArea";
import NormalSelectBox from "components/global/NormalSelectBox";
import { useSelector } from "react-redux";

const depositUrl = "api/deposit";
const DepositDetails = () => {
    const [getSingleDeposit, setGetSingleDeposit] = useState({
        status: "",
        description: "",
        transferAmount: "",
    });
    const { user } = useSelector((state) => state.admin);
    const params = useParams();
    const token = user?.token;
    const navigate = useNavigate();
    // get Single deposit details
    const getSingleDepositDetails = async () => {
        try {
            const response = await axios.get(`${depositUrl}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const {
                data: {
                    data: { doc, message },
                },
            } = response;
            return doc;
        } catch (error) {
            toast.error(error?.message);
        }
    };
    const { data: doc, isLoading } = useQuery({
        queryKey: ["getSingleDepositDetails"],
        queryFn: getSingleDepositDetails,
    });
    useEffect(() => {
        if (doc) {
            setGetSingleDeposit({
                ...doc,
                transferAmount: doc.amount,
            });
        }
    }, [doc]);
    // update deposit details
    const handleDepositDetails = async () => {
        try {
            const body = {
                status: getSingleDeposit?.status,
            };
            if (body.status === "approved") {
                body.transferAmount =
                    getSingleDeposit?.amount + getSingleDeposit?.bonusAmount;
            }
            let response = await axios.put(`${depositUrl}/${params.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
    const handleSubmit = (e) => {
        e.preventDefault();
        handleDepositDetails();
    };
    // show image with baseUrl
    const fullImageUrl = baseURL + getSingleDeposit?.proof;
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Deposit Details" />
                    <BackBtn />
                </div>
                <form
                    className="p-4 bg-pure rounded-md shadow-md"
                    onSubmit={handleSubmit}
                >
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Username</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.username}
                        </span>
                    </div>
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Phone No</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.phone}
                        </span>
                    </div>
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Deposit Amount</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.amount}
                        </span>
                    </div>
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Date</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.createdAt}
                        </span>
                    </div>
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Bank Name</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.bankName}
                        </span>
                    </div>
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Account Holder</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.accountHolder}
                        </span>
                    </div>
                    <div className="py-4 border-b-[1px] border-slate-200 flex items-center justify-between">
                        <h3 className="font-semibold">Account Number</h3>
                        <span className="text-red-500">
                            {getSingleDeposit?.accountNo}
                        </span>
                    </div>
                    <div className="flex flex-col gap-4 py-4">
                        <h2 className="text-gray text-lg">Receipt</h2>
                        <div className="flex justify-center">
                            <img src={fullImageUrl} alt="deposit" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-full">
                            <NormalSelectBox
                                label="Status"
                                name="status"
                                options={[
                                    { value: "select--", label: "select--" },
                                    { value: "pending", label: "Pending" },
                                    { value: "approved", label: "Approved" },
                                    { value: "declined", label: "Declined" },
                                ]}
                                data={getSingleDeposit}
                                setData={setGetSingleDeposit}
                            />
                        </div>
                        {getSingleDeposit?.status === "approved" && (
                            <div className="w-full">
                                <Input
                                    label="Transfer Amount"
                                    name="transferAmount"
                                    type="number"
                                    data={getSingleDeposit}
                                    setData={setGetSingleDeposit}
                                />
                            </div>
                        )}
                    </div>

                    <div className="my-4">
                        <TextArea
                            label="Description"
                            placeholder="write a short description"
                            name="description"
                            data={
                                getSingleDeposit.description === null
                                    ? ""
                                    : getSingleDeposit
                            }
                            setData={setGetSingleDeposit}
                        />
                    </div>

                    <button
                        className="btn-primary my-6"
                        disabled={!getSingleDeposit}
                    >
                        Done
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default DepositDetails;
