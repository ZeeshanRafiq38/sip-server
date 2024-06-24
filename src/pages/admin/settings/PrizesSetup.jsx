import PrizesTable from "components/allprizes/PrizesTable";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPrizes, setPage, setPages, setPrizes } from "store/PrizeSlice";

const PrizesSetup = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.admin.user);
    const { page } = useSelector((state) => state.prize);
    const { isLoading, data: data } = useQuery({
        queryKey: ["prizes", page],
        queryFn: () => fetchPrizes(token, page),
    });
    useEffect(() => {
        if (data) {
            const {
                data: {
                    data: { docs, page, pages },
                },
            } = data;
            dispatch(setPrizes(docs));
            dispatch(setPage(page));
            dispatch(setPages(pages));
        }
    }, [data]);
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <DashboardHeader text="All Prizes" />
                    <Link to="/settings/prizes-setup/add-new">
                        <button className="btn-secondary">Add New Prize</button>
                    </Link>
                </div>
                <div>
                    <PrizesTable />
                </div>
            </div>
        </Layout>
    );
};

export default PrizesSetup;
