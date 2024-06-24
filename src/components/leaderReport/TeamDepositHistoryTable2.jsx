import Pagination from "components/global/pagination/index";

import RequestStatus from "components/global/RequestStatus";
import React from "react";

const TeamDepositHistoryTable2 = () => {
    return (
        <div className="shadow-lg overflow-x-auto my-8 rounded-lg">
            <table className="w-full table-auto overflow-x-auto rounded-lg">
                <thead className=" text-sm">
                    <tr className="bg-primary text-pure text-lg">
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Member
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Deposit Amount
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
                            Bank Name
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Account Holder
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Account Number
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Status
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
                                5000
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                29 Nov 2023 08:56 AM
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                Sindh Bank (SIND)
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                John Doe
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                ggwhwhw
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <RequestStatus status="pending" />
                            </td>
                        </tr>
                    ))}
                </tbody>
                {<Pagination currentPage={1} pageCount={1} setPage={""} />}
            </table>
        </div>
    );
};

export default TeamDepositHistoryTable2;
