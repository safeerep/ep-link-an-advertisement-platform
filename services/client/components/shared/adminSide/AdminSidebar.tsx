import Link from 'next/link'
import React from 'react'

const AdminSidebar = () => {
  return (
    <div className="sm:w-1/4 md:w-1/5 lg:w-1/6 flex flex-col border-0 border-e-2 min-h-screen">
            <Link
                href={'/admin'}
                className={`border my-1 mx-2 p-2 text-center rounded-md bg-slate-50 whitespace-nowrap`}
            >Users</Link>
            <Link
                href={'/admin/products'}
                className={`border my-1 mx-2 p-2 text-center rounded-md bg-slate-50 whitespace-nowrap`}
            >Products</Link>
            <Link
                href={'/admin/categories'}
                className={`border my-1 mx-2 p-2 text-center rounded-md bg-slate-50 whitespace-nowrap`}
            >Categories</Link>
            <Link
                href={'/admin/premium-policies'}
                className={`border my-1 mx-2 p-2 text-center rounded-md bg-slate-50 whitespace-nowrap`}
            >Premium Policies</Link>
        </div>
  )
}

export default AdminSidebar