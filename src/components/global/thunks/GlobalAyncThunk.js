import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";

export const createGlobalAsyncThunk = ({ type, method, url }) => {
    return createAsyncThunk(type, async ({ data, token, navigate }) => {
        // const { token } = getState().admin.user;
        try {
            const response = await axios[method](url, data, {
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
            if (navigate) {
                navigate();
            }
            return doc;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
    });
};
