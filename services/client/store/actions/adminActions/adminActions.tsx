import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { USERS_SERVICE_BASE_URL, PRODUCT_SERVICE_BASE_URL, PAYMENT_SERVICE_BASE_URL } from "@/constants"
import { signInCredentials } from "@/types/admin"
import { Toaster, toast } from "react-hot-toast"

export const login = createAsyncThunk('/admin/login',
    async ({ adminCredentials, router, setError }: { adminCredentials: signInCredentials, router: any, setError: React.Dispatch<React.SetStateAction<any>> }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/admin/signin`, { ...adminCredentials }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response) {
                if (response.data.success) router.push('/admin')
                else setError(response?.data?.message)
            } else throw new Error(response?.data?.message)
        } catch (error: any) {
            // when response with status 401
            console.log(error.response.data);
            setError(error?.response?.data?.message)
            return error.response.data
        }
    })

export const checkAuth = createAsyncThunk('/admin/check-auth', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/admin/check-auth`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            console.log(response.data);

            if (response.data.success) router.push('/admin')
            return response.data;
        } else {
            console.log('in else');
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})


export const authRequired = createAsyncThunk('/admin/auth-required', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/admin/check-auth`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            console.log(response.data);
            if (!response.data.success) router.push('/admin/sign-in')

            return response.data;
        } else {
            console.log('in else');
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const logout = createAsyncThunk('/admin/logout', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/admin/logout`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            if (response.data.success) router.push('/admin/sign-in')
            return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})


export const getAllUsers = createAsyncThunk('/admin/get-all-users', async (page: number) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/admin/get-all-users?page=${page}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            console.log(response.data);
            if (response.data.success)
                return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const getReportedUsers = createAsyncThunk('/admin/get-reported-users', async (page: number) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/admin/get-reported-users?page=${page}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            console.log(response.data);
            if (response.data.success)
                return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const banAUser = createAsyncThunk('/admin/ban-user', async ({ currentUser, setModalOpen }: { currentUser: any, setModalOpen: any }) => {
    try {
        const response: any = await axios.patch(`${USERS_SERVICE_BASE_URL}/admin/change-user-status`, { ...currentUser }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            if (response.data?.success) {
                toast.success('successfully changed user status')
                setModalOpen(false)
            }
            else toast.error(response.data?.message)
            return response.data
        };
    } catch (error) {
        console.log(`somenthing went wrong`);

    }
})

export const sendEmailToResetPassword = createAsyncThunk('/admin/send-email',
    async ({ userEmail, setSuccess, setError }: { userEmail: any, setSuccess: any, setError: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/admin/send-reset-password-email`,
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

export const RequestToResetPassword = createAsyncThunk('/admin/reset-password',
    async ({ passwords, token, setSuccess, setError, router }:
        { passwords: any, token: string, setSuccess: any, setError: any, router: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/admin/change-password`,
                { ...passwords, token }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError(null)
                    setSuccess(response?.data?.message)
                    router.push('/admin')
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

export const getAllCategories = createAsyncThunk(`/admin/categories`,
    async (page: number) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/category/get-all-categories?page=${page}`, {
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

export const addCategory = createAsyncThunk('/admin/add-category', async ({ router, categoryDetails }: { router: any, categoryDetails: any }) => {
    try {
        const response = await axios.post(`${PRODUCT_SERVICE_BASE_URL}/category/add-category`,
            {
                ...categoryDetails
            }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response.data) {
            console.log(response.data);
            if (response.data.success) {
                router.push('/admin/categories')
                toast.success('successfully added a new category')
                return response.data;
            }
            else toast.error(response?.data?.message)
        } else throw new Error('something went wrong')
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
    }
})

export const changeCategoryStatus = createAsyncThunk('/admin/change-category-status',
    async ({ categoryId, status, setModalState }: { categoryId: string | undefined, status: boolean | null, setModalState: any }) => {
        try {
            const response = await axios.patch(`${PRODUCT_SERVICE_BASE_URL}/category/change-category-status`,
                { categoryId, status }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response.data) {
                if (response.data.success) {
                    toast.success('successfully updated category status')
                    setModalState(false)
                    return response.data;
                }
                else toast.error(response.data.message ? response.data.message : "something went wrong")
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "something went wrong")
            return error.response.data
        }
    }
)

export const getCategoryDetails = createAsyncThunk('/admin/get-current-category',
    async (categoryId: string) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/category/get-details/${categoryId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response.data) {
                console.log(response?.data);
                return response.data;
            }
        } catch (error: any) {
            console.log(`something went wrong during fetching current category details ${error}`);
            return error?.response?.data?.message;
        }
    }
)

export const updateCategoryDetails = createAsyncThunk('/admin/change-category-details', async ({ router, categoryId, categoryDetails }: { router: any, categoryId: string, categoryDetails: any }) => {
    try {
        const response = await axios.put(`${PRODUCT_SERVICE_BASE_URL}/category/update-category`,
            {
                categoryId,
                ...categoryDetails
            }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response.data) {
            console.log(response.data);
            if (response.data.success) {
                router.push('/admin/categories')
                toast.success('successfully updated category details')
                return response.data;
            }
            else toast.error(response?.data?.message)
        } else throw new Error('something went wrong')
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
    }
})

export const getProducts = createAsyncThunk(`/admin/get-products`,
    async (page: number) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/admin/get-all-products?page=${page}`, {
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

export const getReportedProducts = createAsyncThunk(`/admin/get-reported-products`,
    async ( page: number) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/admin/get-reported-products?page=${page}`, {
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
            console.log(`an error happened during fetching all reported products ${error}`);
            return error?.response?.data;
        }
    }
)

export const changeProductStatus = createAsyncThunk(`/admin/change-product-status`,
    async ({ productId, status }: { productId: string, status: boolean }) => {
        try {
            const response = await axios.patch(`${PRODUCT_SERVICE_BASE_URL}/change-product-status`, { productId, status }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    toast.success(response.data?.message)
                    return response.data;
                }
                toast.success(response.data?.message)
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during changing the status of a product ${error}`);
            toast.success(error?.response.data?.message)
            return error?.response?.data;
        }
    }
)


export const getPremiumPolicies = createAsyncThunk(`/admin/premium-poicies`,
    async () => {
        try {
            const response = await axios.get(`${PAYMENT_SERVICE_BASE_URL}/premium/admin/get-all-plans`, {
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

export const updatePremiumPolicy = createAsyncThunk(`/admin/update-premium-poicies`,
    async ({ policyDuration, subscriptionAmount }: { policyDuration: string, subscriptionAmount: number }) => {
        try {
            const response = await axios.put(`${PAYMENT_SERVICE_BASE_URL}/premium/update`, { policyDuration, subscriptionAmount }, {
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
            console.log(`an error happened during updating a premium plan ${error}`);
            return error?.response?.data;
        }
    }
)

export const getSubscribersList = createAsyncThunk(`/admin/subscribers-list`,
    async ( page: number) => {
        try {
            const response = await axios.get(`${USERS_SERVICE_BASE_URL}/admin/subscribers-list?page=${page}`, {
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
            console.log(`an error happened during fetching subscribers list ${error}`);
            return error?.response?.data;
        }
    }
)