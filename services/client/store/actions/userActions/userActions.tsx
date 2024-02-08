import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signUpCredentialsWithOtp, signInCredentials } from "@/types/user";
import { USERS_SERVICE_BASE_URL, PRODUCT_SERVICE_BASE_URL, CHAT_SERVICE_BASE_URL, PAYMENT_SERVICE_BASE_URL } from '../../../constants/index'
import toast from "react-hot-toast";


export const register = createAsyncThunk('/user/register', async ({ userCredentials, setIsModalOpen, router, setModalError }:
    { userCredentials: signUpCredentialsWithOtp, setIsModalOpen: any, router: any, setModalError: any }) => {
    try {
        const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/signup`, { ...userCredentials }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response) {
            console.log('hey ');
            console.log(response);

            if (response?.data?.success) {
                // close the modal
                setModalError(response?.data?.message)
                setIsModalOpen(false);
                router.push('/')
            }
            else {
                // otp is not matching
                setModalError(response?.data?.message)
            }
            return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        // when response with status 401
        console.log(error?.response?.data?.message);
        setModalError(error?.response?.data?.message)
        return {
            message: 'otp is not matching'
        }
    }
})


export const sendOtp = createAsyncThunk('/user/send-otp-for-signup',
    async ({ userCredentials, setError, setCredentials, setIsModalOpen }: { userCredentials: any, setError: any, setCredentials: any, setIsModalOpen: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/send-otp-for-signup`, { ...userCredentials }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError()
                    setCredentials(userCredentials)
                    setIsModalOpen(true);
                }
                else {
                    setError(response?.data?.message)
                }
                console.log(response?.data);
                return response?.data;
            } else {
                throw new Error(response?.data?.message)
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    })


