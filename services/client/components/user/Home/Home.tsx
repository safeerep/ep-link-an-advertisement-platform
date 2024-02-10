"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, getProducts } from '@/store/actions/userActions/userActions'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '../../shared/userSide/Navbar'
import Banner from '../Banner'
import Posts from '../Posts'
import { Footer } from '@/components'
import { Toaster } from 'react-hot-toast'
import { AppDispatch, RootState } from '@/store/store'
import Pagination from '@/components/shared/common/Pagination'

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchQuery: string = searchParams.get("search") || '';
  const page: number = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(checkAuth(router))
    dispatch(getProducts({searchQuery, page}))
  }, [ searchQuery, page])

  const totalProducts = useSelector((state: RootState) => state.user.data?.countOfProducts)
  const totalPages = Math.ceil(totalProducts/8);

  const handlePageChanges = (pageNumber: number) => {
    dispatch(getProducts({page: pageNumber}))
  }

  return (
    <>
      <div className='mt-[-8px]'>
        <Navbar />
      </div>
      <div className='min-h-screen'>
        <Banner />
        <Posts from={'home'} />
        <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default Home