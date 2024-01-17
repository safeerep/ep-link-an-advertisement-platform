"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signupValidationSchema } from '@/models/validationSchemas'
import { signUpCredentials, signUpCredentialsWithOtp } from '@/types/user'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { register, sendOtp } from '@/store/actions/userActions/userActions'
import Modal from '../OtpModal/OtpModal'
import { GOOGLE_AUTH_WINDOW_URL } from '@/constants'

const Signup = () => {
    const dispatch: any = useDispatch()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [credentials, setCredentials] = useState<signUpCredentials | null>(null)
    const [error, setError] = useState()
    const [modalError, setModalError] = useState()

    const handleSubmit = (userCredentials: signUpCredentials) => {
        dispatch(sendOtp({ userCredentials, setError, setCredentials, setIsModalOpen}))
    }

    const handleOtpModalSubmit = (userData: signUpCredentials | null, otp: number) => {
        console.log('in fun');
        console.log(userData);
        console.log(otp);
        
        const userCredentials: any = { ...userData, otp };
        dispatch(register({ userCredentials, setIsModalOpen, router, setModalError}));
    };

    const handleGoogleAuth = () => {
        window.open(`${GOOGLE_AUTH_WINDOW_URL}`, "_self");
    }

    return (
        <>
            <div className="flex justify-around w-full min-h-screen items-center">
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
                    <main className="flex justify-center items-center">

                        <Formik
                            initialValues={{ userName: "", email: "", phone: "", password: "" }}
                            validationSchema={signupValidationSchema}
                            onSubmit={(userCredentials) => {
                                handleSubmit(userCredentials);
                            }} >
                            <Form className='flex flex-col items-center justify-center'>
                                {
                                    error &&
                                    <p className="text-red-500 text-md text-start">{error}</p>
                                }
                                <Field
                                    name="userName"
                                    placeholder='enter your user name'
                                    type='text'
                                    className='w-full border border-black p-3 m-1'
                                />
                                <ErrorMessage name="userName" component="div" className="text-red-500 text-xs text-start" />
                                <Field
                                    name="email"
                                    placeholder='enter your email here'
                                    type='email'
                                    className='w-full border border-black p-3 m-1'
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs text-start" />
                                <Field
                                    name="phone"
                                    placeholder='enter your phone number'
                                    type='number'
                                    id="phone"
                                    className='w-full border border-black p-3 m-1'
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs text-start" />
                                <Field
                                    name="password"
                                    placeholder='enter your password here'
                                    type="password"
                                    className='w-full border border-black p-3 m-1'
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs text-start" />
                                <p>already have an account?
                                    <Link className='text-blue-600' href='/sign-in'>Login</Link>
                                </p>
                                <button type="submit" className='bg-gray-950 m-5 rounded-md w-full py-2'>
                                    <span className='font-bold text-white'> Sign up </span>
                                </button>
                                <div className='w-full m-5 flex items-center relative'>
                                    <hr className='flex w-full border border-black' />
                                    <div className='font-bold absolute w-full flex justify-center'>
                                        <span className='bg-white px-2'>OR</span>
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    className='w-full border border-black p-3 m-1 flex justify-center items-center rounded-md'
                                    onClick={handleGoogleAuth}
                                >
                                    <Image src='/google-icon.png' width={20} height={20} alt='google icon' />
                                    <span className='font-semibold ps-2'>Sign up with Google</span>
                                </button>
                            </Form>
                        </Formik>
                    </main>
                </div>
            </div>
            <Modal
                modalError={modalError}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onModalSubmit={handleOtpModalSubmit}
                userData={credentials}
                resendOtp={handleSubmit}
            />
        </>
    )
}

export default Signup