import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import NotificationHistory from "components/notifications/NotificationHistory";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchNotifications,
    setDocs,
    setPage,
    setPages,
} from "store/notificationSlice";

const Notifications = () => {
    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.notification);
    const { isLoading, data: data } = useQuery({
        queryKey: ["getNotifications"],
        queryFn: () => fetchNotifications(page),
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { docs, page, pages },
                },
            } = data;
            dispatch(setDocs(docs));
            dispatch(setPage(page));
            dispatch(setPages(pages));
        }
    }, [data]);
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="uil uil-plus-circle text-2xl text-primary"></i>
                        <DashboardHeader text="Notifications" />
                    </div>
                    <Link to="/notifications/send-notification">
                        <button className="flex items-center btn-primary">
                            <i className="uil uil-plus-circle"></i>
                            <span>Send Notification</span>
                        </button>
                    </Link>
                </div>
                <div>
                    <NotificationHistory />
                </div>
            </div>
        </Layout>
    );
};

export default Notifications;
