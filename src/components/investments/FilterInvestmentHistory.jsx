import Date from "components/global/Date";
import FromDate from "components/global/FromDate";
import NormalSelectBox from "components/global/NormalSelectBox";
import Search from "components/global/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setSort, setTo } from "store/investmentSlice";
import { setKeyword } from "store/investmentSlice";

const FilterInvestmentHistory = ({ refetch }) => {
    const dispatch = useDispatch();
    const { from, to, sort, keyword } = useSelector(
        (state) => state.investment
    );
    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };
    const clearFilter = () => {
        dispatch(setFrom(""));
        dispatch(setTo(""));
    };
    return (
        <form
            className="p-4 bg-pure shadow-md rounded-lg"
            onSubmit={handleSearch}
        >
            <div className=" grid grid-cols-2 gap-4">
                <Search label="Username or Phone" setFetcher={setKeyword} />
                <NormalSelectBox
                    label={"Sort"}
                    options={[
                        {
                            value: "",
                            label: "All",
                        },
                        {
                            value: "lowDeposit",
                            label: "Low Deposit",
                        },
                        {
                            value: "highDeposit",
                            label: "High Deposit",
                        },
                    ]}
                    data={sort}
                    setData={setSort}
                    useStore={true}
                />
                <Date
                    type="date"
                    label="From"
                    data={from}
                    setData={setFrom}
                    useStore={true}
                />
                <Date
                    type="date"
                    label="To"
                    data={to}
                    setData={setTo}
                    useStore={true}
                />
            </div>
            <div className="flex items-center justify-end gap-4 my-4">
                <button
                    className="btn-secondary"
                    onClick={clearFilter}
                    type="button"
                >
                    Clear Filters
                </button>
                <button className="btn-primary">Search</button>
            </div>
        </form>
    );
};

export default FilterInvestmentHistory;
