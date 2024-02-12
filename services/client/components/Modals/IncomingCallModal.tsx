import React from 'react'
import { Toaster } from 'react-hot-toast';

const IncomingCallModal = ({ isModalOpen, setModalOpen, afterAccepting, afterDeclining, data }: 
    { isModalOpen: boolean, setModalOpen: any, afterAccepting: any, afterDeclining: any, data: any }) => {
  return (
    <>
      {isModalOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 shadow-lg mx-auto max-w-sm">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              {/* <div className="flex p-5 rounded-t">
                <button
                  className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  x
                </button>
              </div> */}
              <div className="w-full flex justify-center">

              <div className="flex justify-center w-40 h-40 rounded-full bg-black">
                <img className="obj" src="profile.jpg" alt="" />
              </div>
              </div>
              {/* body */}

              <div className="relative px-12 flex-auto">
                <p className="font-bold text-lg p-5">{data?.from} is calling...</p>
              </div>
              {/*footer*/}

              <div className="flex items-center justify-around p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-red-600 text-white active:bg-slate-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    afterDeclining(data);
                  }}
                >
                  Decline
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    afterAccepting(data)
                  }}
                  className="bg-green-600 text-white active:bg-slate-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  )
}

export default IncomingCallModal