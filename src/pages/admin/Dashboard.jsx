import DashboardTable from "components/dashboard/DashboardTable";
import DashboardStats from "components/dashboard/dashboardStats/DashboardStats";
import WalletStats from "components/dashboard/walletStats/WalletStats";
import DashboardHeader from "components/global/DashboardHeader";
import Date from "components/global/Date";
import Layout from "components/global/Layout";
import React from "react";

const Dashboard = () => {
    return (
        <Layout>
            <div className="flex items-center justify-between my-4">
                <DashboardHeader text="Welcome Back Admin 🤗" />
                <Date type="date" data={""} setData={""} />
            </div>
            <div>
                <DashboardStats />
            </div>
            <div className="my-4">
                <WalletStats />
            </div>
            <div>
                <h3 className="text-primary text-xl font-semibold">
                    Recently Invested
                </h3>
            </div>
            <div>
                <DashboardTable />
            </div>
        </Layout>
    );
};

export default Dashboard;