export const login = createAsyncThunk('/user/login',
    async ({ userCredentials, router, setError }: { userCredentials: signInCredentials, router: any, setError: React.Dispatch<React.SetStateAction<any>> }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/signin`, { ...userCredentials }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response) {
                if (response.data.success) router.push('/')
                else if (!response.data.success) setError(response?.data?.message)
            } else throw new Error(response?.data?.message)
        } catch (error: any) {
            // when response with status 401
            console.log(error.response.data);
            setError(error?.response?.data?.message)
            return error.response.data
        }
    })

export const checkAuth = createAsyncThunk('/user/check-auth', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/user/check-auth`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            console.log('check auth response');
            console.log(response.data.userData);
            console.log(response.data.success);
            if (response.data.success) router.push('/')
            return response.data;
        } else {
            console.log('in else');
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const authRequired = createAsyncThunk('/user/auth-required', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/user/check-auth`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            if (!response.data.success) router.push('/sign-up')
            else return response.data;
        } else {
            console.log('in else');
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})


export const logout = createAsyncThunk('/user/logout', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/user/logout`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            if (response.data.success) router.push('/')
            return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const sendEmailToResetPassword = createAsyncThunk('/user/send-email',
    async ({ userEmail, setSuccess, setError }: { userEmail: any, setSuccess: any, setError: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/send-reset-password-email`,
                { ...userEmail }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError(null)
                    setSuccess(response?.data?.message)
                }
                else {
                    setSuccess(null)
                    setError(response?.data?.message)
                };
            }
            else throw new Error('something went wrong')
        } catch (error: any) {
            console.log('something went wrong', error);
        }
    }
)


export const RequestToResetPassword = createAsyncThunk('/user/reset-password',
    async ({ passwords, token, setSuccess, setError, router }: { passwords: any, token: string, setSuccess: any, setError: any, router: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/change-password`,
                { ...passwords, token }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError(null)
                    setSuccess(response?.data?.message)
                    router.push('/')
                    return response?.data;
                }
                else {
                    setSuccess(null)
                    setError(response?.data?.message)
                };
            }
            else throw new Error('something went wrong')
        } catch (error: any) {
            console.log('something went wrong', error);
        }
    }
)

export const updateProfile = createAsyncThunk(`/user/update-profile`,
    async ({ values, setModalState }: { values: { userName: string | any, phone: number | any, image: any }, setModalState: any }) => {
        const { userName, phone, image } = values;
        try {
            console.log('from action');
            console.log(userName, phone, image);

            const userData = new FormData()
            if (image) {
                userData.append('profilePhoto', image)
            }
            if (phone) {
                userData.append('phone', phone)
            }
            userData.append('userName', userName)

            const response = await axios.put(`${USERS_SERVICE_BASE_URL}/user/update-profile`, userData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    setModalState(false)
                    toast.success(response.data?.message)
                    return response.data;
                }
                else {
                    toast.error(response?.data?.message)
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during updating user profile info ${error}`);
            toast.error(error?.response?.data?.message)
            return error?.response?.data;
        }
    }
)

export const getSellerProfile = createAsyncThunk('/user/get-seller-profile',
    async (sellerId: string) => {
        try {
            const response = await axios.get(`${USERS_SERVICE_BASE_URL}/user/get-seller-profile/${sellerId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                console.log(response.data);
                return response.data;
            } else {
                toast.error(response?.data?.message)
                throw new Error('something went wrong')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            console.log(`an error happened during fetching the seller profile details ${error}`);
            return error.response.data;
        }
    }
)


export const getFollowersList = createAsyncThunk('/user/get-followers-list',
    async (userId: string) => {
        try {
            const response = await axios.get(`${USERS_SERVICE_BASE_URL}/user/get-followers-list/${userId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                console.log(response.data);
                return response.data;
            } else {
                toast.error(response?.data?.message)
                throw new Error('something went wrong')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            console.log(`an error happened during fetching the followers list ${error}`);
            return error.response.data;
        }
    }
)

export const getFollowingList = createAsyncThunk('/user/get-following-list',
    async (userId: string) => {
        try {
            const response = await axios.get(`${USERS_SERVICE_BASE_URL}/user/get-following-list/${userId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                console.log(response.data);
                return response.data;
            } else {
                toast.error(response?.data?.message)
                throw new Error('something went wrong')
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            console.log(`an error happened during fetching the following list ${error}`);
            return error.response.data;
        }
    }
)

export const getAllCategories = createAsyncThunk(`/user/categories`,
    async () => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/category/get-all-categories-user`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching all categories ${error}`);
            return error?.response?.data;
        }
    }
)

export const checkCurrentUserAddedProducts = createAsyncThunk('/user/check-the-product-count',
    async () => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/check-current-user-product-count`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.addedProductCount > 3) {
                return response?.data?.addedProductCount;
            }
            else {
                return false;
            }
        } catch (error: any) {
            console.log(`something went wrong during checking the count of current user added products ${error}`);
            return false;
        }
    }
)

export const addProduct = createAsyncThunk(`/user/add-product`, async ({ productDetails, router }: { productDetails: any, router: any }) => {
    try {
        const formData = new FormData();

        // Append standard fields
        formData.append('categoryName', productDetails.categoryName);
        formData.append('productName', productDetails.productName);
        formData.append('description', productDetails.description);
        formData.append('price', productDetails.price);

        // Append images
        productDetails.images.forEach((imageFile: any) => {
            formData.append('images', imageFile);
        });

        // Serialize complex fields
        formData.append('inputFields', JSON.stringify(productDetails.inputFields));
        formData.append('checkBoxes', JSON.stringify(productDetails.checkBoxes));
        formData.append('radioButtons', JSON.stringify(productDetails.radioButtons));


        const response = await axios.post(`${PRODUCT_SERVICE_BASE_URL}/add-product`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        if (response?.data) {
            console.log(response.data);
            if (response?.data?.success) {
                toast.success('Successfully added the product');
                router.push('/');
                return response.data;
            } else {
                toast.error(response?.data?.message);
            }
            return response.data;
        }
    } catch (error: any) {
        console.log(`An error happened during fetching all categories ${error}`);
        return error?.response?.data;
    }
});


export const editProduct = createAsyncThunk('/user/edit-product', async ({ productId, productDetails, router }: { productId: string, productDetails: any, router: any }) => {
    try {
        const formData = new FormData();

        // Append standard fields
        formData.append('productId', productId);
        formData.append('categoryName', productDetails.categoryName);
        formData.append('productName', productDetails.productName);
        formData.append('description', productDetails.description);
        formData.append('price', productDetails.price);

        // appending images
        Object.keys(productDetails?.images).forEach((key) => {
            const value = productDetails?.images[key];
            if (value !== null) {
                formData.append(`${key}`, value);
            }
        })
        // serializing complex fields
        formData.append('inputFields', JSON.stringify(productDetails.inputFields));
        formData.append('checkBoxes', JSON.stringify(productDetails.checkBoxes));
        formData.append('radioButtons', JSON.stringify(productDetails.radioButtons))

        const response = await axios.put(`${PRODUCT_SERVICE_BASE_URL}/update-product`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        if (response?.data) {
            console.log(response.data);
            if (response?.data?.success) {
                toast.success('Successfully updated product details');
                router.push('/');
                return response.data;
            } else {
                toast.error(response?.data?.message);
            }
            return response.data;
        }
    } catch (error: any) {
        console.log(`An error happened during fetching all categories ${error}`);
        return error?.response?.data;
    }
});

export const getProducts = createAsyncThunk(`/user/get-products`,
    async () => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/get-all-products`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching all products ${error}`);
            return error?.response?.data;
        }
    }
)


export const getCurrentUserProducts = createAsyncThunk(`/user/user-products`,
    async () => {
        console.log('called');

        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/current-user-products`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            } else {
                console.log(`no response`);
                return;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching current user' products ${error}`);
            return error?.response?.data;
        }
    }
)

