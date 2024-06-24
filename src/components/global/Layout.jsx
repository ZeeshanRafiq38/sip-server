import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className=" ml-[270px]">
                <Topbar />
                <div className="p-8 bg-slate-50 w-full">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
