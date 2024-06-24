import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import FilterInvestmentHistory from "components/investments/FilterInvestmentHistory";
import InvestHistoryTable from "components/investments/InvestHistoryTable";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteSingleInvest,
    getAllInvestments,
    setDocs,
    setPage,
    setPages,
} from "store/investmentSlice";

const Investments = () => {
    const dispatch = useDispatch();
    const { docs, page, pages, to, from, sort, keyword } = useSelector(
        (state) => state.investment
    );
    const { token } = useSelector((state) => state.admin.user);
    const {
        data: data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [
            "getMyinvestments",
            page,
            pages,
            sort,
            keyword,
            from === "" && to === "",
        ],
        queryFn: () =>
            getAllInvestments(token, page, pages, from, to, keyword, sort),
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
    const handleDelete = (id) => {
        deleteSingleInvest(id, token);
        const filterDocs = docs.filter((item) => item?._id !== id);
        dispatch(setDocs(filterDocs));
    };
    return (
        <Layout>
            <div className="h-screen">
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Invest History" />
                    <BackBtn />
                </div>
                <div>
                    <FilterInvestmentHistory refetch={refetch} />
                </div>
                <div>
                    <InvestHistoryTable handleDelete={handleDelete} />
                </div>
            </div>
        </Layout>
    );
};

export default Investments;
