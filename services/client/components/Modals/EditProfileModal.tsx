import { updateProfile } from '@/store/actions/userActions/userActions';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import updateProfileSchema from '@/models/validationSchemas/user/updateProfileSchema';
import { AppDispatch, RootState } from '@/store/store';

const EditProfileModal = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: any }) => {
    const dispatch: AppDispatch = useDispatch()
    const user: any = useSelector((state: RootState) => state.user.data)
    const [image, setImage] = useState();

    const handleUpdateProfile = async (values: any) => {
        console.log('clicked for update');
        console.log(values);
        values.image = image;
        dispatch(updateProfile({ values, setModalState: setIsModalOpen}))
    }
    return (
        <>
            {isModalOpen && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-screen my-6 shadow-lg mx-auto max-w-lg">
                        <div className="border-0 p-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex p-5 rounded-t">
                                <button
                                    className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                    }}
                                >
                                    x
                                </button>
                            </div>
                            <Formik
                                initialValues={{
                                    userName: user?.userData?.userName,
                                    phone: user?.userData?.phone,
                                }}
                                validationSchema={updateProfileSchema}
                                onSubmit={(userCredentials) => {
                                    handleUpdateProfile(userCredentials);
                                }}>
                                <Form className="space-y-6">
                                        <div className="w-full flex justify-center">
                                            <div className="w-40 rounded-full object-fill overflow-hidden h-40">
                                                <img
                                                    className="h-40 w-40 object-cover"
                                                    src={
                                                        image
                                                            ? URL.createObjectURL(image)
                                                            : `${user?.userData?.profilePhoto}`
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                    <div className="w-full flex justify-center">
                                        <label
                                            htmlFor="profile-photo-input"
                                            className="bg-slate-100 border text-black py-2 px-4 rounded cursor-pointer"
                                        >
                                            <span>Edit profile photo</span>
                                        </label>
                                        <input
                                        onChange={(e: any) => {
                                            setImage(e.target.files[0])
                                        }}
                                            type="file"
                                            id="profile-photo-input"
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            User name
                                        </label>
                                        <Field
                                            type="text"
                                            name="userName"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="your username"
                                        />
                                    </div>
                                    <ErrorMessage name="userName" component="div" className="text-red-500 text-xs text-start" />
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Phone number
                                        </label>
                                        <Field
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="Type your phone number"
                                        />
                                    </div>
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs text-start" />

                                    <button
                                        type="submit"
                                        className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                    >
                                        Update Profile
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </>
    )
}

export default EditProfileModal