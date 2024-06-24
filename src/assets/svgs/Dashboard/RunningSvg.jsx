import React from "react";

const RunningSvg = ({activeTab}) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 17.3332H0V12.3332L3.33333 8.99984L0 5.6665V0.666504H10V5.6665L6.66667 8.99984L10 12.3332M1.66667 5.24984L5 8.58317L8.33333 5.24984V2.33317H1.66667M5 9.4165L1.66667 12.7498V15.6665H8.33333V12.7498M6.66667 13.9998H3.33333V13.3332L5 11.6665L6.66667 13.3332V13.9998Z"
                fill={ activeTab === "running" ? "var(--primary)" : "var(--gray)"}
                fill-opacity="1"
            ></path>
        </svg>
    );
};

export default RunningSvg;
