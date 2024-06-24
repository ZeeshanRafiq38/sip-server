import React from "react";
import { useDispatch } from "react-redux";

const Date = ({ label, type, name, setData, data, useStore = false }) => {
    const dispatch = useDispatch();
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (useStore) {
            dispatch(setData(value));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
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
                    value={useStore ? data : data[name]}
                />
            </div>
        </div>
    );
};

export default Date;
