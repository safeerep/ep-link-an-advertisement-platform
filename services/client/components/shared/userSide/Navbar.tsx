"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FiUser } from 'react-icons/fi'
import { BsChatDots } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { RiArrowDownSLine } from 'react-icons/ri'
import { logout } from '@/store/actions/userActions/userActions'



const Navbar = () => {
  const dispatch: any = useDispatch()
  const router = useRouter()

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleButtonClickForDropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNavigate = (toRoute: string) => {
    router.push(`/${toRoute}`)
  }

  const handleLogout = () => {
    dispatch(logout(router))
  }

  const user: any = useSelector((state: any) => state.user.data)
  console.log(user?.userData?.userName);
  return (
    <div className='w-full h-16 shadow bg-blue-100 flex justify-between'>
      <div
        style={{
          backgroundSize: 'cover',
        }}
        className=' flex justify-center items-center'
        onClick={() => router.push('/')}>
        <img src="/brand.png"
          alt='logo'
          width={200} height={200}>
        </img>
      </div>
      <div className='flex relative items-center'>
        <input
          placeholder='Search for products'
          className='text-black font-semibold p-2 pl-8 sm:w-32 md:w-60 lg:w-60 xl:w-80 border rounded-md'
        />
        <BsSearch className='absolute top-6 left-2' />
      </div>
      <div className='flex items-center pe-10'>
        <BsChatDots />
        {(user && user?.userData?.userName !== undefined) ? (
          <>
            <div className="relative inline-block text-left mx-4">
              <div>
                <button
                  onClick={() => handleButtonClickForDropDown()}
                  type="button"
                  className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {user?.userData?.userName}
                  <RiArrowDownSLine />
                </button>
              </div>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="cursor-pointer">
                    <button
                      onClick={() => handleNavigate('profile')}
                      className="block px-4 py-2 text-sm text-red-600">
                      Profile
                    </button>
                    <button
                      onClick={() => handleNavigate('favourites')}
                      className="block px-4 py-2 text-sm text-red-600">
                      Favourites
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-600">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : <Link href='/sign-up' className='text-black font-semibold ps-10 pe-2'>LOGIN</Link>}
        <FiUser />
      </div>
    </div>
  )
}

export default Navbar