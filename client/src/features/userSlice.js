import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: [],
    orders: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userstate__setAddress: (state, action) => {
            state.address = action.payload;
        },
        userstate__setOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
});

export const { userstate__setAddress, userstate__setOrders } = userSlice.actions;

export default userSlice.reducer;
