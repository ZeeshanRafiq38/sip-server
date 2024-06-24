import React, { useState } from "react";
import Passwordsvg from "assets/svgs/Passwordsvg";
import ShowPassword from "assets/svgs/ShowPassword";
import HiddenPasswordSvg from "assets/svgs/HiddenPasswordSvg";

const EditPassword = ({
    label = "",
    placeholder = "",
    id = "",
    name,
    data,
    setData,
}) => {
    const [isVisible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(!isVisible);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-semibold">
                    {label}
                </label>
                <div className="flex items-center justify-between gap-2 bg-slate-200 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                        <Passwordsvg />
                        <input
                            type={!isVisible ? "password" : "text"}
                            className="bg-slate-200 outline-none w-full"
                            placeholder={placeholder}
                            id={id}
                            value={data[name]}
                            name={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div onClick={toggle}>
                        {isVisible ? <ShowPassword /> : <HiddenPasswordSvg />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPassword;
