"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authRequired, getCurrentUserProducts } from '@/store/actions/userActions/userActions'
import { useRouter } from 'next/navigation'
import ProfileSidebar from '../ProfileSidebar'
import Posts from '../Posts'

const Profile = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getCurrentUserProducts())
  }, [])
  return (
    <>
      <div className="flex lg:flex-row md:flex-col sm:flex-col w-full px-8 p-2">
        <ProfileSidebar />
        <div className="flex-grow">
          <h1 className='text-xl p-3'> Your Products </h1>
          <Posts from={'profile'} />
        </div>
      </div>
    </>
  )
}

export default Profile;