import { createSlice } from "@reduxjs/toolkit"

const initialState = {
      address: []
};

const userSlice = createSlice({
      name: "user",
      initialState,
      reducers: {
            userstate__setAddress: (state, action) => {
                  state.address = action.payload
            }
      },
})

export const {
      userstate__setAddress,
} = userSlice.actions

export default userSlice.reducer;