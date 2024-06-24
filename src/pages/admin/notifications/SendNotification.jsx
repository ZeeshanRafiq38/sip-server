import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import NormalSelectBox from "components/global/NormalSelectBox";
import TextArea from "components/global/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNotification, setDocs } from "store/notificationSlice";

const SendNotification = () => {
    const dispatch = useDispatch();
    const [notificationData, setNotificationData] = useState({
        title: "",
        description: "",
        isActive: "true",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNotification(notificationData));
        setNotificationData({
            title: "",
            description: "",
            isActive: "",
        });
    };
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <i className="uil uil-bell text-2xl text-primary"></i>
                        <DashboardHeader text="Notifications" />
                    </div>
                    <BackBtn />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="p-4 rounded-md bg-pure shadow-md flex flex-col gap-4"
                >
                    <div>
                        <Input
                            label="Title"
                            placeholder="New Notification"
                            name="title"
                            data={notificationData}
                            setData={setNotificationData}
                        />
                    </div>
                    <div>
                        <NormalSelectBox
                            label="Status"
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
                            data={notificationData}
                            setData={setNotificationData}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextArea
                            label={"Description"}
                            name="description"
                            data={notificationData}
                            setData={setNotificationData}
                        />
                        <button className="btn-primary my-3 w-[100px]">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default SendNotification;
