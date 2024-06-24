import React from "react";

const PackageReportWallet = ({ requests = "", title = "", value = "" }) => {
    return (
        <div className="p-4 bg-pure shadow-md flex flex-col items-center gap-4  border-slate-200 border-primary border-l-4 my-4">
            <span className="text-primary font-bold text-3xl">{value}</span>
            <p className="text-black font-semibold">{title}</p>
            <p className="text-secondary text-base font-semibold">{requests}</p>
        </div>
    );
};

export default PackageReportWallet;
