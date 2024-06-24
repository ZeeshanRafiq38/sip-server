import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FromDate = ({ label, type, name, setData, data, useStore = false }) => {
    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value === null ? "" : value;
        if (useStore) {
            dispatch(setData(sanitizedValue));
        } else {
            setData((prev) => ({ ...prev, [name]: sanitizedValue }));
        }
    };
    const formatInputValue = (value, type) => {
        if (value && !isNaN(new Date(value).getTime())) {
            const date = new Date(value);
            // Convert to local time zone
            const localDate = new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
            );
            // setMinDate(localDate);
            // Format the date string based on the type
            return localDate.toISOString().slice(0, type === "date" ? 10 : 16);
        } else {
            return "";
        }
    };

    return (
        <div className="flex flex-col justify-center gap-2 text-lg ">
            <label className="text-black font-semibold">{label}</label>
            <div>
                <input
                    type={type}
                    className="p-2 w-full outline-none border-slate-200 border text-gray rounded-md"
                    onChange={handleDateChange}
                    name={name}
                    value={
                        useStore
                            ? formatInputValue(data)
                            : formatInputValue(data[name])
                    }
                    min={
                        useStore
                            ? formatInputValue(data)
                            : formatInputValue(data[name])
                    }
                />
            </div>
        </div>
    );
};

export default FromDate;
