"use client"
import Posts from '../Posts'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    authRequired, 
    getFavouriteProducts 
} from '@/store/actions/userActions/userActions'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppDispatch, RootState } from '@/store/store'
import Pagination from '@/components/shared/common/Pagination'

const Favourites = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const searchQuery = useSearchParams();
    const page: number = Number(searchQuery.get('page')) || 1;

    useEffect(() => {
        dispatch(authRequired(router))
        dispatch(getFavouriteProducts(page))
    }, [])

    const totalFavouriteProducts = useSelector((state: RootState) => state.user.data?.countOfFavouriteProducts)
    const totalPages = Math.ceil(totalFavouriteProducts/8);

    const handlePageChanges = (pageNumber: number) => {
        dispatch(getFavouriteProducts(pageNumber))
    }

    return (
        <>
            <h1 className='p-6 text-xl'>Your Favourites</h1>
            <Posts from={'favourites'}/>
            <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
        </>
    )
}

export default Favourites