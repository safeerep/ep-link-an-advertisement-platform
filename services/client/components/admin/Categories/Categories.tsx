"use client"
import { authRequired, changeCategoryStatus, getAllCategories } from '@/store/actions/adminActions/adminActions';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai'
import { FaSlidersH } from 'react-icons/fa';
import ConfimationModal from '@/components/Modals/ConfirmationModal';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/store/store';

const Categories = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()
  const [modalState, setModalState] = useState(false);
  const [categoryId, setCategoryId] = useState<string>('');
  const [status, setStatus] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getAllCategories())
  }, [])

  const changeStatus = () => {
    dispatch(changeCategoryStatus({ categoryId, status, setModalState }))
  }

  const categories = useSelector((state: RootState) => state?.admin?.data?.categories)

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className='text-xl p-3'>Categories</h1>
        <Link
          href={'/admin/categories/add-category'}
          className='bg-slate-950 flex justify-center items-center text-white rounded-md px-3 h-8'>
          Add Category
        </Link>
      </div>
      <table className="table border w-full overflow-scroll ms-2 ps-2">
        <thead>
          <tr>
            <th className="border text-center">Category Name</th>
            <th className="border text-center">Active Status</th>
            <th className="border text-center">Edit Category</th>
            <th className="border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.map((category: any) => (
          <tr key={category?._id}>
            <td className="border text-center">{category?.categoryName}</td>
            <td className="border text-center">{category?.status? "Active": "Blocked"}</td>
            <td className="border text-center">
            <button
              onClick={() => {
                router.push(`/admin/categories/add-category?categoryId=${category._id}`)
              }}
              >
                <AiOutlineEdit/>
              </button>
            </td>
            <td className="border flex justify-center items-center p-2">
              {category?.status?
              <button
              onClick={() => {
                setModalState(true)
                setCategoryId(category._id)
                setStatus(false)
              }}
              >
                <FiLock
                />
              </button> :
              <button
              onClick={() => {
                setModalState(true)
                setCategoryId(category._id)
                setStatus(true)
              }}
              >
                <FiUnlock />
              </button>
              }
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      <ConfimationModal
        afterConfirmation={changeStatus}
        isModalOpen={modalState}
        setModalOpen={setModalState}
      />
    </>
  )
}

export default Categories;