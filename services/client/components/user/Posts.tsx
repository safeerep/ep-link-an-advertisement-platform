import React from 'react'
import { useSelector } from 'react-redux'
import { PRODUCT_IMAGES_URL } from '@/constants'
import { useRouter } from 'next/navigation'

const Posts = () => {
    const router = useRouter();
    const products = useSelector((state: any) => state?.user?.data?.products)
    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 my-2 px-12">
                {products?.length > 0 &&
                    products.map((product: any) => {
                        return (
                            <div
                                onClick={() => router.push(`/product-view?product=${product?._id}`)}
                                key={product?._id}
                                className=" h-60 inline-block cursor-pointer border p-2">
                                <div className="flex justify-center items-center">
                                    <img
                                        className="h-32 w-full object-center"
                                        src={product?.images ? `${PRODUCT_IMAGES_URL}/${product?.images[0]}` : ''}
                                        alt=""
                                    />
                                </div>
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