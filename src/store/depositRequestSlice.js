import { createSlice } from "@reduxjs/toolkit";

const depositRequestSlice = createSlice({
    name: "depositRequest",
    initialState: {
        keyword: "",
        docsCount: 0,
        page: 0,
        pages: 0,
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
    },
});
export const { setKeyword, setPage, setPages, setDocsCount } =
    depositRequestSlice.actions;
export default depositRequestSlice.reducer;
