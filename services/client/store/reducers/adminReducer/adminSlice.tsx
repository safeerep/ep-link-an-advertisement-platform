import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "@/types/admin";
import {
    login,
    checkAuth,
    authRequired,
    logout,
    getAllUsers,
    banAUser,
    addCategory,
    getAllCategories,
    changeCategoryStatus,
    getCategoryDetails,
    getProducts,
    getPremiumPolicies,
    updatePremiumPolicy,
    getReportedUsers,
    getReportedProducts, 
} from "@/store/actions/adminActions/adminActions";


const INITIAL_STATE: AdminState = {
    loading: false,
    data: null,
    error: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // admin login
            .addCase(login.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // auth-check
            .addCase(checkAuth.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // auth-check on required pages
            .addCase(authRequired.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(authRequired.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(authRequired.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // users-fetching
            .addCase(getAllUsers.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getAllUsers.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on ban of a user
            .addCase(banAUser.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(banAUser.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(banAUser.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // adding a new category
            .addCase(addCategory.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(addCategory.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetching all categories
            .addCase(getAllCategories.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // changing category status
            .addCase(changeCategoryStatus.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(changeCategoryStatus.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(changeCategoryStatus.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetching current category details
            .addCase(getCategoryDetails.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getCategoryDetails.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getCategoryDetails.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetching all products for admin
            .addCase(getProducts.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getProducts.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetching all premium policies
            .addCase(getPremiumPolicies.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getPremiumPolicies.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getPremiumPolicies.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // updating premium policies
            .addCase(updatePremiumPolicy.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(updatePremiumPolicy.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(updatePremiumPolicy.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetching the list of reported users;
            .addCase(getReportedUsers.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getReportedUsers.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getReportedUsers.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetching the list of reported products;
            .addCase(getReportedProducts.pending, (state: AdminState) => {
                state.loading = true;
            })
            .addCase(getReportedProducts.fulfilled, (state: AdminState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getReportedProducts.rejected, (state: AdminState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})

export default adminSlice.reducer;