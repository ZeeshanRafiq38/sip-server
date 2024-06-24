import Pagination from "components/global/pagination/index";

import RequestStatus from "components/global/RequestStatus";
import moment from "moment/moment";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useClickOutside from "utils/clickOutside";

const PackageTable = () => {
    const { packages } = useSelector((state) => state.package);
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
                            Package Name
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Daily Profit %
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Time Period
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Invest Range
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
                            Created On
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
                    {packages?.map((item, i) => (
                        <tr
                            key={item?._id}
                            className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                        >
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.name}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.dailyProfit}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.timePeriod}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {item?.minInvest} - {item?.maxInvest}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <RequestStatus
                                    status={item?.isActive ? "active" : "block"}
                                />
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                {moment(item?.createdAt).format("DD-MM-YYYY")}
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
                                                    to={`/package-management/edit-package/${item?._id}`}
                                                    className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1"
                                                >
                                                    <span>Edit User</span>
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

export default PackageTable;
