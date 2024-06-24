import React from "react";

const TextArea = ({ label, placeholder, name, data, setData }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className="flex flex-col gap-1">
            <label className="text-gray font-semibold">{label}</label>
            <textarea
                cols="30"
                rows="5"
                placeholder={placeholder}
                name={name}
                value={data[name]}
                onChange={handleChange}
                className="outline-none border-slate-200 border shadow-sm rounded-md p-3 text-lg resize-none"
            ></textarea>
        </div>
    );
};

export default TextArea;
