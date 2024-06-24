import React from "react";
import Heading from "./Heading";
// import BackBtn from "./BackBtn";

const DashboardHeader = ({text}) => {
    return (
        <div>
            <Heading text={text} />
        </div>
    );
};

export default DashboardHeader;
