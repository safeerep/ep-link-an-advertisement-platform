import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/actions/userActions/userActions'
import Link from 'next/link';
import EditProfileModal from '../Modals/EditProfileModal';
import { AppDispatch, RootState } from '@/store/store';
import { User } from '@/types/user';

const ProfileSidebar = () => {
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()
    const [updateProfileModalIsOpen, setUpdateProfileModalIsOpen] = useState(false);
    const [currentlyIn, setCurrentlyIn] = useState('profile')

    const handleLogout = () => {
        setCurrentlyIn('logout')
        dispatch(logout(router))
    }

    const handleUpdateProfile = () => {
        setCurrentlyIn('edit')
        setUpdateProfileModalIsOpen(!updateProfileModalIsOpen)
    }
    const calculateEndDate = (takenOnDate: Date) => {
        const endDate = new Date(takenOnDate);
        endDate.setMonth(endDate.getMonth() + 1);

        return endDate.toLocaleString('en-US', {
            weekday: 'long',
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const user: User = useSelector((state: RootState) => state?.user?.data?.userData)

    return (
        <div className="lg:w-1/5 flex flex-col border-0 border-e-2">
            <div className='w-full flex justify-center'>
                <img
                    src={user?.profilePhoto}
                    className="bg-slate-200 rounded-full"
                    alt="Profile Picture"
                    style={{ width: '150px', height: '150px' }}
                />
            </div>
            {/* starting */}
            {
                user?.premiumMember &&
                <div className="mx-2 p-2">
                    {
                        user?.subscription?.takenOn && (
                            <div className='text-yellow-700 '>
                                Your premium plan will end on {calculateEndDate(user.subscription.takenOn)}.
                            </div>
                        )
                    }
                </div>
            }
            {/* ending */}
            {/* starting */}
            <div className="flex mx-2 p-2 justify-around">
                <div
                    className='flex flex-col cursor-pointer'>
                    <span className='text-center font-bold'>Followers</span>
                    <span className='text-center font-bold'>{user?.followers?.length}</span>
                </div>
                <div
                    className='flex flex-col cursor-pointer'>
                    <span className='text-center font-bold'>Following</span>
                    <span className='text-center font-bold'>{user?.following?.length}</span>
                </div>
            </div>

            <div
                onClick={() => router.push('/profile/connections')}
                className='flex justify-center my-2 cursor-pointer'>
                <span className='text-center text-blue-600 font-bold'>show connections</span>
            </div>
            {/* ending  */}
            <Link
                href={'/profile'}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md ${currentlyIn === 'profile' ? 'bg-blue-100' : 'bg-blue-50'} whitespace-nowrap`}
            >My Profile</Link>
            <button
                onClick={handleUpdateProfile}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md ${currentlyIn === 'edit' ? 'bg-blue-100' : 'bg-blue-50'} whitespace-nowrap`}
            >Edit Profile</button>
            <Link
                href={'/add-product'}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md bg-blue-50 whitespace-nowrap`}
            >Add new product</Link>
            <Link
                href={'/favourites'}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md bg-blue-50 whitespace-nowrap`}
            >My Favourites</Link>
            <button
                onClick={handleLogout}
                className={`border flex justify-center my-1 mx-2 p-2 rounded-md ${currentlyIn === 'logout' ? 'bg-blue-100' : 'bg-blue-50'} whitespace-nowrap`}
            >Sign out</button>
            <EditProfileModal
                isModalOpen={updateProfileModalIsOpen}
                setIsModalOpen={setUpdateProfileModalIsOpen}
            />
        </div>
    );
};

export default ProfileSidebar;