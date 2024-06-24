import axios from "api/axios";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const investAmountUrl = "/api/invest";
const getSingleInvest = "/api/invest";
export const getAllInvestments = async (
    token,
    page,
    pages,
    from,
    to,
    keyword,
    sort
) => {
    try {
        let response = await axios.get(
            `${investAmountUrl}?page=${page}&pages=${pages}&from=${from}&to=${to}&keyword=${keyword}&sort=${sort}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response);
        return response;
    } catch (error) {
        const {
            response: {
                data: { message },
            },
        } = error;
        toast.error(message);
    }
};
export const fetchSingleInvest = async (id, token) => {
    try {
        let response = await axios.get(`${getSingleInvest}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const {
            data: {
                data: { doc },
            },
        } = response;
        console.log(response);
        return doc;
    } catch (error) {
        const {
            response: {
                data: { message },
            },
        } = error;
        toast.error(message);
    }
};
export const deleteSingleInvest = async (id, token) => {
    try {
        let response = await axios.delete(`${getSingleInvest}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const {
            data: {
                data: { doc },
            },
        } = response;
        console.log(response);
        return doc;
    } catch (error) {
        const {
            response: {
                data: { message },
            },
        } = error;
        toast.error(message);
    }
};
const investmentSlice = createSlice({
    name: "investment",
    initialState: {
        docs: [],
        doc: {},
        page: 0,
        pages: 0,
        from: "",
        to: "",
        keyword: "",
        sort: "",
    },
    reducers: {
        setDocs(state, action) {
            state.docs = action.payload;
        },
        setDoc(state, action) {
            state.doc = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setPages(state, action) {
            state.pages = action.payload;
        },
        setFrom(state, action) {
            state.from = action.payload;
        },
        setTo(state, action) {
            state.to = action.payload;
        },
        setKeyword(state, action) {
            state.keyword = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
    },
});

export const {
    setDocs,
    setDoc,
    setPage,
    setPages,
    setFrom,
    setTo,
    setKeyword,
    setSort,
} = investmentSlice.actions;
export default investmentSlice.reducer;
