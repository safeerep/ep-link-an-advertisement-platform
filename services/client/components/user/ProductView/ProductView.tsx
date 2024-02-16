import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
    authRequired, 
    chatWithSeller, 
    followUser, 
    getSpecificProduct, 
    reportProduct, 
    unFollowUser 
} from '@/store/actions/userActions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { FiUserCheck } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import { FaRegFlag } from 'react-icons/fa'
import { ImPower } from 'react-icons/im'
import { AiOutlineEdit } from 'react-icons/ai'
import ConfimationModalWithDialogue from '@/components/Modals/ConfirmationWithDialogue'
import { Toaster } from 'react-hot-toast'
import { AppDispatch, RootState } from '@/store/store'

const ProductView = () => {
    const dispatch: AppDispatch = useDispatch()
    const router: any = useRouter()
    const [mainImage, setMainImage] = useState<number>(0)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const searchParams = useSearchParams();
    const productId: string | any = searchParams.get("product");

    const handleFollow = async () => {
        console.log('clicked for follow');
        dispatch(followUser(product?.userId))
    }

    const handleUnfollow = async () => {
        console.log('clicked for unfollow');
        dispatch(unFollowUser(product?.userId))
    }

    const handleClickForChat = async () => {
        console.log('clicked for to chat with seller');
        dispatch(chatWithSeller({userId: product?.userId, router}))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(authRequired(router));
                await dispatch(getSpecificProduct(productId));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [productId]);

    const product = useSelector((state: RootState) => state?.user?.data?.currentProduct)
    const seller = useSelector((state: RootState) => state?.user?.data?.seller)
    const sellerLoading = useSelector((state: RootState) => state?.user?.loading)
    const sellerStatus = useSelector((state: RootState) => state?.user?.data?.status)
    console.log(sellerStatus, 'ok status now');

    const reportOneProduct = (reason: string) => {
        const productId: string = product?._id;
        dispatch(reportProduct({ productId, reason: reason }))
        setModalOpen(false)
    }

    return (
        <>
            <div className="p-4 pt-6 bg-slate-50">
                <div className="w-full flex flex-col lg:flex-row">
                    <div className="lg:w-3/4 w-full">
                        <div className="relative h-96 p-4 border border-black flex justify-center object-center" >
                            <img src={product?.images ? product?.images[mainImage] : ''} alt="" />
                            <div 
                            onClick={() => setModalOpen(!modalOpen)}
                            className="absolute top-0 right-0 m-4 cursor-pointer">
                                < FaRegFlag/>
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-start px-2' >
                            {
                                product?.images && product?.images.map((image: any, index: number) => (
                                    <img
                                        // starting
                                        key={index}
                                        className="m-2 object-contain"
                                        src={image}
                                        onClick={() => {
                                            setMainImage(index)
                                        }}
                                        alt=""
                                        height={100}
                                        width={100}
                                    />
                                )
                                )}
                        </div>
                    </div>
                    <div className='bg-slate-50 lg:w-1/4 w-full'>
                        {product && Object?.keys(product?.inputFields).map(key => (
                            <div className='p-2' key={key}>
                                <h3 className='text-xl'>{key}</h3>
                                <p className='px-2'>{product?.inputFields[key]}</p>
                            </div>
                        ))}
                        {product && Object?.keys(product?.checkBoxes).map(key => (
                            <div className='p-2' key={key}>
                                <h3 className='text-xl'>{key}</h3>
                                <ul className='px-2'>
                                    {product?.checkBoxes[key].map((value: any, index: any) => (
                                        <li key={index}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {product && Object?.keys(product?.radioButtons).map(key => (
                            <div className='p-2' key={key}>
                                <h3 className='text-xl'>{key}</h3>
                                <p className='px-2'>{product?.radioButtons[key]}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 justify-center mx-20 gap-4 m-2">
                    <div className=" bg-white p-3 shadow">
                        <div className="flex justify-start gap-4">
                            <div className="bg-purple-400 text-teal-50 p-2 rounded-md flex justify-around items-center">
                                <ImPower /> <span className='ps-2'>FEATURED</span>
                            </div>
                            <div className="bg-slate-200 p-2 rounded-md text-slate-700 flex justify-around items-center">
                                <FiUserCheck /> VERIFIED SELLER
                            </div>
                        </div>
                        <>
                            <p>{product?.categoryName}</p>
                            <h1 className="text-3xl font-bold">{product?.productName}</h1>
                            <p className="text-2xl font-bold">&#x20B9; {product?.price} </p>
                            <div className=' flex items-center'> <GoLocation /> { product?.location}</div>
                        </>

                    </div>
                    <div className=" bg-white p-3 shadow ">
                        <p className="text-xl font-bold text-black pb-2">Seller details</p>
                        <>
                            <p>{seller?.userName}</p>
                            <div className='w-full flex justify-center items-center gap-2'>
                                {sellerLoading ?
                                    'loading' :
                                    sellerStatus && sellerStatus == "following" && (
                                        <>
                                            <button className='bg-white px-4  p-1 rounded-md'
                                                onClick={handleUnfollow}
                                            >
                                                <span
                                                    className='px-4 text-slate-950' >UNFOLLOW</span>
                                            </button>
                                            <button 
                                                className='bg-blue-50 border px-4 p-1 rounded-md'
                                                onClick={() => router.push(`/view-user?id=${seller?._id}`)}
                                            >
                                                <span
                                                    className='px-4 text-slate-950' >VIEW SELLER PROFILE</span>
                                            </button>
                                            <button
                                                onClick={handleClickForChat}
                                                className='bg-blue-50 border rounded-md p-1'>
                                                <span className='px-4 text-slate-950' >Message</span>
                                            </button>
                                        </>
                                    )}
                                {sellerStatus && sellerStatus == "not-following" && (
                                    <>
                                        <button
                                            onClick={handleFollow}
                                            className='bg-slate-950 px-4 p-1 rounded-md'>
                                            <span className='px-4 text-blue-50' >FOLLOW</span>
                                        </button>
                                        <button
                                            onClick={() => router.push(`/view-user?id=${seller?._id}`)}
                                            className='bg-blue-50 px-4 p-1 rounded-md'>
                                            <span className='px-4 text-slate-950' >VIEW SELLER PROFILE</span>
                                        </button>
                                        <button
                                            onClick={handleClickForChat}
                                            className='bg-blue-50 p-1 text-white'>
                                            <span className='px-4 text-slate-950' >Message</span>
                                        </button></>
                                )}
                                {sellerStatus && sellerStatus == "same_user" && (
                                    <>
                                        <button
                                            onClick={() => router.push(`/edit-product?product=${productId}`)}
                                            className='bg-slate-700 p-1 flex justify-between items-center border rounded-md text-white gap-x-2'>
                                            Edit Product
                                            <AiOutlineEdit />
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                        <>
                            {(!seller && !sellerStatus) ?
                                <p className="text-red-800">
                                    Sorry for the inconvenience! Seller details are not available.
                                </p> :
                                ''}
                        </>
                    </div>
                </div>
            </div>
            <Toaster />
            <ConfimationModalWithDialogue
                    afterConfirmation={reportOneProduct}
                    isModalOpen={modalOpen}
                    notesHead='Write a reason for reporting product'
                    setModalOpen={setModalOpen}
                />
        </>
    )
}

export default ProductView