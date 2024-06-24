import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";


const prizeUrl = "/api/prize";
export const createPrizeSetup = createAsyncThunk(
    "prize/createPrize",
    async (createPrize, { getState }) => {
        const { token } = getState().admin.user;
        try {
            const response = await axios.post(prizeUrl, createPrize, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            const {
                data: {
                    data: { doc, message },
                },
            } = response;
            toast.success(message);
            return doc;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
    }
);
export const fetchPrizes = async (token, page) => {
    try {
        let response = await axios.get(`${prizeUrl}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getSinglePrize = async (id, token) => {
    try {
        let response = await axios.get(`${prizeUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updatePrize = createAsyncThunk(
    "prize/updatePrize",
    async ({ id, body, token }) => {
        try {
            let response = await axios.put(`${prizeUrl}/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response);
            const {
                data: {
                    data: { doc, message },
                },
            } = response;

            toast.success(message);
            return doc;
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    }
);
const prizeSlice = createSlice({
    name: "prize",
    initialState: {
        prizes: null,
        page: 0,
        pages: 0,
    },
    reducers: {
        setPrizes(state, action) {
            state.prizes = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setPages(state, action) {
            state.pages = action.payload;
        },
    },
});
export const { setPrizes, setPage, setPages } = prizeSlice.actions;
export default prizeSlice.reducer;
