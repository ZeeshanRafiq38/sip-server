import RequestStatus from "components/global/RequestStatus";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "utils/clickOutside";
import inviteFriend from "assets/images/invite-friend.jpg";
import Pagination from "components/global/pagination/index";
import { useSelector } from "react-redux";
import { setPage } from "store/PrizeSlice";
import { baseURL } from "api/axios";
import moment from "moment/moment";

const PrizesTable = () => {
    const { prizes, page, pages } = useSelector((state) => state.prize);
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
                            Title
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Cover Image
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
                    {prizes?.map((item, i) => (
                        <tr
                            key={item._id}
                            className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                        >
                            <td className="  px-6 py-4 whitespace-nowrap text-center ">
                                {item?.title}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                <img
                                    src={baseURL + item?.image}
                                    alt="prizes"
                                    className="w-32 rounded-full"
                                />
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                <RequestStatus
                                    status={
                                        item?.isActive === true
                                            ? "active"
                                            : "offline"
                                    }
                                />
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center ">
                                {moment(item?.createdAt).format("DD MMM YYYY")}
                            </td>
                            <td className=" text-gray-900  px-6 py-4 whitespace-nowrap  ">
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
                                                    to={`/settings/prizes-setup/edit/${item?._id}`}
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
            </table>
            {
                <Pagination
                    currentPage={page}
                    pageCount={pages}
                    setPage={setPage}
                />
            }
        </div>
    );
};

export default PrizesTable;
