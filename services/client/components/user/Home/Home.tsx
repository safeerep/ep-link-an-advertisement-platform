"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, getAllCategories, getProducts } from '@/store/actions/userActions/userActions'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '../../shared/userSide/Navbar'
import Link from 'next/link'
import Posts from '../Posts'
import { Footer } from '@/components'
import { Toaster } from 'react-hot-toast'
import { AppDispatch, RootState } from '@/store/store'
import Pagination from '@/components/shared/common/Pagination'

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])


  const searchParams = useSearchParams();
  const searchQuery: string = searchParams.get("search") || '';
  const page: number = useSelector((state: RootState) => state.user?.data?.currentPage) ?? 1;

  useEffect(() => {
    dispatch(checkAuth(router))
    dispatch(getProducts({ searchQuery, page }))
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    const currentlySelectedCategories = selectedCategories.join(',')
    const currentlySelectedLocations = selectedCategories.join(',')
    dispatch(getProducts({ searchQuery, page: 1, locations: currentlySelectedLocations, categories: currentlySelectedCategories }))
  }, [searchQuery])

  const handleCategorySelectionChanges = (categoryName: string) => {
    console.log('category change called', categoryName);
  
    setSelectedCategories((prevSelectedCategories) => {
      const isCategorySelected = prevSelectedCategories?.includes(categoryName);
  
      if (isCategorySelected) {
        const updatedCategories = prevSelectedCategories?.filter((category) => categoryName !== category);
        if (updatedCategories) {
          dispatch(getProducts({ searchQuery, page, locations: updatedCategories.join(','), categories: updatedCategories.join(',') }));
        } else {
          dispatch(getProducts({ searchQuery, page, locations: '', categories: '' }));
        }
        return updatedCategories;
      } else {
        const updatedCategories = prevSelectedCategories ? [...prevSelectedCategories, categoryName] : [categoryName];
        dispatch(getProducts({ searchQuery, page, locations: updatedCategories.join(','), categories: updatedCategories.join(',') }));
        return updatedCategories;
      }
    });
  };

  const categories = useSelector((state: RootState) => state.user?.data?.categories)
  const totalProducts = useSelector((state: RootState) => state.user.data?.countOfProducts)
  const totalPages = Math.ceil(totalProducts / 8);

  const handlePageChanges = (pageNumber: number) => {
    const currentlySelectedCategories = selectedCategories.join(',')
    const currentlySelectedLocations = selectedCategories.join(',')
    dispatch(getProducts({ searchQuery, page: pageNumber, locations: currentlySelectedLocations, categories: currentlySelectedCategories }))
  }

  return (
    <>
      <div className='mt-[-8px]'>
        <Navbar from='home' />
      </div>
      <div className='min-h-screen'>
        <div className='w-full bg-slate-200 h-auto pt-20'>
          {
            categories?.length > 0 &&
            (
              <span className='text-2xl font-semibold text-black px-12 '>
                Categories to Explore
              </span>
            )
          }
          {
            selectedCategories.length > 0 &&
            (
              <div
                onClick={() => {
                  setSelectedCategories([])
                  dispatch(getProducts({ searchQuery, page, locations: '', categories: '' }))
                }}
                className='text-sm font-semibold text-black px-12 cursor-pointer '>Remove Filters
              </div>
            )
          }
          {
            categories?.length > 0 ?
              (
                <div className="flex flex-wrap justify-start px-12 gap-2 my-4">
                  {categories?.map((category: any) => (
                    <div
                      className='cursor-pointer my-2'
                      key={category.categoryName}
                      onClick={() => {
                        handleCategorySelectionChanges(category?.categoryName)
                      }}
                    >
                      <span className={`${selectedCategories?.includes(category?.categoryName) ? ' bg-cyan-100' : 'bg-white'} border border-black p-2 rounded`}>{category?.categoryName}</span>
                    </div>
                  ))}
                </div>
              )
              :
              (
                <div className='w-full text-md text-red-600 px-12 flex justify-center'>
                  sorry for the inconvenience, there is no categories to Explore
                </div>
              )
          }
          <div className="flex justify-center ">
            <span className='font-semibold '>looking for to sell your product?
              <Link href='/add-product' className='text-blue-600'>addproduct</Link>
            </span>
          </div>
        </div>
        <Posts from={'home'} />
        {
          totalProducts > 0 &&
          <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
        }
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default Home;