export const getSpecificProduct = createAsyncThunk(`/user/get-specific-product`,
    async (productId: string) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/get-specific-product/${productId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            } else {
                console.log(`no response`);
                return;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching current user' products ${error}`);
            return error?.response?.data;
        }
    }
)

export const followUser = createAsyncThunk(`/user/follow-user`,
    async (userId: string) => {
        try {
            const response = await axios.patch(`${USERS_SERVICE_BASE_URL}/user/follow/${userId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to follow ${error}`);
            return error?.response?.data;
        }
    }
)

export const unFollowUser = createAsyncThunk(`/user/unfollow-user`,
    async (userId: string) => {
        try {
            const response = await axios.patch(`${USERS_SERVICE_BASE_URL}/user/unfollow/${userId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to unfollow ${error}`);
            return error?.response?.data;
        }
    }
)

export const reportSeller = createAsyncThunk(`/user/report-user`,
    async ({ sellerId, reason }: { sellerId: string, reason: string }) => {
        try {
            const response = await axios.post(`${USERS_SERVICE_BASE_URL}/user/report-seller`, { sellerId, reason }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    toast.success(response.data?.message)
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to report a seller ${error}`);
            return error?.response?.data;
        }
    }
)

export const reportProduct = createAsyncThunk('/user/report-product',
    async ({ productId, reason }: { productId: string, reason: string }) => {
        try {
            const response = await axios.post(`${PRODUCT_SERVICE_BASE_URL}/report-one-product`, { productId, reason }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    toast.success(response.data?.message)
                    return response.data;
                }
                toast.error(response.data?.message)
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to report a product ${error}`);
            toast.error(error?.response?.data?.message)
            return error?.response?.data;
        }
    }
)

export const chatWithSeller = createAsyncThunk('/user/chat-with-seller',
    async ({ userId, router }: { userId: string, router: any }) => {
        try {
            const response = await axios.patch(`${CHAT_SERVICE_BASE_URL}/room/get-chat-room/with/${userId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log('-------------------------');
                console.log(response.data);
                console.log('-------------------------');
                if (response?.data?.success) {
                    router.push(`/chat`)
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to chat with seller ${error}`);
            return error?.response?.data;
        }
    }
)

export const changeRoom = createAsyncThunk('/user/room-change',
    async ({ userId, currentRoomId }: { userId: string, currentRoomId: string }) => {
        try {
            const response = await axios.patch(`${CHAT_SERVICE_BASE_URL}/room/get-chat-room/with/${userId}`, { currentRoomId }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log('-------------------------');
                console.log(response.data);
                console.log('-------------------------');
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to change the room ${error}`);
            return error?.response?.data;
        }
    }
)

export const getCurrentUserChatRooms = createAsyncThunk('/user/chat-rooms',
    async () => {
        try {
            const response = await axios.get(`${CHAT_SERVICE_BASE_URL}/room/get-current-user-chats`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log('-------------------------');
                console.log(response.data);
                console.log('-------------------------');
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to fetch current user chatrooms ${error}`);
            return error?.response?.data;
        }
    }
)

