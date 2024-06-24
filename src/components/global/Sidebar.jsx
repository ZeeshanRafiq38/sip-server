import Logo from "assets/svgs/Logo";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutUser } from "store/loginSlice";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showOrderDropMenu, setShowOrderDropMenu] = useState(true);
    const location = useLocation();
    const isActive = (path, home) => {
        if (home) return location.pathname === "/";
        return location.pathname.split("/").includes(path);
    };
    const handleLogout = () => {
        dispatch(LogoutUser(navigate));
    };
    return (
        <div className="fixed w-[270px] overflow-auto h-full">
            <div className="flex justify-center py-6 border-slate-200 border-b-[1px]">
                <Logo />
            </div>
            <div>
                <ul className="py-6">
                    <Link to="/dashboard">
                        <li
                            className={`${
                                isActive("", true) ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("", true) ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-apps"></i>
                                <span>Dashboard</span>
                            </div>
                        </li>
                    </Link>

                    <Link to="/user-management">
                        <li
                            className={`${
                                isActive("user-management") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("user-management") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-accessible-icon-alt"></i>
                                <span>User Management</span>
                            </div>
                        </li>
                    </Link>
                    <Link to="/investments">
                        <li
                            className={`${
                                isActive("investments") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("investments") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-usd-circle"></i>
                                <span>Investments</span>
                            </div>
                        </li>
                    </Link>
                    <Link to="/package-management">
                        <li
                            className={`${
                                isActive("package-management") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("package-management") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-sitemap"></i>
                                <span>Package Management</span>
                            </div>
                        </li>
                    </Link>
                    <Link to="/deposits/select-range">
                        <li
                            className={`${
                                isActive("deposits") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("deposits") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-usd-circle"></i>
                                <span>Deposits</span>
                            </div>
                        </li>
                    </Link>
                    <Link to="/deposit-requests/select-range">
                        <li
                            className={`${
                                isActive("deposit-requests") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("deposit-requests") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-usd-circle"></i>
                                <span>Deposit Requests</span>
                            </div>
                        </li>
                    </Link>
                    <Link to="/withdraw-requests">
                        <li
                            className={`${
                                isActive("withdraw-requests") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("withdraw-requests") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-analytics"></i>
                                <span>Withdraw Requests</span>
                            </div>
                        </li>
                    </Link>

                    <li
                        className={`${
                            isActive("settings") ? "active" : ""
                        } sidemenu-item`}
                    >
                        <div
                            className={`${
                                isActive("settings") ? "line" : ""
                            } py-3 pl-3 flex items-center gap-3`}
                        >
                            <i className="uil uil-setting"></i>
                            <span>Settings</span>
                        </div>
                    </li>

                    {/* DROP MENU */}
                    {showOrderDropMenu && (
                        <ul className="flex flex-col gap-1">
                            <li
                                className={`${
                                    isActive("website-setup")
                                        ? "drop-active"
                                        : ""
                                }
                                    dropMenu-item
                                    `}
                            >
                                <Link
                                    to="/settings/website-setup"
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className={`${
                                            isActive("website-setup")
                                                ? "dot-active"
                                                : ""
                                        } dot`}
                                    ></div>
                                    <span>Website Setup</span>
                                </Link>
                            </li>
                            <li
                                className={`${
                                    isActive("deposit-setup")
                                        ? "drop-active"
                                        : ""
                                }
                                    dropMenu-item
                                    `}
                            >
                                <Link
                                    to="/settings/deposit-setup"
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className={`${
                                            isActive("deposit-setup")
                                                ? "dot-active"
                                                : ""
                                        } dot`}
                                    ></div>
                                    <span>Deposit Setup</span>
                                </Link>
                            </li>
                            <li
                                className={`${
                                    isActive("prizes-setup")
                                        ? "drop-active"
                                        : ""
                                }
                                    dropMenu-item
                                    `}
                            >
                                <Link
                                    to="/settings/prizes-setup"
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className={`${
                                            isActive("prizes-setup")
                                                ? "dot-active"
                                                : ""
                                        } dot`}
                                    ></div>
                                    <span>Prizes Setup</span>
                                </Link>
                            </li>
                        </ul>
                    )}

                    <li
                        className={`${
                            isActive("reports") ? "active" : ""
                        } sidemenu-item`}
                    >
                        <div
                            className={`${
                                isActive("reports") ? "line" : ""
                            } py-3 pl-3 flex items-center gap-3`}
                        >
                            <i className="uil uil-chart-line"></i>
                            <span>Reports & Analytics</span>
                        </div>
                    </li>
                    {/* DROP MENU */}
                    {showOrderDropMenu && (
                        <ul className="flex flex-col gap-1">
                            <li
                                className={`${
                                    isActive("deposits-report")
                                        ? "drop-active"
                                        : ""
                                }
                                    dropMenu-item
                                    `}
                            >
                                <Link
                                    to="/reports/deposits-report"
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className={`${
                                            isActive("deposits-report")
                                                ? "dot-active"
                                                : ""
                                        } dot`}
                                    ></div>
                                    <span>Deposits Report</span>
                                </Link>
                            </li>
                            <li
                                className={`${
                                    isActive("leader-report")
                                        ? "drop-active"
                                        : ""
                                }
                                    dropMenu-item
                                    `}
                            >
                                <Link
                                    to="/reports/leader-report"
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className={`${
                                            isActive("leader-report")
                                                ? "dot-active"
                                                : ""
                                        } dot`}
                                    ></div>
                                    <span>Leader-Report</span>
                                </Link>
                            </li>
                            <li
                                className={`${
                                    isActive("packages-report")
                                        ? "drop-active"
                                        : ""
                                }
                                    dropMenu-item
                                    `}
                            >
                                <Link
                                    to="/reports/packages-report"
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className={`${
                                            isActive("packages-report")
                                                ? "dot-active"
                                                : ""
                                        } dot`}
                                    ></div>
                                    <span>Packages Report</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                    <Link to="/notifications">
                        <li
                            className={`${
                                isActive("notifications") ? "active" : ""
                            } sidemenu-item`}
                        >
                            <div
                                className={`${
                                    isActive("notifications") ? "line" : ""
                                } py-3 pl-3 flex items-center gap-3`}
                            >
                                <i className="uil uil-pricetag-alt"></i>
                                <span>Notifications</span>
                            </div>
                        </li>
                    </Link>

                    <div className="pl-2" onClick={handleLogout}>
                        <li className="sidemenu-item flex items-center gap-3 pl-3 ">
                            <i className="uil uil-signout"></i>
                            <span>Sign Out</span>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
