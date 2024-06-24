import Pagination from "components/global/pagination/index";

import RequestStatus from "components/global/RequestStatus";
import React from "react";

const DepositsTable = () => {
    return (
        <div className="shadow-lg overflow-x-auto my-8 rounded-lg">
            <table className="w-full table-auto overflow-x-auto rounded-lg">
                <thead className=" text-sm">
                    <tr className="bg-primary text-pure text-lg">
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
                            From Bank Name
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            To Bank Name
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
                            Status
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            View
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {[...Array(2).keys()].map((item, i) => (
                        <tr
                            key={item.id}
                            className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                        >
                            <td className=" text-gray-900   px-6 py-4 whitespace-nowrap text-center">
                                5,000
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                Sindh Bank (SIND)
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                Meezan Bank Limited (MEBL)
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                29 Nov 2023 08:56 AM
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <RequestStatus status="pending" />
                            </td>
                            <td className=" text-red-500  px-6 py-4 whitespace-nowrap text-center">
                                Details
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
                {<Pagination currentPage={1} pageCount={1} setPage={""} />}
            </table>
        </div>
    );
};

export default DepositsTable;
