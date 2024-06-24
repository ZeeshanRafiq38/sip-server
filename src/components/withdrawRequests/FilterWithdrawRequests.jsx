import Date from "components/global/Date";
import FromDate from "components/global/FromDate";
import NormalSelectBox from "components/global/NormalSelectBox";
import Search from "components/global/Search";
import React from "react";
import { setKeyword } from "store/withdrawRequestsSlice";

const FilterWithdrawRequests = ({
    searchWithdraw,
    setSearchWithdraw,
    handleSubmit,
    refetch
}) => {
    const clearFilters = () => {
        setSearchWithdraw({
            status: "",
            from: "",
            to: "",
        });
        setTimeout(() => {
            refetch()
        },500)
    };
    return (
        <form
            className="p-4 bg-pure shadow-md rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className=" grid grid-cols-2 gap-4">
                <Search label="username or phone" setFetcher={setKeyword} />
                <NormalSelectBox
                    label="Status"
                    name="status"
                    options={[
                        { value: "select--", label: "select--" },
                        { value: "", label: "All" },
                        { value: "pending", label: "Pending" },
                        { value: "approved", label: "Approved" },
                        { value: "declined", label: "Declined" },
                    ]}
                    data={searchWithdraw}
                    setData={setSearchWithdraw}
                />
                <Date
                    type="date"
                    label="From"
                    name="from"
                    data={searchWithdraw}
                    setData={setSearchWithdraw}
                />
                <Date
                    type="date"
                    label="To"
                    name="to"
                    data={searchWithdraw}
                    setData={setSearchWithdraw}
                />
            </div>
            <div className="flex items-center justify-end gap-4 my-4">
                <button
                    className="btn-secondary"
                    onClick={clearFilters}
                    type="button"
                >
                    Clear Filters
                </button>
                <button className="btn-primary">Search</button>
            </div>
        </form>
    );
};

export default FilterWithdrawRequests;
