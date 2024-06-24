import React from "react";

const NotFound = ({ text }) => {
    return (
        <tr className="text-center text-2xl font-semibold font-mono  h-[200px]">
            <td colSpan={7}>{text}</td>
        </tr>
    );
};

export default NotFound;
