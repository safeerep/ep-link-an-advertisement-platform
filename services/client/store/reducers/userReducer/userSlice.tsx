import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    checkAuth,
    login,
    register, 
    authRequired, 
    logout,
    RequestToResetPassword, 
    getAllCategories, 
    addProduct, 
    getProducts,
    getCurrentUserProducts, 
    getSpecificProduct,
    followUser,
    unFollowUser,
    editProduct,
    makeProductAvailable,
    makeProductSoldOut,
    getSellerProfile,
    updateProfile,
    
} from "@/store/actions/userActions/userActions";
import { UserState } from "@/types/user";


const INITIAL_STATE: UserState = {
    loading: false,
    data: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(register.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state: UserState, action: PayloadAction<string>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state: UserState, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message;
            })
            // login
            .addCase(login.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state: UserState, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message;
            })
            // auth checking
            .addCase(checkAuth.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state: UserState, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message;
            })
            // checking auth for where it is needed
            .addCase(authRequired.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(authRequired.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(authRequired.rejected, (state: UserState, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message;
            })
            // on user logout
            .addCase(logout.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state: UserState, action: PayloadAction<string>) => {
                state.loading = false;
                state.data = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on change-password
            .addCase(RequestToResetPassword.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(RequestToResetPassword.fulfilled, (state: UserState, action: PayloadAction<string>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(RequestToResetPassword.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on fetching all categories to add a product
            .addCase(getAllCategories.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on adding a new product
            .addCase(addProduct.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(addProduct.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on updating a product
            .addCase(editProduct.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(editProduct.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(editProduct.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on updating a product as available from sold out
            .addCase(makeProductAvailable.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(makeProductAvailable.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(makeProductAvailable.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on updating a product as available from sold out
            .addCase( makeProductSoldOut.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase( makeProductSoldOut.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase( makeProductSoldOut.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on fetching all products
            .addCase(getProducts.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getProducts.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on fetching current user' products
            .addCase(getCurrentUserProducts.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(getCurrentUserProducts.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getCurrentUserProducts.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on fetching a specific product for detailed view
            .addCase(getSpecificProduct.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(getSpecificProduct.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getSpecificProduct.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on the time when a user is trying to follow one another user
            .addCase(followUser.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(followUser.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(followUser.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on the time when a user is trying to follow one another user
            .addCase(unFollowUser.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(unFollowUser.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(unFollowUser.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on the time when a user is trying to view seller profile
            .addCase(getSellerProfile.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(getSellerProfile.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(getSellerProfile.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // on the time when a user is updating data
            .addCase(updateProfile.pending, (state: UserState) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload };
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export default userSlice.reducer;