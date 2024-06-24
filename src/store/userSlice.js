import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        docs: null,
        page: 0,
        pages: 0,
        docsCount: 0,
        todayJoined: 0,
        totalUsers: 0,
        yesterdayJoined: 0,
        keyword: "",
        sort: "",
        from: "",
        to: "",
        singleDoc: null,
        totalBalance: "",
        description: "",
    },
    reducers: {
        setDocs(state, action) {
            state.docs = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setPages(state, action) {
            state.pages = action.payload;
        },
        setDocsCount(state, action) {
            state.docsCount = action.payload;
        },
        setTodayJoined(state, action) {
            state.todayJoined = action.payload;
        },
        setTotalUsers(state, action) {
            state.totalUsers = action.payload;
        },
        setYesterdayJoined(state, action) {
            state.yesterdayJoined = action.payload;
        },
        setKeyword(state, action) {
            state.keyword = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setFrom(state, action) {
            state.from = action.payload;
        },
        setTo(state, action) {
            state.to = action.payload;
        },
        removeDoc(state, action) {
            state.docs = state.docs.filter(
                (item) => item?._id !== action.payload
            );
        },
        setSingleDoc(state, action) {
            state.singleDoc = action.payload;
        },
        setTotalBalance(state, action) {
            state.totalBalance = action.payload;
        },
        setDescription(state, action) {
            state.description = action.payload;
        },
    },
});
export const {
    setDocs,
    setPage,
    setPages,
    setDocsCount,
    setTodayJoined,
    setTotalUsers,
    setYesterdayJoined,
    setKeyword,
    setSort,
    setFrom,
    setTo,
    removeDoc,
    setSingleDoc,
    setTotalBalance,
    setDescription,
} = userSlice.actions;
export default userSlice.reducer;
