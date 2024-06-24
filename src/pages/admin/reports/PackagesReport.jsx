import DashboardHeader from "components/global/DashboardHeader";
import Date from "components/global/Date";
import Layout from "components/global/Layout";
import PackageReportWallet from "components/packagesReport/PackageReportWallet";
import ReportAnalytics from "components/packagesReport/ReportAnalytics";
import React from "react";
import faysal from "assets/images/faysal.jpg";
import ubl from "assets/images/ubl.jpg";
import meezan from "assets/images/meezan.jpg";
import allied from "assets/images/allied.jpg";
import BackBtn from "components/global/BackBtn";

const PackagesReport = () => {
    return (
        <Layout>
            <div>
                <div>
                    <BackBtn text="Back" />
                </div>
                <div className="flex items-center justify-between my-4">
                    <DashboardHeader text="Packages Report" />
                    <Date type="date" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <PackageReportWallet
                        value="0"
                        title="Total Invest Amount"
                    />
                    <PackageReportWallet
                        value="0"
                        title="Total Return Amount"
                    />
                    <PackageReportWallet value="0" title="Total Requests" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ReportAnalytics
                        image={faysal}
                        title={"Faysal Bank"}
                        timePeriod={"1"}
                        totalRequests={"0"}
                        totalInvestedAmount={"0"}
                        totalProfitAmount={"0"}
                    />
                    <ReportAnalytics
                        image={ubl}
                        title={"United Bank Limited"}
                        timePeriod={"3"}
                        totalRequests={"0"}
                        totalInvestedAmount={"0"}
                        totalProfitAmount={"0"}
                    />
                    <ReportAnalytics
                        image={meezan}
                        title={"Meezan Bank"}
                        timePeriod={"10"}
                        totalRequests={"0"}
                        totalInvestedAmount={"0"}
                        totalProfitAmount={"0"}
                    />
                    <ReportAnalytics
                        image={allied}
                        title={"Allied Bank"}
                        timePeriod={"30"}
                        totalRequests={"0"}
                        totalInvestedAmount={"0"}
                        totalProfitAmount={"0"}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default PackagesReport;
