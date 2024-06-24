import { createSlice } from "@reduxjs/toolkit";

const depositsSlice = createSlice({
    name: "deposits",
    initialState: {
        docs: null,
        docsCount: 0,
        page: 0,
        pages: 0,
        keyword: "",
        sort: "",
        from: "",
        to: "",
    },
    reducers: {
        setDocsCount(state, action) {
            state.docsCount = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setPages(state, action) {
            state.pages = action.payload;
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
        setDocs(state, action) {
            state.docs = action.payload;
        },
    },
});
export const {
    setKeyword,
    setSort,
    setFrom,
    setTo,
    setDocs,
    setDocsCount,
    setPage,
    setPages,
} = depositsSlice.actions;
export default depositsSlice.reducer;
