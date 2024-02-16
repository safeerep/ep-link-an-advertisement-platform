"use client"
import { authRequired, changeProductStatus, getProducts, getReportedProducts } from '@/store/actions/adminActions/adminActions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi';
import ConfimationModal from '@/components/Modals/ConfirmationModal';
import { AppDispatch, RootState } from '@/store/store';
import { Product } from '@/types/product';
import Pagination from '@/components/shared/common/Pagination';

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [showReported, setShowReported] = useState<boolean>(false)

  const page: number = useSelector((state: RootState) => state?.admin?.data?.currentPage) ?? 1;

  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getProducts(page))
  }, [])

  useEffect(() => {
    if (showReported) {
      dispatch(getReportedProducts(page))
    }
    else {
      dispatch(getProducts(page))
    }
  },[showReported])

  const changeStatus = () => {
    const productId: string | any = currentProduct?._id;
    const status: boolean | any = currentProduct?.status;
    dispatch(changeProductStatus({ productId: productId, status: !status }))
    setModalOpen(false)
    if (showReported) {
      dispatch(getReportedProducts(page))
    }
    else {
      dispatch(getProducts(page))
    }
  }

  const products = useSelector((state: RootState) => state?.admin?.data?.products)
  const reportedProducts = useSelector((state: RootState) => state?.admin?.data?.reportedProducts)
  const totalProducts = useSelector((state: RootState) => state?.admin?.data?.countOfProducts)
  const totalPages: number = Math.ceil(totalProducts/10);

  const handlePageChanges = (pageNumber: number) => {
    if (showReported) {
      dispatch(getReportedProducts(pageNumber))
    }
    else {
      dispatch(getProducts(pageNumber))
    }
  }

  const filterToShowProducts = () => {
    setShowReported(!showReported)
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className='text-xl p-3'>Products</h1>
      </div>
      {/*  */}
      <div className="w-full flex justify-end px-3 mb-2">
        {
          showReported ?
            <button
              onClick={filterToShowProducts}
              className='bg-black text-white px-4 p-2 rounded-md'>
              Show All Products
            </button> :
            <button
              onClick={filterToShowProducts}
              className='bg-yellow-600 text-white px-4 p-1 m-1 rounded-md'>
              Show Reported Products
            </button>
        }
      </div>
      <table className="table border w-full overflow-scroll mx-2 ps-2">
        {
          !showReported ?
            (
              <>
                <thead>
                  <tr>
                    <th className="border text-center">Product Name</th>
                    <th className="border text-center">Category Name</th>
                    <th className="border text-center">Active Status</th>
                    <th className="border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product: Product) => (
                    <tr key={product?._id}>
                      <td className="border text-center">{product?.productName}</td>
                      <td className="border text-center">{product?.categoryName}</td>
                      <td className="border text-center">{product?.status ? 'Active' : 'Blocked'}</td>
                      <td className="border flex justify-center items-center p-2">
                        {product?.status ?
                          <button
                            onClick={() => {
                              setCurrentProduct(product);
                              setModalOpen(true);
                            }}
                          >
                            <FiLock
                            />
                          </button> :
                          <button
                            onClick={() => {
                              setCurrentProduct(product);
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
              </>
            ) : (
              <>
                <thead>
                  <tr>
                    <th className="border text-center">Reported Product Name</th>
                    <th className="border text-center">Reported By</th>
                    <th className="border text-center">Reported Reason</th>
                    <th className="border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportedProducts?.map((reportDoc: any) => (

                    <tr key={reportDoc._id}>
                      <td className="border text-center">{reportDoc?.reportedOn ? reportDoc?.reportedOn[0]?.productName : ''}</td>
                      <td className="border text-center">{reportDoc?.reports ? reportDoc?.reports?.reportedBy : ''}</td>
                      <td className="border text-center">{reportDoc?.reports ? reportDoc?.reports?.reason : ''}</td>
                      <td className="border flex justify-center items-center p-2">
                        {reportDoc?.status ?
                          <button
                            onClick={() => {
                              setCurrentProduct(reportDoc?.reportedOn[0]);
                              setModalOpen(true);
                            }}
                          >
                            <FiLock
                            />
                          </button> :
                          <button
                            onClick={() => {
                              setCurrentProduct(reportDoc?.reportedOn[0]);
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
              </>
            )
        }
      </table>
      <Pagination currentPage={page} passPageToComponent={handlePageChanges} totalPages={totalPages} />
      <ConfimationModal
        afterConfirmation={changeStatus}
        isModalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}

export default Products;