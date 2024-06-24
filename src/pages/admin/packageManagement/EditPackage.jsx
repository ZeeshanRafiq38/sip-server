import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import React, { useEffect, useState } from "react";
import FileInput from "components/global/FileInput";
import FromDate from "components/global/FromDate";
import NormalSelectBox from "components/global/NormalSelectBox";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getSinglePackage, updatePackage } from "store/PackageSlice";
import { useParams } from "react-router-dom";
import { baseURL } from "api/axios";
import moment from "moment/moment";
import Date from "components/global/Date";
import isBase64 from "utils/isBase64";

const EditPackage = () => {
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;
    const params = useParams();
    const id = params?.id;
    const [editPackage, setEditPackage] = useState({
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
    const [editCashbacks, setEditCashbacks] = useState({
        cashback: "",
        startTime: "",
        endTime: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { ...editPackage, offer: editCashbacks };
        if (body.image.includes(baseURL)) {
            delete body.image;
        }
        console.log(body);
        updatePackage({ body, id, token });
    };
    const { isLoading, data: doc } = useQuery({
        queryKey: ["singlePackage"],
        queryFn: () => getSinglePackage(id),
    });
    useEffect(() => {
        if (doc) {
            setEditPackage({ ...doc, image: baseURL + doc?.image });
            setEditCashbacks(doc?.offer);
        }
    }, [doc]);
    // console.log(editCashbacks)
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="uil uil-pen text-2xl text-primary"></i>
                        <DashboardHeader text="Edit Package" />
                    </div>
                    <BackBtn />
                </div>
                <div className="p-4 rounded-md shadow-md bg-pure">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Package Name"
                                type="text"
                                placeholder="Faysal Bank"
                                name="name"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                            <Input
                                label="Daily Profit %"
                                type="number"
                                placeholder="5"
                                name="dailyProfit"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Time Period in Days"
                                type="number"
                                placeholder="1"
                                name="timePeriod"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                            <div className="flex flex-col justify-center gap-1">
                                <NormalSelectBox
                                    label="Active"
                                    options={[
                                        { value: "true", label: "Yes" },
                                        { value: "false", label: "No" },
                                    ]}
                                    name="isActive"
                                    data={editPackage}
                                    setData={setEditPackage}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Min Invest"
                                type="1000"
                                placeholder="Min Invest"
                                name="minInvest"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                            <Input
                                label="Max Invest"
                                type="number"
                                placeholder="5000"
                                name="maxInvest"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Invest Count"
                                type="number"
                                placeholder="2"
                                name="investCount"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                            <Input
                                label="Description"
                                type="text"
                                placeholder="write short description about package"
                                name="description"
                                data={editPackage}
                                setData={setEditPackage}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FileInput
                                value={editPackage?.image}
                                setValue={(value) =>
                                    setEditPackage({
                                        ...editPackage,
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
                                data={editCashbacks}
                                setData={setEditCashbacks}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <FromDate
                                label="Offer Start Time"
                                type="datetime-local"
                                name="startTime"
                                data={editCashbacks}
                                setData={setEditCashbacks}
                                
                            />
                            <FromDate
                                label="Offer End Time"
                                type="datetime-local"
                                name="endTime"
                                data={editCashbacks}
                                setData={setEditCashbacks}
                            />
                        </div>
                        <div className="py-6">
                            <button className="btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EditPackage;
