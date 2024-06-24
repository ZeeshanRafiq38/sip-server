import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import depositBankSlice from "./depositBankSlice";
import WebsiteSlice from "./WebsiteSlice";
import userSlice from "./userSlice";
import PackageSlice from "./PackageSlice";
import depositsSlice from "./depositsSlice";
import depositRequestSlice from "./depositRequestSlice";
import investmentSlice from "./investmentSlice";
import withdrawRequestsSlice from "./withdrawRequestsSlice";
import PrizeSlice from "./PrizeSlice";
import notificationSlice from "./notificationSlice";
const store = configureStore({
    reducer: {
        admin: loginSlice,
        users: userSlice,
        createBank: depositBankSlice,
        settings: WebsiteSlice,
        package: PackageSlice,
        deposits: depositsSlice,
        depositRequest: depositRequestSlice,
        investment: investmentSlice,
        withdrawRequests: withdrawRequestsSlice,
        prize: PrizeSlice,
        notification : notificationSlice
    },
});

export default store;
