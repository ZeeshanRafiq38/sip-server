import FromDate from "components/global/FromDate";
import NormalSelectBox from "components/global/NormalSelectBox";
import Search from "components/global/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "store/depositsSlice";

const FilterSearch = ({
    searchDeposit,
    setSearchDeposit,
    handleSubmit,
    refetch,
}) => {
    const clearFilters = () => {
        setSearchDeposit({
            status: "",
            from: "",
            to: "",
        });
        setTimeout(() => {
            refetch();
        }, 500);
    };
    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className=" grid grid-cols-2 gap-4 p-4 bg-pure shadow-md rounded-lg">
                    <Search
                        label="Search"
                        placeholder="search..."
                        setFetcher={setKeyword}
                    />

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
                        data={searchDeposit}
                        setData={setSearchDeposit}
                    />
                </div>
                <div className="p-4 bg-pure shadow-md rounded-lg grid grid-cols-2 gap-4">
                    <FromDate
                        type="date"
                        label="From"
                        name="from"
                        data={searchDeposit}
                        setData={setSearchDeposit}
                    />
                    <FromDate
                        type="date"
                        label="To"
                        name="to"
                        data={searchDeposit}
                        setData={setSearchDeposit}
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
        </div>
    );
};

export default FilterSearch;
