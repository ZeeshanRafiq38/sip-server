import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";

const loginUrl = "/api/user/admin-login";
const logoutUrl = "/api/user/logout";
export const LoginUser = createAsyncThunk(
    "admin/adminLogin",
    async ({ formData, navigate }, { dispatch }) => {
        // console.log({ formData });
        const body = { ...formData };
        try {
            dispatch(setLoading(true));
            const response = await axios.post(loginUrl, body);
            const {
                data: {
                    data: { doc, message },
                },
            } = response;
            if (doc.isActive) {
                if (response.data.data.doc.token) {
                    localStorage.setItem(
                        "admin",
                        JSON.stringify(response.data.data.doc)
                    );
                }
                dispatch(setUser(doc));
                toast.success(message);
                navigate("/dashboard");
                dispatch(setLoading(false));
            } else {
                setLoading(false);
                return dispatch(setShowBlockedPopup(true));
            }
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);
export const LogoutUser = createAsyncThunk(
    "admin/logoutAdmin",
    async (navigate, { dispatch }) => {
        try {
            const response = await axios.get(logoutUrl);
            const {
                data: {
                    data: { message },
                },
            } = response;
            // console.log(response);
            dispatch(setUser(null));
            localStorage.removeItem("admin");
            navigate("/login");
            toast.success(message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);
const loginSlice = createSlice({
    name: "admin",
    initialState: {
        user: JSON.parse(localStorage.getItem("admin")) || null,
        loading: false,
        showBlockedPopup: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setShowBlockedPopup(state, action) {
            state.showBlockedPopup = action.payload;
        },
    },
});
export const { setUser, setLoading, setShowBlockedPopup } = loginSlice.actions;
export default loginSlice.reducer;
