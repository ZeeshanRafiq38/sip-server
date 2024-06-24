import React from "react";
import { useDispatch } from "react-redux";

const NormalSelectBox = ({
    label,
    name,
    options,
    setData,
    data,
    useStore = false,
}) => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (useStore) {
            dispatch(setData(value));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="flex flex-col gap-1 justify-center">
            <label className="text-gray font-semibold">{label}</label>
            <select
                className="border-slate-200 border rounded-md p-3 text-gray outline-none"
                onChange={handleChange}
                name={name}
                value={useStore ? data : data[name]}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NormalSelectBox;
