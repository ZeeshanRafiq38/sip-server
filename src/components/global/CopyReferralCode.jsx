import CopyReferral from "assets/svgs/Dashboard/CopyReferral";
import React from "react";
import { useRef, useState } from "react";

const CopyReferralCode = ({
    referralHeading = "",
    value = "",
    setValue = "",
}) => {
    const [isCopy, setIsCopy] = useState(false);
    const inputRef = useRef(null);
    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            navigator.clipboard.writeText(value);
            setIsCopy(true);
        }
    };
    return (
        <form>
            <label className="text-lg font-semibold">{referralHeading}</label>
            <div className="flex border-slate-200 border w-full rounded-lg p-3">
                <input
                    type="text"
                    className="w-full outline-none text-lg text-gray"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    readOnly
                />
                <div onClick={handleCopy} className="cursor-pointer">
                    <CopyReferral />
                </div>
            </div>
        </form>
    );
};

export default CopyReferralCode;
