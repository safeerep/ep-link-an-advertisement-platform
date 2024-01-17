import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FiUser } from 'react-icons/fi'
import { logout } from '@/store/actions/adminActions/adminActions'

const AdminNavbar = () => {
  const dispatch: any = useDispatch()
  const router = useRouter()

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleButtonClickForDropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(router))
  }

  const admin: any = useSelector((state: any) => state.admin.data)
  
  return (
    <div className='w-full h-16 shadow bg-slate-100 flex justify-between'>
      <div style={{
        backgroundSize: 'cover',
      }} className=' flex justify-center items-center'>
        <Image src="/brand.png"
          alt='logo'
          width={200} height={200}>
        </Image>
      </div>
      <div className='flex items-center pe-10'>
          <div className="relative inline-block text-left mx-4">
            <div>
              <button
                onClick={() => handleButtonClickForDropDown()}
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {admin?.adminData?.email? admin?.adminData?.email: 'admin'}
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {
            isDropdownOpen && 
            <div
              className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="cursor-pointer">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600">
                  Logout
                </button>
              </div>
            </div>
            }
          </div>
        <FiUser />
      </div>
    </div>
  )
}

export default AdminNavbar;