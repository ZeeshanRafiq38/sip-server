import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import NormalSelectBox from "components/global/NormalSelectBox";
import TextArea from "components/global/TextArea";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getSingleNotification,
    setDocs,
    updateNotification,
} from "store/notificationSlice";

const EditNotification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [editNotification, setEditNotification] = useState({
        title: "",
        description: "",
        isActive: "",
    });
    const { isLoading, data: data } = useQuery({
        queryKey: ["getSingleNotification"],
        queryFn: () => getSingleNotification(id),
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { doc },
                },
            } = data;
            setEditNotification(doc);
        }
    }, [data]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNotification({ id, editNotification }));
        navigate(-1);
    };
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <i className="uil uil-pen text-2xl text-primary"></i>
                        <DashboardHeader text="Edit Notification" />
                    </div>
                    <BackBtn />
                </div>
                <form
                    className="p-4 rounded-md bg-pure shadow-md flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <Input
                            label="Title"
                            placeholder="New Notification"
                            name="title"
                            data={editNotification}
                            setData={setEditNotification}
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
                            data={editNotification}
                            setData={setEditNotification}
                        />
                    </div>
                    <TextArea
                        label="Description"
                        name="description"
                        data={editNotification}
                        setData={setEditNotification}
                    />
                    <div>
                        <button className="btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditNotification;
