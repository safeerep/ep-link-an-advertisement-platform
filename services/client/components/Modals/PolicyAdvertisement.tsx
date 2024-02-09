"use client"
import { createAnOrderForRazorpay, getPremiumPolicies } from '@/store/actions/userActions/userActions';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { GiChessQueen } from 'react-icons/gi'
import Script from 'next/script';
import { initializepayment } from '@/utils/razorpay';
import { AppDispatch, RootState } from '@/store/store';

declare global {
    interface Window {
        Razorpay: any; 
    }
}

const PolicyAdvertisementModal = ({ isModalOpen, setModalOpen }:
    { isModalOpen: boolean, setModalOpen: any }) => {

    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()

    const [selectedOption, setSelectedOption] = useState<string>('annual');

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        dispatch(getPremiumPolicies())
    }, [])

    const policies = useSelector((state: RootState) => state?.user?.data?.policies)

    const continueWithPlan = async () => {
        const selectedPlan = policies?.find((policy: any) => policy?.policyDuration === selectedOption)
        const subscriptionAmount: number = selectedPlan.subscriptionAmount;
        // creating an order for razorpay
        const response = await dispatch(createAnOrderForRazorpay(subscriptionAmount))
        initializepayment(response.payload, dispatch, selectedPlan.policyDuration, router)
    }

    return (
        <>
            {isModalOpen && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 shadow-lg mx-auto max-w-sm">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex p-5 rounded-t">
                                <button
                                    className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        setModalOpen(false);
                                        router.push('/')
                                    }}
                                >
                                    x
                                </button>
                            </div>
                            <div className="flex justify-center"></div>
                            {/* body */}
                            <span className='text-md font-bold w-full px-8'>Select any of the following plan to continue adding products to adveritse</span>
                            <div className="flex flex-col">
                                <div className="relative flex flex-col items-center rounded-md">
                                    <div className='w-full flex justify-start p-4 gap-2 items-center'>
                                        <GiChessQueen className='ms-4 text-xl text-yellow-600' />
                                        <span className='text-lg'>{policies && policies[0]?.policyDuration} Subscription Plan </span>
                                    </div>
                                    <span className='text-lg'>Subscription Amount: {policies && policies[0]?.subscriptionAmount} </span>

                                </div>
                                <div className="relative flex flex-col items-center rounded-md">
                                    <div className='w-full flex justify-start p-4 gap-2 items-center'>
                                        <GiChessQueen className='ms-4 text-xl text-yellow-600' />
                                        <span className='text-lg'>{policies && policies[1]?.policyDuration} Subscription Plan </span>
                                    </div>
                                    <span className='text-lg'>Subscription Amount: {policies && policies[1]?.subscriptionAmount} </span>
                                </div>
                            </div>
                            <div className="relative px-12 flex flex-col w-full my-4">
                                <label className='text-md'>
                                    <input
                                        type="radio"
                                        value="monthly"
                                        checked={selectedOption === 'monthly'}
                                        onChange={handleOptionChange}
                                    />
                                    Go with Monthly Subscription plan
                                </label>

                                <label className='text-md'> 
                                    <input
                                        type="radio"
                                        value="annual"
                                        checked={selectedOption === 'annual'}
                                        onChange={handleOptionChange}
                                    />
                                    Go with Annual Subscription plan
                                </label>
                            </div>
                            {/*footer*/}

                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        setModalOpen(false);
                                        router.push('/')
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        continueWithPlan()
                                    }}
                                    className="bg-slate-900 text-white active:bg-slate-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        </>
    );
}

export default PolicyAdvertisementModal;