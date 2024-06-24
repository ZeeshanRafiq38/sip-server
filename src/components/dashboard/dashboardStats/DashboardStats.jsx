import React from "react";
import TotalDeposit from "./TotalDeposit";
import TotalUsers from "./TotalUsers";
import TotalWithdraw from "./TotalWithdraw";
import TotalInvested from "./TotalInvested";

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-4 gap-8 w-full">
            <TotalDeposit />
            <TotalUsers />
            <TotalWithdraw />
            <TotalInvested />
        </div>
    );
};

export default DashboardStats;