export const saveNewMessage = createAsyncThunk('/user/new-message',
    async (messageDetails: any) => {
        console.log('called to save new message');

        try {
            const response = await axios.post(`${CHAT_SERVICE_BASE_URL}/save-message`, messageDetails, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log('-------------------------');
                console.log('new message saved');
                console.log(response.data);
                console.log('-------------------------');
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during saving a new message ${error}`);
            return error?.response?.data;
        }
    }
)

export const makeProductAvailable = createAsyncThunk('/user/make-product-available',
    async (productId: string) => {
        try {
            const response = await axios.patch(`${PRODUCT_SERVICE_BASE_URL}/available/${productId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                toast.success(response?.data?.message)
            }
            else {
                toast.error(response?.data?.message)
            }
            return response.data;
        } catch (error: any) {
            console.log(`an error happened during making product available ${error}`);
            toast.error(error?.response?.data?.message)
            return error?.response?.data;
        }
    }
)
export const makeProductSoldOut = createAsyncThunk('/user/make-product-soldout',
    async (productId: string) => {
        try {
            const response = await axios.patch(`${PRODUCT_SERVICE_BASE_URL}/soldout/${productId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                toast.success(response?.data?.message)
            }
            else {
                toast.error(response?.data?.message)
            }
            return response.data;
        } catch (error: any) {
            console.log(`an error happened during making product sold out ${error}`);
            toast.error(error?.response?.data?.message)
            return error?.response?.data;
        }
    }
)

export const blockSeller = createAsyncThunk('/user/block-seller',
    async (sellerId: string) => {
        try {
            const response = await axios.patch(`${CHAT_SERVICE_BASE_URL}/user/block/${sellerId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response?.data);
                if (response?.data?.success) toast.success(response?.data?.message)
                else toast.error(response?.data?.message)
                return response.data;
            }
        } catch (error: any) {
            console.log(`something went wrong during blocking seller`);
            toast.error(error?.response?.data?.message)
            return error?.response?.data;
        }
    }
)

export const unBlockSeller = createAsyncThunk('/user/un-block-seller',
    async (sellerId: string) => {
        try {
            const response = await axios.patch(`${CHAT_SERVICE_BASE_URL}/user/un-block/${sellerId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response?.data);
                if (response?.data?.success) toast.success(response?.data?.message)
                else toast.error(response?.data?.message)
                return response.data;
            }
        } catch (error: any) {
            console.log(`something went wrong during unblocking seller`);
            toast.error(error?.response?.data?.message)
            return error?.response?.data;
        }
    }
)

export const getPremiumPolicies = createAsyncThunk('/user/get-premium-poicies',
    async () => {
        try {
            const response = await axios.get(`${PAYMENT_SERVICE_BASE_URL}/premium/get-all-plans`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching all premium plans ${error}`);
            return error?.response?.data;
        }
    }
)

export const updateUserProfileToPremium = createAsyncThunk('/user/update-to-premium',
    async (policyDuration: string) => {
        try {
            const response = await axios.patch(`${USERS_SERVICE_BASE_URL}/user/update-to-premium`,
                { subscriptionPolicy: policyDuration }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })

            if (response?.data?.success) {
                toast.success('subscription is successfull')
            }
            else toast.error(response?.data?.message)
        } catch (error: any) {
            console.log(`something went wrong during updating user profile to premium ${error}`);
            toast.error(error?.response?.data?.message)
            return false;
        }
    }
)

export const createAnOrderForRazorpay = createAsyncThunk('/user/create-an-order',

    async (subscriptionAmount: number) => {
        console.log(subscriptionAmount);
        try {
            const response = await axios.post(`${PAYMENT_SERVICE_BASE_URL}/create-razorpay-order`, { subscriptionAmount }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                console.log(response.data.order);

                return response.data.order;
            }
            else return false;
        } catch (error) {
            console.log(`something went wrong during creating an offer for to proceed with razorpay ${error}`);
            return false;
        }
    }
)

export const verifyRazorpayPayment =
    async (razorpayResponse: any) => {
        try {
            const response = await axios.post(`${PAYMENT_SERVICE_BASE_URL}/verify-razorpay-payment`, razorpayResponse, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data?.success) {
                return true;
            }
            else return false;
        } catch (error: any) {
            console.log(`something went wrong during verifying payment ${error}`);
            toast.error(error?.response?.data?.message)
            return false;
        }
    }

export const sendMediaFilesAsMessage = async (filesToSend: any) => {
    try {
        const formData = new FormData();

        // appending fields
        formData.append('senderId', filesToSend.senderId);
        formData.append('typeOfMessage', filesToSend.typeOfMessage);
        formData.append('chatRoomId', filesToSend.chatRoomId);
        filesToSend.files.forEach((file: any) => {
            formData.append('files', file);
        });
        const response = await axios.post(`${CHAT_SERVICE_BASE_URL}/save-media-files`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        })
        if (response?.data?.success) {
            return response?.data?.files;
        }
        else toast.error(response?.data?.message)
    } catch (error) {
        console.log(`something went wrong during sending files as messages ${error}`);
        return false;
    }
}
