import TotalWithdrawSvg from "assets/svgs/Dashboard/TotalWithdrawSvg";
import React from "react";

const TotalWithdraw = () => {
    return (
        <div className="rounded-md text-[#EF4444] bg-pure flex flex-col gap-8 p-4 text-xl shadow-md">
            <p className="font-semibold">Total Withdraw</p>
            <div className="flex justify-between items-end h-full font-bold">
                <span>Rs. 1k</span>
                <TotalWithdrawSvg />
            </div>
        </div>
    );
};

export default TotalWithdraw;
