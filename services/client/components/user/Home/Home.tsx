"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth, getProducts } from '@/store/actions/userActions/userActions'
import { useRouter } from 'next/navigation'
import Navbar from '../../shared/userSide/Navbar'
import Banner from '../Banner'
import Posts from '../Posts'

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
      <Banner />
      <Posts from={'home'} />
    </>
  )
}

export default Home