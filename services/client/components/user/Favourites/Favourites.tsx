"use client"
import Posts from '../Posts'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authRequired } from '@/store/actions/userActions/userActions'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/store/store'

const Favourites = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(authRequired(router))
    }, [])
    return (
        <>
            <h1 className='p-6 text-xl'>Your Favourites</h1>
            <Posts from={'favourites'}/>
        </>
    )
}

export default Favourites