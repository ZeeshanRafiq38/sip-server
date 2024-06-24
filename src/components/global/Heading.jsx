import React from "react";

const Heading = ({ text }) => {
    return (
        <div>
            <h1 className="text-primary text-2xl font-semibold">{text}</h1>
        </div>
    );
};

export default Heading;
