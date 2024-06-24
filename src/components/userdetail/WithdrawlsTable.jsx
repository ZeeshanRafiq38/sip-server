import Pagination from "components/global/pagination/index";

import RequestStatus from "components/global/RequestStatus";
import React from "react";

const WithdrawlsTable = () => {
    return (
        <div className="shadow-lg overflow-x-auto my-4 rounded-lg">
            <table className="w-full table-auto overflow-x-auto rounded-lg">
                <thead className=" text-sm">
                    <tr className="bg-primary text-pure text-lg">
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            User
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Withdraw
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
                    {[...Array(1).keys()].map((item, i) => (
                        <tr
                            key={item.id}
                            className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                        >
                            <td className=" px-6 py-4 whitespace-nowrap text-center flex flex-col gap-1">
                                <p className="text-primary underline">
                                    Abubakar
                                </p>
                                <span>03009380314</span>
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center text-xl font-semibold">
                                First Women Bank (FWBL) <br /> 03001234567{" "}
                                <br /> Zulfiqar Ali Bhutto <br /> 970
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <RequestStatus status="pending" />
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                23 Nov 2023 12:51 PM
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center"></td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex items-center gap-4">
                                <i className="uil uil-check bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-pure"></i>
                                <i className="uil uil-times bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-pure"></i>
                                <span className="underline">Details</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {<Pagination currentPage={1} pageCount={1} setPage={""} />}
            </table>
        </div>
    );
};

export default WithdrawlsTable;
