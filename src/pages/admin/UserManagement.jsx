import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import FilterUsers from "components/userManagement/FilterUsers";
import UserStats from "components/userManagement/UserStats";
import UsersHistory from "components/userManagement/UsersHistory";
import React, { useEffect, useState } from "react";
import axios from "api/axios";
import { useQuery, queryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Fetcher from "components/utils/Fetcher";
import ReactLoading from "react-loading";

import {
    setDocs,
    setDocsCount,
    setPage,
    setPages,
    setTodayJoined,
    setTotalUsers,
    setYesterdayJoined,
} from "store/userSlice";
import { filter } from "lodash";

const usersUrl = "/api/user";
const UserManagement = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.admin);
    const {
        page,
        todayJoined,
        totalUsers,
        yesterdayJoined,
        keyword,
        sort,
        from,
        to,
        docs,
    } = useSelector((state) => state.users);

    const queryKey = ["fetch-all-users", page, keyword, sort];
    const { isLoading, data, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            return Fetcher(
                `${usersUrl}?page=${page}&keyword=${keyword}&sort=${sort}&from=${from}&to=${to}`,
                user
            );
        },
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: {
                        docs,
                        docsCount,
                        page,
                        pages,
                        todayJoined,
                        totalUsers,
                        yesterdayJoined,
                    },
                },
            } = data;
            dispatch(setDocs(docs));
            dispatch(setDocsCount(docsCount));
            dispatch(setPage(page));
            dispatch(setPages(pages));
            dispatch(setTodayJoined(todayJoined));
            dispatch(setTotalUsers(totalUsers));
            dispatch(setYesterdayJoined(yesterdayJoined));
        }
        // console.log(data);
    }, [data]);
    const token = user?.token;

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="All Users" />
                    <BackBtn />
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <UserStats value={totalUsers} title="Total Users" />
                    <UserStats value={todayJoined} title="Today Joined" />
                    <UserStats
                        value={yesterdayJoined}
                        title="Yesterday Joined"
                    />
                </div>
                <div>
                    <FilterUsers refetch={refetch} isLoading={isLoading} />
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
                        <UsersHistory />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UserManagement;
