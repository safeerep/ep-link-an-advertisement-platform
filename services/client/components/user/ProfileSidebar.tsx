// "use client"
import React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/actions/userActions/userActions'
import Link from 'next/link';

const ProfileSidebar = () => {
    const dispatch: any = useDispatch()
  const router = useRouter()
    const handleLogout = () => {
        dispatch(logout(router))
    }
    return (
        <div className="lg:w-1/5 flex flex-col justify-center border-0 border-e-2">
            <div className='w-full flex justify-center'>
                <img
                    src="/profile.jpg"
                    className="bg-slate-200 rounded-full"
                    alt="Profile Picture"
                    style={{ width: '150px', height: '150px' }}
                />
            </div>
            <Link
                href={'/profile'}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md bg-slate-100 whitespace-nowrap`}
            >My Profile</Link>
            <Link
                href={'/add-product'}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md bg-slate-100 whitespace-nowrap`}
            >Add new product</Link>
            <Link
                href={'/favourites'}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md bg-slate-100 whitespace-nowrap`}
            >My Favourites</Link>
            <button
                onClick={handleLogout}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md bg-slate-100 whitespace-nowrap`}
            >Sign out</button>
        </div>
    );
};

export default ProfileSidebar;
