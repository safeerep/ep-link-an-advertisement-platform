"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, getAllCategories, getProducts } from '@/store/actions/userActions/userActions'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '../../shared/userSide/Navbar'
import Banner from '../Banner'
import Link from 'next/link'
import Posts from '../Posts'
import { Footer } from '@/components'
import { Toaster } from 'react-hot-toast'
import { AppDispatch, RootState } from '@/store/store'
import Pagination from '@/components/shared/common/Pagination'

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([''])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([''])


  const searchParams = useSearchParams();
  const searchQuery: string = searchParams.get("search") || '';
  const page: number = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(checkAuth(router))
    dispatch(getProducts({ searchQuery, page }))
    dispatch(getAllCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProducts({ searchQuery, page, locations: selectedLocations, categories: selectedCategories }))
  }, [searchQuery, selectedLocations, selectedCategories])

  const handleCategorySelectionChanges = (categoryName: string) => {
    const currentlySelectedCategories: string[] = selectedCategories;
    if (currentlySelectedCategories?.includes(categoryName)) {
      const updatedCategories: string[] = currentlySelectedCategories?.filter((category: string) => {
        return categoryName !== category;
      })
      setSelectedCategories(updatedCategories)
    }
    else {
      currentlySelectedCategories.push(categoryName);
      setSelectedCategories(currentlySelectedCategories)
    }
  }

  const handleLocationSelectionChanges = (locationName: string) => {
    const currentlySelectedLocations: string[] = selectedLocations;
    if (currentlySelectedLocations?.includes(locationName)) {
      const updatedLocations: string[] = currentlySelectedLocations?.filter((location: string) => {
        return locationName !== location;
      })
      setSelectedLocations(updatedLocations)
    } else {
      currentlySelectedLocations.push(locationName);
      setSelectedLocations(currentlySelectedLocations)
    }

  }

  const categories = useSelector((state: RootState) => state.user?.data?.categories)
  const locations = useSelector((state: RootState) => state.user?.data?.locations)
  const totalProducts = useSelector((state: RootState) => state.user.data?.countOfProducts)
  const totalPages = Math.ceil(totalProducts / 8);

  const handlePageChanges = (pageNumber: number) => {
    dispatch(getProducts({ searchQuery, page: pageNumber, locations: selectedLocations, categories: selectedCategories }))
  }

  return (
    <>
      <div className='mt-[-8px]'>
        <Navbar />
      </div>
      <div className='min-h-screen'>
        <div className='w-full bg-slate-200 h-auto pt-20'>
          {
            categories?.length &&
            <span className='text-2xl font-semibold text-black px-12 '>Categories to Shop</span>
          }
          {
            categories?.length &&
            <div className="flex justify-start px-12 gap-2 my-4">
              {categories?.map((category: any) => (
                <button
                  onClick={() => {
                    handleCategorySelectionChanges(category?.categoryName)
                  }}
                  type="button" >
                  <span className={`${selectedCategories?.includes(category?.categoryName)?' bg-cyan-100': 'bg-white'} border border-black p-2 rounded`}>{category?.categoryName}</span>
                </button>
              ))}
            </div>
          }

          {/* here we will show maximum of top ten locations*/}
          {
            locations?.length &&
            <span className='text-2xl font-semibold text-black px-12 '>Frequently Active Locations</span>
          }
          {
            locations?.length &&
            <div className="flex justify-start px-12 gap-2 my-4">
              {locations?.map((location: string) => (
                <button
                  onClick={() => {
                    handleLocationSelectionChanges(location)
                  }}
                  type="button" >
                  <span className={`${selectedLocations?.includes(location)?'bg-cyan-100': 'bg-white' } border border-black p-2 rounded`}>{location}</span>
                </button>
              ))}
            </div>
          }

          <div className="flex justify-center ">
            <span className='font-semibold '>looking for to sell your product?
              <Link href='/add-product' className='text-blue-600'>addproduct</Link>
            </span>
          </div>
        </div>
        <Posts from={'home'} />
        {
          totalProducts &&
          totalProducts > 0 &&
          <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
        }
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default Home