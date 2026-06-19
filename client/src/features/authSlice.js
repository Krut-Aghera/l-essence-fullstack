import { createSlice } from "@reduxjs/toolkit"

const initialState = {
      isLoggedIn: false,
      userData: null,
      isAuthLoading: true,
};

const authSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
            authstate__login: (state, action) => {
                  state.isLoggedIn = true
                  state.userData = action.payload
            },

            authstate__logout: (state) => {
                  state.isLoggedIn = false
                  state.userData = {}
            },

            authstate__loading: (state, action) => {
                  state.isAuthLoading = action.payload
            }
      },
})

export const {
      authstate__login,
      authstate__logout,
      authstate__loading
} = authSlice.actions

export default authSlice.reducer;