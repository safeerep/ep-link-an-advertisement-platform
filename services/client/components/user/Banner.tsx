import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getAllCategories } from '@/store/actions/userActions/userActions'

const Banner = () => {
  const dispatch: AppDispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.user?.data?.categories)
  const locations = useSelector((state: RootState) => state.user?.data?.locations)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const handleCategorySelectionChanges = ( categoryName: string) => {

  }

  const handleLocationSelectionChanges = ( location: string) => {

  }

  return (
    <div className='w-full bg-slate-200 h-auto pt-20'>
      <span className='text-2xl font-semibold text-black px-12 '>Categories to Shop</span>
      <div className="flex justify-start px-12 gap-2 my-4">
        {/* here we will map all categories */}
        <button
          type="button" >
          <span className=" bg-cyan-100 border border-black p-2 rounded">{'vehicles'}</span>
        </button>
        <button
          type="button" >
          <span className="bg-cyan-100 border border-black p-2 rounded">{'vehicles'}</span>
        </button>
        <button
          type="button" >
          <span className=" bg-cyan-100 border border-black p-2 rounded">{'vehicles'}</span>
        </button>
        {/* categories ending */}
      </div>

      {/* here we will show maximum of top ten locations*/}
      <span className='text-2xl font-semibold text-black px-12 '>Frequently Added Locations</span>
      <div className="flex justify-start px-12 gap-2 my-4">
        <button
          type="button" >
          <span className=" bg-cyan-100 border border-black p-2 rounded">{'tirur'}</span>
        </button>
        <button
          type="button" >
          <span className="bg-cyan-100 border border-black p-2 rounded">{'wayanadu'}</span>
        </button>
        <button
          type="button" >
          <span className=" bg-cyan-100 border border-black p-2 rounded">{'lisbon'}</span>
        </button>
      </div>

      <div className="flex justify-center ">
        <span className='font-semibold '>looking for to sell your product?
          <Link href='/add-product' className='text-blue-600'>addproduct</Link>
        </span>
      </div>
    </div>
  )
}

export default Banner