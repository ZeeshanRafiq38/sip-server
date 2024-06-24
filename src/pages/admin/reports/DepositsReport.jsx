import AdobeSvg from "assets/svgs/admin/AdobeSvg";
import DepositReportWallets from "components/depositReport/DepositReportWallets";
import DashboardHeader from "components/global/DashboardHeader";
import FromDate from "components/global/FromDate";
import Layout from "components/global/Layout";
import React from "react";

const DepositsReport = () => {
    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <DashboardHeader text="Desposit Report" />
                    <i className="uil uil-estate bg-primary text-pure text-xl rounded-full w-10 h-10 flex items-center justify-center"></i>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <DepositReportWallets value="0" title="Total Deposit" />
                    <DepositReportWallets value="0" title="Total Request" />
                </div>
                <div className="p-4 shadow-md border-slate-200 border rounded-lg bg-pure flex items-center gap-8">
                    <div className="flex-[0.4]">
                        <FromDate label="From" type="date" />
                    </div>
                    <div className="flex-[0.4]">
                        <FromDate label="To" type="date" />
                    </div>
                    <button className="btn-primary flex-[0.2] mt-8">
                        SHOW
                    </button>
                </div>
                <div className="p-4 rounded-lg shadow-md border-slate-200 border bg-pure">
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] py-2">
                        <h3 className="font-semibold text-lg">Report</h3>
                        <AdobeSvg />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-between py-4 border-slate-200 border-b-[1px]">
                            <p className="font-semibold text-lg">
                                Bank Account Holder
                            </p>
                            <span>ggwhwhw</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-slate-200 border-b-[1px]">
                            <p className="font-semibold text-lg">Bank Name</p>
                            <span>Sindh Bank (SIND)</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-slate-200 border-b-[1px]">
                            <p className="font-semibold text-lg">Amount</p>
                            <span>5000</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-slate-200 border-b-[1px]">
                            <p className="font-semibold text-lg">Date</p>
                            <span>29 Nov 2023 08:56 am</span>
                        </div>
                        <div>
                            <h4 className="text-gray font-medium text-lg">
                                Receipt
                            </h4>
                            <div className="flex justify-center items-center">
                                <img
                                    src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww"
                                    alt=""
                                    className="w-[500px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DepositsReport;
