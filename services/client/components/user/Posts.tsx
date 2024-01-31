import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { HiOutlineHeart } from 'react-icons/hi'
import { CgMoreO } from 'react-icons/cg'
import { makeProductAvailable, makeProductSoldOut } from '@/store/actions/userActions/userActions'

const Posts = ({ from }: { from: string }) => {
    const dispatch: any = useDispatch()
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const products = useSelector((state: any) => state?.user?.data?.products)
    console.log(`pro`, products);

    const handleAddToFavourite = (productId: string) => {
        console.log(`called for add to favourite. product id is ${productId}`);
    }

    const handleSoldout = (productId: string) => {
        setIsDropdownOpen(!isDropdownOpen)
        console.log(`called for making this product status as sold out. product id is ${productId}`)
        dispatch(makeProductSoldOut(productId))
    }

    const handleAvailable = (productId: string) => {
        setIsDropdownOpen(!isDropdownOpen)
        console.log(`called for making this product status as sold out. product id is ${productId}`)
        dispatch(makeProductAvailable(productId))
    }


    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 my-2 px-12">
                {products?.length > 0 &&
                    products.map((product: any) => {
                        return (
                            <div
                                key={product?._id}
                                className=" h-60 inline-block cursor-pointer border p-2 relative">
                                <div className="flex justify-center items-center">
                                    <img
                                        onClick={() => router.push(`/product-view?product=${product?._id}`)}
                                        className="h-32 w-full object-cover relative"
                                        src={product?.images[0] ? product?.images[0] : ''} alt="" 
                                    />
                                </div>
                                {from &&
                                    from !== 'profile' &&
                                    <button
                                        onClick={() => handleAddToFavourite(product?._id)}
                                        className="absolute top-0 right-0 p-2">
                                        <HiOutlineHeart />
                                    </button>}
                                {from &&
                                    from === 'profile' && (
                                        <>
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Corrected the onClick handler
                                                className="absolute top-0 right-0 p-2">
                                                <CgMoreO />
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute cursor-pointer top-6 right-2 p-1 z-10 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <button
                                                        onClick={() => router.push(`/edit-product?product=${product?._id}`) }
                                                        className="block px-4 py-2 text-sm text-black">
                                                        Edit product
                                                    </button>
                                                    {product?.soldOut?
                                                    <button
                                                        onClick={() => handleAvailable(product?._id)}
                                                        className="block px-4 py-2 text-sm text-red-600">
                                                        Make it available
                                                    </button>:
                                                    <button
                                                        onClick={() => handleSoldout(product?._id)}
                                                        className="block px-4 py-2 text-sm text-red-600">
                                                        Sold out
                                                    </button>}
                                                </div>
                                            )}
                                        </>
                                    )}

                                <div>
                                    <p className="mt-2 text-lg font-bold">
                                        &#x20B9; {product?.price}
                                    </p>
                                    <span className="text-base">{product?.productName}</span>
                                    <p className="text-sm">{product?.categoryName}</p>
                                </div>
                                <div className="flex justify-end text-sm">
                                    <span>{product?.createdAt}</span>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Posts