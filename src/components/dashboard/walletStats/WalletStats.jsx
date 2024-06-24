import React from "react";
import WalletStatsItem from "./WalletStatsItem";

const WalletStats = () => {
    return (
        <div className="grid grid-cols-3 gap-8">
            <WalletStatsItem
                value="56k"
                title="Total Approved Deposit"
                requests="Total Requests : 5"
        />
            <WalletStatsItem
                value="0"
                title="Total Approved Deposit"
                requests="Total Requests : 0"
            />
            <WalletStatsItem
                value="0"
                title="Total Pending Deposit"
                requests="Total Requests : 0"
            />
            <WalletStatsItem
                value="0"
                title="Total Approved Withdraw"
                requests="Total Requests : 0"
            />
            <WalletStatsItem
                value="0"
                title="Total Approved Withdraw"
                requests="Total Requests : 0"
            />
            <WalletStatsItem
                value="0"
                title="Total Approved Withdraw"
                requests="Total Requests : 0"
            />
        </div>
    );
};

export default WalletStats;
