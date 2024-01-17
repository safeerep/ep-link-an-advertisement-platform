"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { signInValidationSchema } from '@/models/validationSchemas'
import { login, checkAuth } from '@/store/actions/adminActions/adminActions'
import { signInCredentials } from '@/types/admin'

const AdminSignIn = () => {
    const dispatch: any = useDispatch();
    const [error, setError] = useState()
    const router = useRouter();

    useEffect(() => {
        dispatch(checkAuth(router))
    }, [])

    const handleSubmit = ( adminCredentials: signInCredentials) => {
        dispatch(login({ adminCredentials, router, setError}))
    }

    return (
        <>
            <div className="flex justify-around w-full min-h-screen items-center"
            >
                <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 shadow'
                >
                    <div style={{
                        backgroundSize: 'cover',
                    }} className='w-full h-20 flex justify-center items-center'>
                        <Image src="/brand.png"
                            alt='logo'
                            width={200} height={200}>
                        </Image>
                    </div>
                    <h1 className='flex justify-center text-xl m-2' >Welcome Admin</h1>
                    {error && <span className="flex justify-center text-red-500 text-md"> {error}</span> }
                    <main className="flex  justify-center items-center full">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={signInValidationSchema}
                            onSubmit={(adminCredentials) => {
                                handleSubmit(adminCredentials);
                            }} >
                            <Form className='flex flex-col items-center'>
                                <Field
                                    name="email"
                                    placeholder='enter your email here'
                                    type='email'
                                    className='border border-black p-3 m-1'
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs text-start" />
                                <Field
                                    name="password"
                                    placeholder='enter your password here'
                                    type="password"
                                    className='border border-black p-3 m-1'
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs text-start" />
                                <p>
                                    <Link className='text-blue-600' href='/admin/forgot-password'>forgot password?</Link>
                                </p>
                                <div className='w-full px-1 py-2'>
                                    <button type="submit" className='bg-gray-950 w-full py-2 rounded-sm'>
                                        <span className='font-bold text-white'> SignIn </span>
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminSignIn;