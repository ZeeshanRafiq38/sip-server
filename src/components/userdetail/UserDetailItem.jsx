import React from "react";

const UserDetailItem = ({ value, title }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center bg-pure">
            <h2 className="text-primary text-2xl font-bold">{value}</h2>
            <p className="font-medium ">{title}</p>
        </div>
    );
};

export default UserDetailItem;
