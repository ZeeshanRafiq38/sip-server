import React from "react";

const TotalInvested = () => {
    return (
        <div className="rounded-md text-[#22C55E] bg-pure flex flex-col gap-8 p-4 text-xl shadow-md">
            <p className="font-semibold">Total Invested</p>
            <div className="flex justify-between items-end h-full font-bold">
                <span>Rs. 1k</span>
                <p className="text-3xl">$</p>
            </div>
        </div>
    );
};

export default TotalInvested;
