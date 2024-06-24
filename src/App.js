import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./utilities.css";
import "./App.css";
import "react-accordion-comp/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "pages/authentication/Login";
import Dashboard from "pages/admin/Dashboard";
import UserManagement from "pages/admin/UserManagement";
import Investments from "pages/admin/Investments";
import PackageManagements from "pages/admin/PackageManagements";
import Deposits from "pages/admin/Deposits";
import DepositRequests from "pages/admin/DepositRequests";
import WithdrawRequests from "pages/admin/WithdrawRequests";
import WebsiteSetup from "pages/admin/settings/WebsiteSetup";
import DepositSetup from "pages/admin/settings/DepositSetup";
import PrizesSetup from "pages/admin/settings/PrizesSetup";
import DepositsReport from "pages/admin/reports/DepositsReport";
import LeaderReport from "pages/admin/reports/LeaderReport";
import PackagesReport from "pages/admin/reports/PackagesReport";
import Notifications from "pages/admin/Notifications";
import DepositRange from "pages/admin/DepositRange";
import DepositReqRange from "pages/admin/DepositReqRange";
import InvestDetails from "pages/admin/investments/InvestDetails";
import UsersView from "pages/admin/userManagement/UsersView";
import EditUser from "pages/admin/userManagement/EditUser";
import EditPackage from "pages/admin/packageManagement/EditPackage";
import WithdrawRequestsDetails from "pages/admin/withdrawRequests/WithdrawRequestsDetails";
import AddNew from "pages/admin/settings/depositSetup/AddNew";
import EditDepositBank from "pages/admin/settings/depositSetup/EditDepositBank";
import AddNewPrize from "pages/admin/settings/prizesSetup/AddNewPrize";
import Edit from "pages/admin/settings/prizesSetup/Edit";
import SendNotification from "pages/admin/notifications/SendNotification";
import EditNotification from "pages/admin/notifications/EditNotification";
import CreateNewPackage from "pages/admin/packageManagement/CreateNewPackage";
import DepositDetails from "pages/admin/depositRequests/DepositDetails";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import BlockedPopup from "components/global/popup/BlockedPopup";

function App() {
    const { showBlockedPopup } = useSelector((state) => state?.admin);
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* User Management  */}
                    <Route
                        path="/user-management"
                        element={<UserManagement />}
                    />
                    <Route
                        path="/user-management/users/:id"
                        element={<UsersView />}
                    />
                    <Route
                        path="/user-management/edit-user/:id"
                        element={<EditUser />}
                    />

                    {/* Investments  */}
                    <Route path="/investments" element={<Investments />} />
                    <Route
                        path="/investments/details/:id"
                        element={<InvestDetails />}
                    />
                    {/* package managment */}
                    <Route
                        path="/package-management"
                        element={<PackageManagements />}
                    />
                    <Route
                        path="/package-management/create-package"
                        element={<CreateNewPackage />}
                    />
                    <Route
                        path="/package-management/edit-package/:id"
                        element={<EditPackage />}
                    />

                    <Route path="/deposits/:id" element={<Deposits />} />
                    <Route
                        path="/deposits/select-range"
                        element={<DepositRange />}
                    />

                    <Route
                        path="/deposit-requests/:id"
                        element={<DepositRequests />}
                    />
                    <Route
                        path="/deposit-requests/select-range"
                        element={<DepositReqRange />}
                    />
                    <Route
                        path="/deposit-requests/details/:id"
                        element={<DepositDetails />}
                    />
                    <Route
                        path="/withdraw-requests"
                        element={<WithdrawRequests />}
                    />
                    <Route
                        path="/withdraw-requests-details/:id"
                        element={<WithdrawRequestsDetails />}
                    />

                    <Route
                        path="/settings/website-setup"
                        element={<WebsiteSetup />}
                    />
                    <Route
                        path="/settings/deposit-setup"
                        element={<DepositSetup />}
                    />
                    <Route
                        path="/settings/deposit-setup/add-new"
                        element={<AddNew />}
                    />
                    <Route
                        path="/settings/deposit-setup/edit/:id"
                        element={<EditDepositBank />}
                    />
                    <Route
                        path="/settings/prizes-setup"
                        element={<PrizesSetup />}
                    />
                    <Route
                        path="/settings/prizes-setup/add-new"
                        element={<AddNewPrize />}
                    />
                    <Route
                        path="/settings/prizes-setup/edit/:id"
                        element={<Edit />}
                    />
                    <Route
                        path="/reports/deposits-report"
                        element={<DepositsReport />}
                    />
                    <Route
                        path="/reports/Leader-report"
                        element={<LeaderReport />}
                    />
                    <Route
                        path="/reports/packages-report"
                        element={<PackagesReport />}
                    />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route
                        path="/notifications/send-notification"
                        element={<SendNotification />}
                    />
                    <Route
                        path="/notifications/edit/:id"
                        element={<EditNotification />}
                    />
                </Routes>
            </Router>
            {showBlockedPopup && <BlockedPopup />}
        </div>
    );
}

export default App;
