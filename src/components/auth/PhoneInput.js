import Username from "assets/svgs/Username";
import React, { memo } from "react";

const PhoneInput = ({ data, setData, setIsValid, isValid }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setIsValid((prev) => ({ ...prev, isPhoneValid: validateInput(value) }));
    };

    const validateInput = (value) => {
        const inputvalue = value || data.phone;
        const regex = /^03[0-9]{9}$/;
        return regex.test(inputvalue);
    };

    return (
        <div>
            <div
                className={`${
                    data?.phone?.toString()?.length > 0
                        ? isValid.isPhoneValid
                            ? "border-green-500 border"
                            : !isValid.isPhoneValid
                            ? "border-red-500 border"
                            : ""
                        : ""
                } flex items-center gap-2 bg-slate-200 p-2 rounded-md`}
            >
                <Username />
                <input
                    type="number"
                    className=" bg-slate-200 outline-none w-full"
                    placeholder="Phone"
                    required
                    value={data?.phone}
                    name={"phone"}
                    onChange={handleChange}
                />
            </div>
            {data?.phone?.toString().length > 0 && !isValid.isPhoneValid && (
                <span className="text-xs text-red-500">
                    <span>{"Please enter valid Phone no"}</span>
                </span>
            )}
            {data?.phone?.toString().length > 0 && isValid.isPhoneValid && (
                <span className="text-xs text-green-500">
                    <span>{"Phone no is valid."}</span>
                </span>
            )}
        </div>
    );
};

export default memo(PhoneInput);
