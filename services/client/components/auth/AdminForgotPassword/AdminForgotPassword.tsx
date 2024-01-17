"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { sendEmailToResetPassword, checkAuth } from '@/store/actions/adminActions/adminActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { emailValidationSchema } from '@/models/validationSchemas';

const AdminForgotPassword = () => {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const dispatch:any = useDispatch()
    const router = useRouter()
    const handleSubmit = (userEmail: string | any ) => {
        dispatch(sendEmailToResetPassword({ userEmail, setSuccess, setError}))
    }
    useEffect(() => {
        dispatch(checkAuth(router))
    }, [])

    return (
        <>
            <div className="flex justify-around w-full min-h-screen items-center">
                <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 shadow'>
                    <div style={{
                        backgroundSize: 'cover',
                    }} className='w-full h-20 flex justify-center items-center'>
                        <Image src="/brand.png"
                            alt='logo'
                            width={200} height={200}>
                        </Image>
                    </div>
                    <div className="w-full flex justify-center">

                    {success && <span className="text-green-600 text-md text-center w-full">{success}</span> }
                    {error && <span className="text-red-500 text-xs text-start">{error}</span> }
                    </div>
                    <main className="flex justify-center items-center full">
                        <Formik
                            initialValues={{ email: "" }}
                            validationSchema={emailValidationSchema}
                            onSubmit={(userEmail) => {
                                handleSubmit(userEmail);
                            }} >
                            <Form className='flex flex-col items-center'>
                                <Field
                                    name="email"
                                    placeholder='enter your email here'
                                    type='email'
                                    className='border border-black p-3 m-1'
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs text-start" />
                                <div className='w-full px-1 py-2'>
                                    <button type="submit" className='bg-black w-full py-2 rounded-md'>
                                        <span className='font-bold text-white'> Continue </span>
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

export default AdminForgotPassword;