import { createSlice } from "@reduxjs/toolkit";

const cartData = {
    cart: [],
    appliedCoupon: null,
    totalItems: 0,
    totalQuantity: 0,
    currentCartState: {
        subtotal: 0,
        shipping: 0,
        discountAmount: 0,
        grandTotal: 0,
    },
};

const initialState = {
    perfumes: [],
    newArrivals: [],
    wishlist: [],
    cartData,
    loading: false,
    error: null,
    brands: [],
};

const perfumeSlice = createSlice({
    name: "perfume",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setPerfumes: (state, action) => {
            state.perfumes = action.payload;
        },

        setBrands: (state, action) => {
            state.brands = action.payload;
        },

        setNewArrivals: (state, action) => {
            state.newArrivals = action.payload;
        },

        addNewArrival: (state, action) => {
            state.newArrivals = [action.payload, ...state.newArrivals]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4);
        },

        setWishlist: (state, action) => {
            state.wishlist = action.payload.sort(
                (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
            );
        },

        clearWishlist: (state) => {
            state.wishlist = [];
        },

        setCartData: (state, action) => {
            state.cartData.cart = action.payload?.cart?.items || [];

            state.cartData.appliedCoupon = action.payload?.cart?.appliedCoupon || null;

            state.cartData.totalItems = action.payload?.totalItems;
            state.cartData.totalQuantity = action.payload?.totalQuantity;

            state.cartData.currentCartState = action.payload?.pricing || {
                subtotal: 0,
                shipping: 0,
                discountAmount: 0,
                grandTotal: 0,
            };
        },

        clearCartData: (state) => {
            state.cartData.cart = [];
            state.cartData.totalItems = 0;
            state.cartData.totalQuantity = 0;
            state.cartData.appliedCoupon = null;
            state.cartData.currentCartState = {
                subtotal: 0,
                shipping: 0,
                discountAmount: 0,
                grandTotal: 0,
            };
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setPerfumes,
    setNewArrivals,
    addNewArrival,
    setWishlist,
    clearWishlist,
    setBrands,
    setCartData,
    clearCartData,
    setError,
    clearError,
} = perfumeSlice.actions;

export default perfumeSlice.reducer;
