"use client"
import { authRequired, changeProductStatus, getProducts } from '@/store/actions/adminActions/adminActions';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi';
import ConfimationModal from '@/components/Modals/ConfirmationModal';

const Products = () => {
  const dispatch: any = useDispatch();
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [showReported, setShowReported] = useState<boolean>(false)
  useEffect(() => {
    dispatch(authRequired(router))
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    if (showReported) {
      dispatch(getProducts())
    }
    else {

    }
  },[showReported])

  const changeStatus = () => {
    const productId: string = currentProduct?._id;
    const status: boolean = currentProduct?.status;
    dispatch(changeProductStatus({ productId: productId, status: !status }))
    setModalOpen(false)
  }

  const products = useSelector((state: any) => state?.admin?.data?.products)
  const reportedProducts = useSelector((state: any) => state?.admin?.data?.reportedProducts)

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
                  {products?.filter((product: any) => (
                    product && reportedProducts?.some((reportedProduct: any) => reportedProduct?.productId === product?._id)
                  )).map((filteredProduct: any) => (
                    <tr key={filteredProduct?._id}>
                      <td className="border text-center">{filteredProduct?.productName}</td>
                      <td className="border text-center">{filteredProduct?.categoryName}</td>
                      <td className="border text-center">{filteredProduct?.status ? 'Active' : 'Blocked'}</td>
                      <td className="border flex justify-center items-center p-2">
                        {filteredProduct?.status ?
                          <button
                            onClick={() => {
                              setCurrentProduct(filteredProduct);
                              setModalOpen(true);
                            }}
                          >
                            <FiLock
                            />
                          </button> :
                          <button
                            onClick={() => {
                              setCurrentProduct(filteredProduct);
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

                    <tr key='l'>
                      <td className="border text-center">{reportDoc?.reportedOn ? reportDoc?.reportedOn[0]?.productName : ''}</td>
                      <td className="border text-center">{reportDoc?.reportedBy ? reportDoc?.reportedBy[0]?.userName : ''}</td>
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
      <ConfimationModal
        afterConfirmation={changeStatus}
        isModalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}

export default Products;