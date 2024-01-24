import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Posts from '../Posts'
import { authRequired, getSellerProfile } from '@/store/actions/userActions/userActions'

const ViewUserProfile = () => {
    const dispatch: any = useDispatch()
    const router = useRouter();
    const searchParams = useSearchParams();
    const sellerId: string | any = searchParams.get("id");
    useEffect(() => {
        dispatch(authRequired(router))
        dispatch(getSellerProfile(sellerId))
    }, [])

    const seller = useSelector((state: any) => state?.user?.data?.seller)
    const products = useSelector((state: any) => state?.user?.data?.products)

    return (
        <div className="flex justify-around gap-2 p-4 px-20">
            <div className="lg:w-1/4 md:w-1/2 w-full bg-blue-200 p-2 min-h-screen border-r-2 flex flex-col items-center">
                <img
                    src={seller?.profilePhoto? seller?.profilePhoto: "/profile.jpg"}
                    className="bg-slate-200 rounded-full items-start"
                    alt="Profile Picture"
                    style={{ width: '150px', height: '150px' }}
                />
                <span>{seller?.userName}</span>
                <span><strong>FOLLOWERS : </strong>{seller?.followers?.length}</span>
                <span><strong>FOLLOWING : </strong>{seller?.following?.length}</span>
                <span><strong>TOTAL PRODUCTS ADDED : </strong>{products?.length}</span>
            </div>
            <div className="lg:w-3/4 md:w-1/2 w-full bg-blue-100 p-4 pt-0 min-h-screen flex flex-col rounded-lg">
                <Posts from='view-user' />
            </div>
        </div>
    )
}

export default ViewUserProfile