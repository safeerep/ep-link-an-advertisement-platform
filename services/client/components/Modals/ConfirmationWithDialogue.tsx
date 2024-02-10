"use client"
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';

const ConfimationModalWithDialogue = ({ isModalOpen, setModalOpen, notesHead, afterConfirmation, submitButtonName }:
    { isModalOpen: boolean, setModalOpen: any, notesHead: string, afterConfirmation: any, submitButtonName?: string}) => {

    const [note, setNote] = useState('')
    const [noteIsNull, setNoteIsNull] = useState(false)

    const handleSubmit = () => {
        if (note === '') {
            setNoteIsNull(true)
        }
        else {
            afterConfirmation(note)
        }
    }
    return (
        <>
            {isModalOpen && (
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500 bg-opacity-10">
                    <div className="relative w-auto my-6 shadow-lg mx-auto max-w-sm">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex p-5 rounded-t">
                                <button
                                    className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        setModalOpen(false);
                                    }}
                                >
                                    x
                                </button>
                            </div>
                            <div className="flex p-5 rounded-t justify-center">
                                <img src="brand.png" className='w-60 object-contain' alt="" />
                            </div>
                            <div className="flex justify-center"></div>
                            {/* body */}

                            <div className="relative px-12 flex-auto w-full my-4 gap-y-8">
                                <label className='font-semibold text-lg' htmlFor="notes">{notesHead}</label>
                                <input
                                    type="text"
                                    placeholder='write here'
                                    value={note}
                                    className=" w-full py-2 px-2 outline-none border-2 border-black"
                                    onChange={(e) => setNote(e.target.value)}
                                />
                                {
                                    noteIsNull &&
                                    <p className="font-bold text-sm p-5 text-red-600">
                                        write something
                                    </p>
                                }
                            </div>
                            {/*footer*/}

                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        setModalOpen(false);
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit()
                                    }}
                                    className="bg-slate-900 text-white active:bg-slate-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    {submitButtonName?submitButtonName:'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </>
    );
}

export default ConfimationModalWithDialogue;