"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FiUser } from 'react-icons/fi'
import { BsChatDots } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { RiArrowDownSLine } from 'react-icons/ri'
import { getProducts, getTotalCountOfUnreadMessage, logout } from '@/store/actions/userActions/userActions'
import { Skeleton } from '@mui/material'
import { AppDispatch, RootState } from '@/store/store'
import { User } from '@/types/user'
import ConfimationModalWithDialogue from '@/components/Modals/ConfirmationWithDialogue'
import Image from 'next/image'

const Navbar = ({ from }: { from?: string }) => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchParams = useSearchParams();
  const searchQuery: string = searchParams.get("search") || '';

  useEffect(() => {
    dispatch(getTotalCountOfUnreadMessage())
  }, [])

  useEffect(() => {
    setSearchTerm(searchQuery)
  }, [dispatch, searchQuery])

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleButtonClickForDropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = setTimeout(() => {
      searchProducts(value);
    }, 2000);

    setTypingTimeout(timeoutId);
  };

  const searchProducts = (substring: string) => {
    console.log(substring);

    const encodedQuery = encodeURIComponent(substring);
    router.push(`?search=${encodedQuery}`)
  }

  const handleNavigate = (toRoute: string) => {
    setDropdownOpen(false);
    router.push(`/${toRoute}`)
  }

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout(router))
  }

  const user: User = useSelector((state: RootState) => state?.user?.data?.userData)
  const totalCountOfUnreadMessages: number = useSelector((state: RootState) => state?.user?.data?.totalCountOfUnreadMessages)
  const userLoading: boolean = useSelector((state: RootState) => state?.user?.loading)

  if (userLoading) {
    return <Skeleton variant="rectangular" className='w-full' sx={{ bgcolor: '#e3f2fd' }} height={60} />
  }
  return (
    !userLoading &&
    (<div className='fixed w-full h-16 shadow bg-cyan-100 flex justify-between z-40'>
      <div
        style={{
          backgroundSize: 'cover',
        }}
        className='cursor-pointer flex justify-center items-center'
        onClick={() => router.push('/')}>
        <Image src="/brand.png"
          alt='logo'
          width={200} height={200} />
      </div>
      <div className='flex items-center pe-10 gap-x-8'>
        {
          from && (
            <div className='flex relative items-center mt-1'>
              <input
                placeholder='Search for products'
                className='text-black font-semibold p-2 pl-8 sm:w-32 md:w-60 lg:w-60 xl:w-80 border rounded-md'
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
              />
              <BsSearch className='absolute left-2' />
            </div>
          )
        }

        <div className='relative  py-1 px-2 text-blue-100 rounded border border-black'>
          <BsChatDots
            className='cursor-pointer text-xl text-black'
            onClick={() => router.push('/chat')}
          />
          {
            totalCountOfUnreadMessages &&
            totalCountOfUnreadMessages > 0 &&
            (
              <span className="absolute bg-red-600 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">
                { totalCountOfUnreadMessages > 99 ? '99+' : totalCountOfUnreadMessages }
              </span>
            )
          }
        </div>
        {(user && user?.userName !== undefined) ? (
          <>
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => handleButtonClickForDropDown()}
                  type="button"
                  className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <FiUser className='text-xl' />
                  {user?.userName}
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
      </div>
      < ConfimationModalWithDialogue
        afterConfirmation={searchProducts}
        isModalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
        notesHead="Search for products"
        submitButtonName='Search'
      />
    </div>)
  )
}

export default Navbar