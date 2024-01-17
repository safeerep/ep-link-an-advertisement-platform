"use client"
import { authRequired, banAUser, getAllUsers } from '@/store/actions/adminActions/adminActions';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi';
import { FaSlidersH } from 'react-icons/fa';
import ConfimationModal from '@/components/Modals/ConfimationModal';

const Home = () => {
  const dispatch: any = useDispatch();
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getAllUsers())
  }, [])

  const blockOneUser = () => {
    dispatch(banAUser({ currentUser, setModalOpen }))
  }

  const users = useSelector((state: any) => state?.admin?.data?.users)
  console.log(users)

  return (
    <>
      <h1 className='text-xl p-3'> All users</h1>
      {/*  */}
      <div className="w-full flex justify-end px-3">

        {/* dropdown button */}
        <div>
          <button
            // onClick={}
            type="button"
            className="inline-flex"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <FaSlidersH className='flex items-center' />
          </button>
        </div>
        {/* dropdown button end */}
        {/* dropdown item one */}
        {/* <div
              className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="cursor-pointer">
                <button
                  // onClick={}
                  className="block px-4 py-2 text-sm text-red-600">
                  
                </button>
              </div>
            </div> */}
        {/* item one ends here */}
      </div>
      <table className="table border w-full overflow-scroll ps-2">
        <thead>
          <tr>
            <th className="border text-center">User Name</th>
            <th className="border text-center">User Email</th>
            <th className="border text-center">Phone</th>
            <th className="border text-center">Status</th>
            <th className="border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            (user &&
              <tr key={user._id}>
                <td className="border text-center">{user?.userName ? user?.userName : ''}</td>
                <td className="border text-center">{user?.email}</td>
                <td className="border text-center">{user?.phone ? user?.phone : ''}</td>
                <td className="border text-center">{user?.status ? 'Active' : 'Blocked'}</td>
                <td className="border flex justify-center items-center p-2">
                  {user?.status ?
                    <button
                      onClick={() => {
                        setCurrentUser(user);
                        setModalOpen(true);
                      }}
                    >
                      <FiLock
                      />
                    </button> :
                    <button
                      onClick={() => {
                        setCurrentUser(user);
                        setModalOpen(true)
                      }}
                    >
                      <FiUnlock />
                    </button>
                  }
                </td>
              </tr>)
          ))}
        </tbody>
      </table>
      <ConfimationModal
        afterConfirmation={blockOneUser}
        isModalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}

export default Home