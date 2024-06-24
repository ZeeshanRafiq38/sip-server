import React from "react";

const RequestStatus = ({ status }) => {
    return (
        <div>
            <div
                className={`
                ${
                    status === "running"
                        ? "bg-yellow-100 text-yellow-500"
                        : status === "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : status === "approved"
                        ? "bg-green-100 text-green-500"
                        : status === "declined"
                        ? "bg-red-100 text-red-500"
                        : status === "active"
                        ? "bg-green-100 text-green-500"
                        : status === "completed"
                        ? "bg-green-100 text-green-500"
                        : ""
                }
                text-xs px-2 rounded-md flex items-center gap-2 py-1 font-medium w-fit capitalize`}
            >
                <p
                    className={`
                ${
                    status === "running"
                        ? "bg-yellow-500"
                        : status === "pending"
                        ? "bg-yellow-500"
                        : status === "approved"
                        ? "bg-green-500"
                        : status === "declined"
                        ? "bg-red-500"
                        : status === "active"
                        ? "bg-green-500"
                        : status === "completed"
                        ? "bg-green-500 "
                        : ""
                }
                w-2 h-2 rounded-full
                `}
                ></p>
                <span>{status}</span>
            </div>
        </div>
    );
};

export default RequestStatus;
