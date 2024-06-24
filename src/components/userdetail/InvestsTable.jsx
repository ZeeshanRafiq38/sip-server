import Pagination from "components/global/pagination/index";

import RequestStatus from "components/global/RequestStatus";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "utils/clickOutside";

const InvestsTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu, setShowDropMenu] = useState(false);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    useClickOutside(dropMenuRef, () => setShowDropMenu(false));
    return (
        <div className="shadow-lg overflow-x-auto my-8 rounded-lg">
            <table className="w-full table-auto overflow-x-auto rounded-lg">
                <thead className=" text-sm">
                    <tr className="bg-primary text-pure text-lg">
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            username
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
                                abu baker
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                Faysal Bank
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                1,000
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                5%
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <RequestStatus status="running" />
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                28 Nov 2023 01:53 PM
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                                <div className="flex items-end justify-center relative">
                                    <div
                                        className="bg-gray py-1.5 px-4 flex items-center rounded-md text-pure gap-2 text-lg w-fit cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDropMenu((prev) => !prev);
                                            setSelectedMenuIndex(i);
                                        }}
                                    >
                                        <div>
                                            <i className="uil uil-setting"></i>
                                        </div>
                                        <div>
                                            <i className="uil uil-angle-down"></i>
                                        </div>
                                    </div>
                                    {/* DROP MENU */}
                                    {showDropMenu &&
                                        selectedMenuIndex === i && (
                                            <div
                                                className="absolute top-10  bg-pure shadow-lg w-[120px] h-auto rounded-lg z-[50] border flex flex-col"
                                                ref={dropMenuRef}
                                            >
                                                <Link
                                                    to="/investments/details"
                                                    className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1"
                                                >
                                                    <span>Details</span>
                                                </Link>
                                                <div className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer">
                                                    Delete
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {<Pagination currentPage={1} pageCount={1} setPage={""} />}
            </table>
        </div>
    );
};

export default InvestsTable;
