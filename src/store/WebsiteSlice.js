import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";

const createSettingUrl = "/api/setting";
export const createWebsiteSetup = createAsyncThunk(
    "settings/websiteSetup",
    async (body, { getState }) => {
        const { token } = getState().user.user;
        try {
            const response = await axios.post(createSettingUrl, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            toast.success(response?.data?.data?.message);
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
    }
);
const websiteSetupSlice = createSlice({
    name: "settings",
    initialState: {},
});
export default websiteSetupSlice.reducer;
