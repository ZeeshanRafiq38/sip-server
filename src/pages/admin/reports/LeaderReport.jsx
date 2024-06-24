import BackBtn from "components/global/BackBtn";
import DashboardHeader from "components/global/DashboardHeader";
import FromDate from "components/global/FromDate";
import Input from "components/global/Input";
import Layout from "components/global/Layout";
import TeamDepositHistoryTable2 from "components/leaderReport/TeamDepositHistoryTable2";
import React from "react";

const LeaderReport = () => {
    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <DashboardHeader text="Team Deposit History" />
                        <span className="bg-slate-300 text-xl w-6 flex items-center justify-center text-primary font-bold rounded-md">
                            2
                        </span>
                    </div>
                    <BackBtn />
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-pure">
                    <div className="flex-[0.3]">
                        <Input
                            type="number"
                            placeholder="Leader Phone no"
                            label="Phone"
                        />
                    </div>
                    <div className="flex-[0.3]">
                        <FromDate label="From" />
                    </div>
                    <div className="flex-[0.3]">
                        <FromDate label="To" />
                    </div>
                    <div className="flex-[0.1] mt-8">
                        <button className="btn-primary">Search</button>
                    </div>
                </div>
                <div>
                    <TeamDepositHistoryTable2 />
                </div>
            </div>
        </Layout>
    );
};

export default LeaderReport;
