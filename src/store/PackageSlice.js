import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";

const packageUrl = "/api/package";
export const createPackage = createAsyncThunk(
    "package/createPackage",
    async ({ body, navigate }, { getState }) => {
        const { token } = getState().admin.user;
        try {
            const response = await axios.post(packageUrl, body, {
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
            navigate("/package-management");
            return doc;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
    }
);
export const fetchPackages = async () => {
    try {
        let response = await axios.get(packageUrl);
        const {
            data: {
                data: { docs },
            },
        } = response;
        return docs;
    } catch (error) {
        console.log(error);
    }
};
export const getSinglePackage = async (id) => {
    try {
        let response = await axios.get(`${packageUrl}/${id}`);
        console.log(response)
        const {
            data: {
                data: { doc },
            },
        } = response;
        return doc;
    } catch (error) {
        console.log(error);
    }
};

export const updatePackage = async ({id, body, token}) => {
    try {
        let response = await axios.put(`${packageUrl}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
};

const packageSlice = createSlice({
    name: "package",
    initialState: {
        packages: null,
    },
    reducers: {
        setPackages(state, action) {
            state.packages = action.payload;
        },
    },
});
export const { setPackages } = packageSlice.actions;
export default packageSlice.reducer;
