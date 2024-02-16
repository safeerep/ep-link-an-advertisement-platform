import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { CgMoreO } from 'react-icons/cg'
import { GoLocation } from 'react-icons/go'
import {
    addToFavourites,
    getAllFavouriteProducts,
    getFavouriteProducts,
    makeProductAvailable,
    makeProductSoldOut,
    removeFromFavourites
} from '@/store/actions/userActions/userActions'
import { AppDispatch, RootState } from '@/store/store'
import { Product } from '@/types/product'

const Posts = ({ from }: { from: string }) => {
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(getAllFavouriteProducts())
    }, [])

    const page = useSelector((state: RootState) => state?.user?.data?.currentPage) ?? 1;
    const products = useSelector((state: RootState) => state?.user?.data?.products)
    const favourites = useSelector((state: RootState) => state?.user?.data?.favourites)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(Array(products?.length).fill(false));

    useEffect(() => {
        setIsDropdownOpen(Array(products?.length).fill(false))
    }, [products?.length])

    const handleAddToFavourite = (productId: string) => {
        console.log(`called for add to favourite. product id is ${productId}`);
        dispatch(addToFavourites(productId))
    }

    const handleRemoveFromFavourite = (productId: string) => {
        console.log(`called for remove from favourite. product id is ${productId}`);
        dispatch(removeFromFavourites(productId))
        if (from == 'favourites') {
            dispatch(getFavouriteProducts(page))
        }
    }

    const handleSoldout = (productId: string) => {
        setIsDropdownOpen(Array(products?.length).fill(false))
        console.log(`called for making this product status as sold out. product id is ${productId}`)
        dispatch(makeProductSoldOut(productId))
    }

    const handleAvailable = (productId: string) => {
        setIsDropdownOpen(Array(products?.length).fill(false))
        console.log(`called for making this product status as sold out. product id is ${productId}`)
        dispatch(makeProductAvailable(productId))
    }

    const handleToggleDropdown = (index: number) => {
        const updatedDropdownStates = isDropdownOpen.map((state: boolean, i: number) => i !== index ? false : !state)
        setIsDropdownOpen(updatedDropdownStates);
    };

    return (
        <>
            {(products && products?.length > 0) ?
                (<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 my-2 px-12">
                    {
                        products.map((product: Product, index: number) => {
                            return (
                                <div key={product?._id} className=" m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#ceedf0] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all">
                                    <div className="">
                                        <img
                                            onClick={() => router.push(`/product-view?product=${product?._id}`)}
                                            src={product?.images[0] ? product?.images[0] : ''}
                                            alt=""
                                            className=" object-contain w-44 aspect-square text-[#3eb7b9] group-hover:bg-gray-800 text-5xl p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto"
                                        />
                                        {(from &&
                                            from !== 'profile') &&
                                            favourites && favourites.length > 0 && favourites?.includes(product?._id) ?
                                            <button
                                                onClick={() => handleRemoveFromFavourite(product?._id)}
                                                className="absolute top-0 right-0 p-2">
                                                <HiHeart className='text-red-600' />
                                            </button> :
                                            (from &&
                                                from !== 'profile') &&
                                            <button
                                                onClick={() => handleAddToFavourite(product?._id)}
                                                className="absolute top-0 right-0 p-2">
                                                <HiOutlineHeart />
                                            </button>
                                        }
                                        {from &&
                                            from === 'profile' && (
                                                <>
                                                    <button
                                                        onClick={() => handleToggleDropdown(index)}
                                                        className="absolute top-0 right-0 p-2">
                                                        <CgMoreO />
                                                    </button>
                                                    {isDropdownOpen[index] && (
                                                        <div className="absolute cursor-pointer top-6 right-2 p-1 z-10 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <button
                                                                onClick={() => router.push(`/edit-product?product=${product?._id}`)}
                                                                className="block px-4 py-2 text-sm text-black">
                                                                Edit product
                                                            </button>
                                                            {product?.soldOut ?
                                                                <button
                                                                    onClick={() => handleAvailable(product?._id)}
                                                                    className="block px-4 py-2 text-sm text-red-600">
                                                                    Make it available
                                                                </button> :
                                                                <button
                                                                    onClick={() => handleSoldout(product?._id)}
                                                                    className="block px-4 py-2 text-sm text-red-600">
                                                                    Sold out
                                                                </button>}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                    </div>

                                    {/* Product Details */}
                                    <div>
                                        <p className="font-semibold text-lg text-gray-800 group-hover:text-black">
                                            {product?.productName}
                                        </p>
                                        <p className="font-semibold text-gray-800 text-xs">
                                            {product?.categoryName}
                                        </p>
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <p className=" text-gray-800 font-semibold group-hover:text-black">
                                                &#x20B9; {product?.price}
                                            </p>
                                            <>
                                                <GoLocation /> { product?.location}
                                            </>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div >
                ) :
                (
                    <div className="w-full flex justify-center">
                        <span className='text-red-600 text-center'>
                            Sorry for the inconvenience, there are no products to show
                        </span>
                    </div>
                )
            }
        </>
    )
}

export default Posts