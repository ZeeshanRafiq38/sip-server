import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import NormalSelectBox from "components/global/NormalSelectBox";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBank } from "store/depositBankSlice";

const AddNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addBank, setAddBank] = useState({
        bankName: "Allied Bank Limited (ABL)",
        accountHolder: "",
        accountNo: "",
        isActive: "true",
        minDeposit: "",
        maxDeposit: "",
        depositBonus: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(addBank);
        dispatch(createBank({ addBank, navigate }));
    };

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Add New Deposit Bank" />
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
                                        value: "Allied Bank Limited (ABL)",
                                        label: "Allied Bank Limited (ABL)",
                                    },
                                    {
                                        value: "National Bank Of Pakistan (NBP)",
                                        label: "National Bank Of Pakistan (NBP)",
                                    },
                                ]}
                                data={addBank}
                                setData={setAddBank}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Account Holder name"
                                label="Account Holder"
                                name="accountHolder"
                                data={addBank}
                                setData={setAddBank}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter Account Number"
                                label=" Account Number"
                                name="accountNo"
                                data={addBank}
                                setData={setAddBank}
                            />
                        </div>

                        <div>
                            <NormalSelectBox
                                label="Open For Deposit"
                                name="isActive"
                                options={[
                                    {
                                        value: "true",
                                        label: "Yes",
                                    },
                                    {
                                        value: "false",
                                        label: "No",
                                    },
                                ]}
                                data={addBank}
                                setData={setAddBank}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="number"
                                placeholder="Ex: 1000"
                                label="Min Deposit Amount"
                                name="minDeposit"
                                data={addBank}
                                setData={setAddBank}
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <Input
                                type="number"
                                placeholder="Ex: 5000"
                                label="Max Deposit Amount"
                                name="maxDeposit"
                                data={addBank}
                                setData={setAddBank}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder="0"
                            label="Deposit Bonus % (Optional)"
                            name="depositBonus"
                            data={addBank}
                            setData={setAddBank}
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

export default AddNew;
