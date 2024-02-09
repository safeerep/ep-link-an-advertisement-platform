"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth, getProducts } from '@/store/actions/userActions/userActions'
import { useRouter } from 'next/navigation'
import Navbar from '../../shared/userSide/Navbar'
import Banner from '../Banner'
import Posts from '../Posts'
import { Footer } from '@/components'
import { Toaster } from 'react-hot-toast'
import { AppDispatch } from '@/store/store'

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth(router))
    dispatch(getProducts())
  }, [])

  return (
    <>
    <div className='mt-[-8px]'>
      <Navbar />
    </div>
      <div className='min-h-screen'>
        <Banner />
        <Posts from={'home'} />
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default Home