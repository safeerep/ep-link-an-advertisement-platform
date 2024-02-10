"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authRequired, getCurrentUserProducts } from '@/store/actions/userActions/userActions'
import { useRouter, useSearchParams } from 'next/navigation'
import Posts from '../Posts'
import { AppDispatch, RootState } from '@/store/store'
import Pagination from '@/components/shared/common/Pagination'

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const searchQuery =  useSearchParams();
  const page = Number(searchQuery.get("page")) || 1;

  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getCurrentUserProducts(page))
  }, [])

  const totalProducts = useSelector((state: RootState) => state.user?.data?.countOfCurrentUserProducts)
  const totalPages: number = Math.ceil(totalProducts/8);

  const handlePageChanges = (pageNumber: number) => {
    dispatch(getCurrentUserProducts(pageNumber))
  }

  return (
    <>
      <div className="flex-grow">
        <h1 className='text-xl p-3'> Your Products </h1>
        <Posts from={'profile'} />
        <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
      </div>
    </>
  )
}

export default Profile;