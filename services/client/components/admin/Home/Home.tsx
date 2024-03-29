"use client"
import { authRequired, banAUser, getAllUsers, getReportedUsers } from '@/store/actions/adminActions/adminActions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi';
import ConfimationModal from '@/components/Modals/ConfirmationModal';
import { AppDispatch, RootState } from '@/store/store';
import { User } from '@/types/user';
import Pagination from '@/components/shared/common/Pagination';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showAllUsers, setShowAllUsers] = useState(true);

  const searchParams = useSearchParams();
  const page: number = useSelector((state: RootState) => state?.admin?.data?.currentPage) ?? 1;

  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getAllUsers(page))
  }, [])

  useEffect(() => {
    if (showAllUsers) {
      dispatch(getAllUsers(page))
    }
    else {
      dispatch(getReportedUsers(page))
    }
  }, [showAllUsers])

  const blockOneUser = () => {
    dispatch(banAUser({ currentUser, setModalOpen }))
  }

  const users = useSelector((state: RootState) => state?.admin?.data?.users)
  const reportedUsers = useSelector((state: RootState) => state?.admin?.data?.reportedUsers)
  const totalUsers = useSelector((state: RootState) => state?.admin?.data?.countOfUsers)
  const totalPages = Math.ceil(totalUsers/10);
  console.log(users)
  const handlePageChanges = (pageNumber: number) => {
    if (showAllUsers) {
      dispatch(getAllUsers(pageNumber))
    }
    else {
      dispatch(getReportedUsers(pageNumber))
    }
  }

  return (
    <>
      <h1 className='text-xl p-3'> All users</h1>
      {/* starting */}
      <div className="w-full flex justify-end px-3">
        {showAllUsers ?
          <button
            onClick={() => setShowAllUsers(!showAllUsers)}
            className='bg-yellow-600 text-white px-4 p-1 m-1 rounded-md'>
            Show Reported Accounts
          </button> :
          <button
            onClick={() => setShowAllUsers(!showAllUsers)}
            className='bg-black text-white px-4 p-1 m-1 rounded-md'>
            Show All users
          </button>
        }
      </div>
      <table className="table border w-full overflow-scroll ps-2">
        {
          showAllUsers ?
            (<>
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
                {users?.map((user: User) => (
                  <tr key={user?._id}>
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
                  </tr>
                ))}
              </tbody>
            </>) :
              (<>
                <thead>
                  <tr>
                    <th className="border text-center">Reported On</th>
                    <th className="border text-center">Reported By</th>
                    <th className="border text-center">Reported Reason</th>
                    <th className="border text-center">User Status</th>
                    <th className="border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {reportedUsers?.map((reportDoc: any) => (
                  
                  <tr key={reportDoc._id}>
                    <td className="border text-center">{reportDoc?.reportedOn ? reportDoc?.reportedOn[0]?.userName : ''}</td>
                    <td className="border text-center">{reportDoc?.reportedBy ? reportDoc?.reportedBy[0]?.userName : ''}</td>
                    <td className="border text-center">{reportDoc?.reports ? reportDoc?.reports?.reason : ''}</td>
                    <td className="border text-center">{reportDoc?.reportedOn[0]?.status ? 'Active' : 'Blocked'}</td>
                    <td className="border flex justify-center items-center p-2">
                      {reportDoc?.status ?
                        <button
                          onClick={() => {
                            setCurrentUser(reportDoc?.reportedOn[0]);
                            setModalOpen(true);
                          }}
                        >
                          <FiLock
                          />
                        </button> :
                        <button
                          onClick={() => {
                            setCurrentUser(reportDoc?.reportedOn[0]);
                            setModalOpen(true)
                          }}
                        >
                          <FiUnlock />
                        </button>
                      }
                    </td>
                  </tr>
                  ))}
                </tbody>
              </>)
          }

      </table>
      <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
      <ConfimationModal
        afterConfirmation={blockOneUser}
        isModalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}

export default Home