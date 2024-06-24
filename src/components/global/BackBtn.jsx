import React from "react";
import { useNavigate } from "react-router-dom";

const BackBtn = ({ text = "Back", url }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => {
                if (url) {
                    return navigate(url);
                }
                navigate(-1);
            }}
            className="flex item-center gap-2 p-4 font-normal cursor-pointer transition-all"
        >
            <i className="uil uil-arrow-left text-lg"></i>
            <p>{text}</p>
        </div>
    );
};

export default BackBtn;
