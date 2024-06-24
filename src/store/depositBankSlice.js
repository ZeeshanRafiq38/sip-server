import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "api/axios";
import { toast } from "react-toastify";

const createBankUrl = "/api/deposit-bank";
export const createBank = createAsyncThunk(
    "deposit/createBank",
    async ({ addBank, navigate }, { getState, dispatch }) => {
        const { token } = getState().admin.user;
        const body = { ...addBank };
        if (!body.depositBonus) {
            delete body.depositBonus;
        }
        try {
            const response = await axios.post(createBankUrl, body, {
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
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
    }
);

const depositBankSlice = createSlice({
    name: "createBank",
    initialState: {
        banks: null,
        SingleBank: null,
    },
    reducers: {
        setBanks(state, action) {
            state.banks = action.payload;
        },
        removeBank(state, action) {
            state.banks = state.banks.filter(
                (item) => item?._id !== action.payload
            );
        },
        setSingleBank(state, action) {
            state.banks = action.payload;
        },
    },
});
export const { setBanks, removeBank, setSingleBank } = depositBankSlice.actions;
export default depositBankSlice.reducer;
