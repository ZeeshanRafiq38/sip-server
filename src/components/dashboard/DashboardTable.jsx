import RequestStatus from "components/global/RequestStatus";
import React from "react";
import { Link } from "react-router-dom";

const DashboardTable = () => {
    return (
        <div className="shadow-lg overflow-x-auto my-8 rounded-lg">
            <table className="w-full table-auto overflow-x-auto rounded-lg">
                <thead className=" text-sm">
                    <tr className="bg-primary text-pure text-lg">
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Full Name
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Package Name
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Invested Amount
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Daily Profit
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Date
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {[...Array(4).keys()].map((item, i) => (
                        <tr
                            key={item.id}
                            className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                        >
                            <td className=" text-primary  px-6 py-4 whitespace-nowrap text-center underline">
                                Abu Baker
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                Faysal Bank
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                2,000
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                5
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <RequestStatus status="running" />
                            </td>
                            <td className=" text-red-500  px-6 py-4 whitespace-nowrap text-center">
                                28 Nov 2023 01:53 PM
                            </td>
                            <Link to="/investments/details">
                                <td className=" text-red-500  px-6 py-4 whitespace-nowrap text-center flex justify-center underline">
                                    Details
                                </td>
                            </Link>
                        </tr>
                    ))}
                </tbody>
                <div className="p-6"></div>
            </table>
        </div>
    );
};

export default DashboardTable;
