import React from "react";

const ReportAnalytics = ({
    image,
    title,
    timePeriod,
    totalRequests,
    totalInvestedAmount,
    totalProfitAmount,
}) => {
    return (
        <div className="p-4 rounded-lg shadow-md bg-pure">
            <div className="flex flex-col items-center gap-1">
                <img
                    src={image}
                    alt=""
                    className=" w-24 border-red-500 border rounded-full py-2"
                />
                <h2 className="text-lg font-semibold">{title}</h2>
                <p>Time Period : {timePeriod} day</p>
            </div>
            <div className="text-gray font-semibold flex flex-col gap-2">
                <p>Total Requests : {totalRequests}</p>
                <p>Total Invested Amount : {totalInvestedAmount}</p>
                <p>Total Amount With Profit : {totalProfitAmount}</p>
            </div>
        </div>
    );
};

export default ReportAnalytics;
