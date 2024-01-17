import React from 'react'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className=' w-full bg-slate-50 h-80 mt-2'>
        <div className="h-full related bottom-20 flex justify-center ">
            <span className='font-semibold absolute pt-64'>looking for to sell your product?
            <Link href='/add-product' className='text-blue-600'>addproduct</Link>
            </span>
        </div>
    </div>
  )
}

export default Banner