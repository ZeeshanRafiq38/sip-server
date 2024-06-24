import DashboardHeader from "components/global/DashboardHeader";
import Layout from "components/global/Layout";
import RequestStatus from "components/global/RequestStatus";
import moment from "moment/moment";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleInvest } from "store/investmentSlice";
const InvestDetails = () => {
    const { token } = useSelector((state) => state.admin.user);
    const params = useParams();
    const id = params.id;
    const { data: doc, isLoading } = useQuery({
        queryKey: ["singleInvest"],
        queryFn: () => fetchSingleInvest(id, token),
    });
    return (
        <Layout>
            <div>
                <div>
                    <DashboardHeader text="Deposit Details" />
                </div>
                <div className="bg-pure rounded-lg shadow-lg border border-slate-200 p-4 flex flex-col gap-2 mt-6">
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Username</p>
                        <span className="text-primary">{doc?.username}</span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Phone no</p>
                        <span className="text-primary">{doc?.phone}</span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Invested Amount</p>
                        <span className="text-primary">
                            {doc?.investAmount}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Progress</p>
                        <span className="text-primary">{doc?.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Package Name</p>
                        <span className="text-primary">{doc?.packageName}</span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Daily Profit In %</p>
                        <span className="text-primary">
                            {doc?.dailyProfitPer}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Daily Profit In Amount</p>
                        <span className="text-primary">
                            {doc?.dailyProfitAmount}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Total Return Amount</p>
                        <span className="text-primary">
                            {doc?.totalReturnAmount}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Total Profit Amount</p>
                        <span className="text-primary">{doc?.totalProfit}</span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Start Date</p>
                        <span className="text-primary">
                            {moment(doc?.startDate).format("DD MMM YYYY")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">End Date</p>
                        <span className="text-primary">
                            {moment(doc?.endDate).format("DD MMM YYYY")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-slate-200 border-b-[1px] pb-4">
                        <p className=" font-semibold">Status</p>
                        <span>
                            <RequestStatus status={doc?.status} />
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InvestDetails;
