import UserSvg from "assets/svgs/admin/UserSvg";
import React from "react";

const TotalUsers = () => {
    return (
        <div className="rounded-md text-primary bg-pure flex flex-col gap-8 p-4  text-xl shadow-md">
            <p className="font-semibold">Total Withdraw</p>
            <div className="flex justify-between items-end h-full font-bold">
                <span>Rs. 1k</span>
                <UserSvg />
            </div>
        </div>
    );
};

export default TotalUsers;
