"use client"
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth, getProducts } from '@/store/actions/userActions/userActions'
import { useRouter } from 'next/navigation'
import Navbar from '../../shared/userSide/Navbar'
import Banner from '../Banner'
import Posts from '../Posts'
import { Footer } from '@/components'

const Home = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth(router))
    dispatch(getProducts())
  }, [])

  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Banner />
        <Posts from={'home'} />
      </div>
      <Footer />
    </>
  )
}

export default Home