import NotFound from "components/global/NotFound";
import Pagination from "components/global/pagination/index";

import RequestStatus from "components/global/RequestStatus";
import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setPage } from "store/withdrawRequestsSlice";

const WithdrawHistoryTable = ({ getAllWithdraws, handleWithdraw }) => {
    const params = useParams();
    const { page, pages } = useSelector((state) => state.withdrawRequests);
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
                    {getAllWithdraws.length > 0 ? (
                        getAllWithdraws?.map((item, i) => (
                            <tr
                                key={item._id}
                                className="bg-white border-b border-slate-200 transition duration-300 ease-in-out"
                            >
                                <td className=" px-6 py-4 whitespace-nowrap text-center flex flex-col gap-1">
                                    <p className="text-primary underline">
                                        {item?.username}
                                    </p>
                                    <span>{item?.phone}</span>
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center text-xl font-semibold">
                                    {item?.withdrawBank?.bankName} <br />{" "}
                                    {item?.phone}
                                    <br /> {
                                        item?.withdrawBank?.accountHolder
                                    }{" "}
                                    <br /> {item?.withdrawAmount}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center">
                                    <RequestStatus status={item?.status} />
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center">
                                    {moment(item?.createdAt).format(
                                        "DD MMM YYYY"
                                    )}
                                </td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex justify-center"></td>
                                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap text-center flex items-center gap-4">
                                    <i
                                        onClick={() =>
                                            handleWithdraw(
                                                item?._id,
                                                "completed"
                                            )
                                        }
                                        className="uil uil-check bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-pure"
                                    ></i>
                                    <i
                                        onClick={() =>
                                            handleWithdraw(
                                                item?._id,
                                                "declined"
                                            )
                                        }
                                        className="uil uil-times bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-pure"
                                    ></i>
                                    <Link
                                        to={`/withdraw-requests-details/${item?._id}`}
                                    >
                                        <span className="underline">
                                            Details
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <NotFound text={"Withdraws not found"} />
                    )}
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

export default WithdrawHistoryTable;
