import axios from "api/axios";
import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import NormalSelectBox from "components/global/NormalSelectBox";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setSingleBank } from "store/depositBankSlice";

const depositBankUrl = "/api/deposit-bank";
const EditDepositBank = () => {
    // get id from url
    const params = useParams();
    // token
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;

    const [editBank, setEditBank] = useState({
        bankName: "",
        accountHolder: "",
        accountNo: "",
        isActive: "",
        minDeposit: "",
        maxDeposit: "",
        depositBonus: "",
    });

    const editDepositBank = async () => {
        try {
            let response = await axios.get(`${depositBankUrl}/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            return response.data.data.doc;
        } catch (error) {
            toast.error(error.message);
        }
    };
    // fetch by react-query
    const { data: doc, isLoading } = useQuery({
        queryKey: ["editDepositBank"],
        queryFn: editDepositBank,
    });

    useEffect(() => {
        if (doc) {
            setEditBank({ ...doc });
        }
    }, [doc]);

    const updateBank = async () => {
        const body = {
            ...editBank,
        };
        try {
            if (body.depositBonus) {
                delete body.depositBonus;
            }
            let response = await axios.put(
                `${depositBankUrl}/${params.id}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedBankData = response.data.data.doc;
            setEditBank(updatedBankData);
            toast.success(response.data.data.message);
            // return response.data.data.doc;
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateBank();
    };
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Edit Deposit Bank" />
                    <BackBtn />
                </div>
                <form
                    className="p-4 rounded-md shadow-md bg-pure"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <NormalSelectBox
                                label="Bank Name"
                                name="bankName"
                                options={[
                                    {
                                        value: "select--",
                                        label: "Select--",
                                    },
                                    {
                                        value: "Allied Bank Limited (ABL)",
                                        label: "Allied Bank Limited (ABL)",
                                    },
                                    {
                                        value: "National Bank Of Pakistan (NBP)",
                                        label: "National Bank Of Pakistan (NBP)",
                                    },
                                ]}
                                data={editBank}
                                setData={setEditBank}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Account Holder name"
                                label="Account Holder"
                                name="accountHolder"
                                data={editBank}
                                setData={setEditBank}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Account Number"
                                label="Account Holder"
                                name="accountNo"
                                data={editBank}
                                setData={setEditBank}
                                // useStore={true}
                            />
                        </div>

                        <NormalSelectBox
                            label="Open For Deposit"
                            name="isActive"
                            options={[
                                {
                                    value: "select--",
                                    label: "Select--",
                                },
                                {
                                    value: "true",
                                    label: "Yes",
                                },
                                {
                                    value: "false",
                                    label: "No",
                                },
                            ]}
                            data={editBank}
                            setData={setEditBank}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="number"
                                placeholder="Ex: 1000"
                                label="Min Deposit Amount"
                                name="minDeposit"
                                data={editBank}
                                setData={setEditBank}
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <Input
                                type="number"
                                placeholder="Ex: 5000"
                                label="Max Deposit Amount"
                                name="maxDeposit"
                                data={editBank}
                                setData={setEditBank}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder="0"
                            label="Deposit Bonus % (Optional)"
                            name="depositBonus"
                            data={editBank}
                            setData={setEditBank}
                        />
                    </div>
                    <div className="my-6">
                        <button className="btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditDepositBank;
