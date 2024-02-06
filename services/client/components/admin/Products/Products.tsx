"use client"
import { authRequired, banAProduct, getProducts } from '@/store/actions/adminActions/adminActions';
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
  }, [])

  const banOneProduct = () => {
    const productId: string = currentProduct?._id;
    const status: boolean = currentProduct?.status;
    dispatch(banAProduct({ productId: productId, status: !status }))
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
              className='bg-black text-white px-4 p-2 rounded-md'>
              Show Reported Products
            </button>
        }
      </div>
      <table className="table border w-full overflow-scroll mx-2 ps-2">
        <thead>
          <tr>
            <th className="border text-center">Product Name</th>
            <th className="border text-center">Category Name</th>
            <th className="border text-center">Active Status</th>
            <th className="border text-center">Action</th>
          </tr>
        </thead>
        {
          showReported ?
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
            </tbody> :
            <tbody>
              {products?.map((product: any) => (
                (product &&
                  <tr key='l'>
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
                )
              ))}
            </tbody>
        }
      </table>
      <ConfimationModal
        afterConfirmation={banOneProduct}
        isModalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}

export default Products;