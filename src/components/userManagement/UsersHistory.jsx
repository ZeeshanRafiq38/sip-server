import axios from "api/axios";
import NotFound from "components/global/NotFound";
import Pagination from "components/global/pagination/index";
import moment from "moment/moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { removeDoc, setPage } from "store/userSlice";
import useClickOutside from "utils/clickOutside";

const UsersHistory = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.admin);
    const { docs, page, pages } = useSelector((state) => state?.users);
    const dropMenuRef = useRef(null);
    const [showDropMenu, setShowDropMenu] = useState(false);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    useClickOutside(dropMenuRef, () => setShowDropMenu(false));

    const deleteUser = async (_id) => {
        if (window.confirm("Are you sure, you want to delete user?")) {
            try {
                let response = await axios.delete(`/api/user/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                dispatch(removeDoc(_id));
                toast.success(response.data.data.message);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="shadow-lg overflow-x-auto my-8 rounded-lg">
            <table className="w-full table-auto overflow-x-auto rounded-lg">
                <thead className=" text-sm">
                    <tr className="bg-primary text-pure text-lg">
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Username
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Phone
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Joined
                        </th>
                        <th
                            scope="col"
                            className=" font-medium px-6 py-4 text-center"
                        >
                            Total Deposit
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
                    {docs?.length > 0 ? (
                        docs?.map((item, i) => (
                            <tr
                                key={item?._id}
                                className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                            >
                                <td className=" text-primary  px-6 py-4 whitespace-nowrap text-center underline">
                                    {item?.username}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                    {item?.phone}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                    {moment(item?.createdAt).format(
                                        "DD-MM-YYYY"
                                    )}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                    {item?.wallet?.totalDepositAmount}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                                    <div className="flex items-end justify-center relative">
                                        <div
                                            className="bg-gray py-1.5 px-4 flex items-center rounded-md text-pure gap-2 text-lg w-fit cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowDropMenu(
                                                    (prev) => !prev
                                                );
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
                                                    className="absolute top-10  bg-pure shadow-lg w-[120px] h-auto rounded-lg z-50 border flex flex-col"
                                                    ref={dropMenuRef}
                                                >
                                                    <Link
                                                        to={`/user-management/users/${item?._id}`}
                                                        className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1"
                                                    >
                                                        <span>View</span>
                                                    </Link>
                                                    <Link
                                                        to={`/user-management/edit-user/${item?._id}`}
                                                    >
                                                        <div className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1">
                                                            <span>
                                                                Edit User
                                                            </span>
                                                        </div>
                                                    </Link>
                                                    <button
                                                        className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer"
                                                        onClick={() =>
                                                            deleteUser(
                                                                item?._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <NotFound text="Users Not Found" />
                    )}
                </tbody>
                {docs?.length > 0 && (
                    <Pagination
                        currentPage={page}
                        pageCount={pages}
                        setPage={setPage}
                    />
                )}
            </table>
        </div>
    );
};
export default UsersHistory;
