import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Posts from '../Posts'
import {
    authRequired,
    getSellerProfile,
    followUser,
    unFollowUser,
    chatWithSeller
} from '@/store/actions/userActions/userActions'
import Connections from '../Connections/Connections'

const ViewUserProfile = () => {
    const dispatch: any = useDispatch()
    const router = useRouter();
    const searchParams = useSearchParams();
    const sellerId: string | any = searchParams.get("id");
    const [showProducts, setShowProducts] = useState(true)
    useEffect(() => {
        dispatch(authRequired(router))
        dispatch(getSellerProfile(sellerId))
    }, [])

    const user = useSelector((state: any) => state?.user?.data?.userData)
    const seller = useSelector((state: any) => state?.user?.data?.seller)
    const products = useSelector((state: any) => state?.user?.data?.products)

    const handleFollow = async () => {
        console.log('clicked for follow');
        dispatch(followUser(seller?._id))
    }

    const handleUnfollow = async () => {
        console.log('clicked for unfollow');
        dispatch(unFollowUser(seller?._id))
    }

    const handleClickForChat = async () => {
        console.log('clicked for to chat with seller');
        dispatch(chatWithSeller({ userId: seller?._id, router }))
    }

    return (
        <div className="flex justify-around gap-2 p-4 px-20">
            <div className="lg:w-1/4 md:w-1/2 w-full bg-blue-50 p-2 min-h-screen border-r-2 flex flex-col items-center">
                <img
                    src={seller?.profilePhoto ? seller?.profilePhoto : "/profile.jpg"}
                    className="bg-slate-200 rounded-full items-start"
                    alt="Profile Picture"
                    style={{ width: '150px', height: '150px' }}
                />
                <span>{seller?.userName}</span>
                <button>
                    <strong>FOLLOWERS : {seller?.followers?.length}</strong>     
                </button>
                <button>
                    <strong>FOLLOWING : {seller?.following?.length}</strong>
                </button>
                <span>
                    <strong>TOTAL PRODUCTS ADDED : </strong>{products?.length}
                </span>
                {
                    showProducts? 
                    (<button
                    onClick={() => setShowProducts(!showProducts)}>
                    <span className='text-center text-blue-600 font-bold'>show connections</span>
                </button>):
                (<button
                    onClick={() => setShowProducts(!showProducts)}>
                    <span className='text-center text-blue-600 font-bold'>show products</span>
                </button>)
                }
                <div className="flex justify-around gap-1 my-2">
                    {
                        user?.following?.includes(seller?._id) ?
                            <button
                                onClick={handleUnfollow}
                                className='px-4 p-2 border-black border rounded-md' type="button">UNFOLLOW</button> :
                            <button
                                onClick={handleFollow}
                                className='px-4 p-2 bg-black border text-white rounded-md' type="button">FOLLOW</button>
                    }
                    <button
                        onClick={handleClickForChat}
                        className='px-2 border-black border rounded-md' type="button">MESSAGE</button>
                </div>
            </div>
            {
                showProducts &&
                <div className="lg:w-3/4 md:w-1/2 w-full bg-blue-50 p-4 pt-0 min-h-screen flex flex-col rounded-lg">
                    <Posts from='view-user' />
                </div>
            }
            {
                !showProducts &&
                <Connections />
            }
        </div>
    )
}

export default ViewUserProfile