import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import React, { useState } from "react";
import FileInput from "components/global/FileInput";
import Date from "components/global/Date";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPackage, setCashback } from "store/PackageSlice";
import NormalSelectBox from "components/global/NormalSelectBox";
import FromDate from "components/global/FromDate";

const CreateNewPackage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addPackage, setAddPackage] = useState({
        name: "",
        minInvest: "",
        maxInvest: "",
        timePeriod: "",
        dailyProfit: "",
        investCount: "",
        description: "",
        isActive: "true",
        image: "",
    });
    const [cashbacks, setCashbacks] = useState({
        cashback: "",
        startTime: "",
        endTime: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { ...addPackage, offer: cashbacks };
        dispatch(createPackage({ body, navigate }));
    };
    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="uil uil-plus text-2xl text-primary"></i>
                        <DashboardHeader text="Create New Package" />
                    </div>
                    <BackBtn />
                </div>
                <div className="p-4 rounded-md shadow-md bg-pure">
                    <div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Package Name"
                                type="text"
                                placeholder="Faysal Bank"
                                name="name"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                            <Input
                                label="Daily Profit %"
                                type="number"
                                placeholder="5"
                                name="dailyProfit"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Time Period in Days"
                                type="number"
                                placeholder="1"
                                name="timePeriod"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                            <div className="flex flex-col justify-center gap-1">
                                <NormalSelectBox
                                    label="Active"
                                    options={[
                                        { value: "true", label: "Yes" },
                                        { value: "false", label: "No" },
                                    ]}
                                    name="isActive"
                                    data={addPackage}
                                    setData={setAddPackage}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Min Invest"
                                type="1000"
                                placeholder="Min Invest"
                                name="minInvest"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                            <Input
                                label="Max Invest"
                                type="number"
                                placeholder="5000"
                                name="maxInvest"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Invest Count"
                                type="number"
                                placeholder="2"
                                name="investCount"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                            <Input
                                label="Description"
                                type="text"
                                placeholder="write short description about package"
                                name="description"
                                data={addPackage}
                                setData={setAddPackage}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FileInput
                                value={addPackage.image}
                                setValue={(value) =>
                                    setAddPackage({
                                        ...addPackage,
                                        image: value,
                                    })
                                }
                            />
                            <p className="text-primary font-semibold">
                                Set Package Offer (Optional)
                            </p>
                        </div>
                        <div>
                            <Input
                                label="Offer Package in %"
                                type="number"
                                placeholder="0"
                                name="cashback"
                                data={cashbacks}
                                setData={setCashbacks}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <FromDate
                                label="Offer Start Time"
                                type="datetime-local"
                                name="startTime"
                                data={cashbacks}
                                setData={setCashbacks}
                            />
                            <FromDate
                                label="Offer End Time"
                                type="datetime-local"
                                name="endTime"
                                data={cashbacks}
                                setData={setCashbacks}
                            />
                        </div>
                        <div className="py-6">
                            <button className="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default CreateNewPackage;
