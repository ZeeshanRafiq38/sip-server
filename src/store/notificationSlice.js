import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";

const notificationUrl = "/api/notification";
export const createNotification = createAsyncThunk(
    "notification/createNotification",
    async (createNotification, { getState }) => {
        const { token } = getState().admin.user;
        try {
            const response = await axios.post(
                notificationUrl,
                createNotification,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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
export const fetchNotifications = async (page) => {
    try {
        let response = await axios.get(`${notificationUrl}?page=${page}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getSingleNotification = async (id) => {
    try {
        let response = await axios.get(`${notificationUrl}/${id}`);
        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
    }
};
export const updateNotification = createAsyncThunk(
    "notification/updateNotification",
    async ({ id, editNotification }, { getState }) => {
        const { token } = getState().admin.user;
        try {
            let response = await axios.put(
                `${notificationUrl}/${id}`,
                editNotification,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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
const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        docs: null,
        page: 0,
        pages: 0,
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
    },
});
export const { setDocs, setPage, setPages } = notificationSlice.actions;
export default notificationSlice.reducer;
