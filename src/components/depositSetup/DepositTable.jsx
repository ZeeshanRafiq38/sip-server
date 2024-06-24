import axios from "api/axios";
import Pagination from "components/global/pagination/index";
import RequestStatus from "components/global/RequestStatus";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { removeBank, setPage } from "store/depositBankSlice";
import useClickOutside from "utils/clickOutside";

const bankUrl = "/api/deposit-bank";
const DepositTable = () => {
    const { banks } = useSelector((state) => state.createBank);
    const { user } = useSelector((state) => state.admin);
    const token = user?.token;
    const dispatch = useDispatch();
    const dropMenuRef = useRef(null);
    const [showDropMenu, setShowDropMenu] = useState(false);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    useClickOutside(dropMenuRef, () => setShowDropMenu(false));

    const deleteBank = async (_id) => {
        if (window.confirm("Are you sure, you want to delete bank?")) {
            try {
                let response = await axios.delete(`${bankUrl}/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(removeBank(_id));
                toast.success(response.data.data.message);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    if (banks?.length > 0) {
        return (
            <div className="shadow-lg overflow-x-auto my-8 rounded-lg">
                <table className="w-full table-auto overflow-x-auto rounded-lg">
                    <thead className=" text-sm">
                        <tr className="bg-primary text-pure text-md">
                            <th
                                scope="col"
                                className=" font-medium px-6 py-4 text-center"
                            >
                                Bank Details
                            </th>
                            <th
                                scope="col"
                                className=" font-medium px-6 py-4 text-center"
                            >
                                Min Deposit
                            </th>
                            <th
                                scope="col"
                                className=" font-medium px-6 py-4 text-center"
                            >
                                Max Deposit
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
                                Status
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
                        {banks?.map((item, i) => (
                            <tr
                                key={item?._id}
                                className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                            >
                                <td className="text-md font-semibold  px-6 py-4 whitespace-nowrap text-center ">
                                    {item?.bankName}
                                    <br />
                                    {item?.accountNo} <br />
                                    {item?.accountHolder}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center ">
                                    {item?.minDeposit}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center ">
                                    {item?.maxDeposit}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center ">
                                    {item?.totalDeposit}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap flex justify-center items-center mt-5 ">
                                    <RequestStatus
                                        status={`${
                                            item?.isActive
                                                ? "active"
                                                : "declined"
                                        }`}
                                    />
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap  ">
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
                                                    className="absolute top-10  bg-pure shadow-lg w-[120px] h-auto rounded-lg z-[50] border flex flex-col"
                                                    ref={dropMenuRef}
                                                >
                                                    <Link
                                                        to={`/settings/deposit-setup/edit/${item?._id}`}
                                                        className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer flex items-center gap-1"
                                                    >
                                                        <span>Edit User</span>
                                                    </Link>

                                                    <div
                                                        className="py-3 font-medium hover:bg-gray-100 px-4 cursor-pointer"
                                                        onClick={() =>
                                                            deleteBank(
                                                                item?._id
                                                            )
                                                        }
                                                    >
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
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <h2 className="text-2xl text-black">Banks Not found</h2>
            </div>
        );
    }
};

export default DepositTable;
