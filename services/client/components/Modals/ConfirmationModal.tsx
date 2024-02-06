"use client"
import React from 'react'
import { Toaster } from 'react-hot-toast';

const ConfimationModal = ({ isModalOpen, setModalOpen, afterConfirmation }: { isModalOpen: boolean, setModalOpen: any, afterConfirmation: any}) => {
  return (
    <>
      {isModalOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 shadow-lg mx-auto max-w-sm">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex p-5 rounded-t">
                <button
                  className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  x
                </button>
              </div>
              <div className="flex justify-center"></div>
              {/* body */}

              <div className="relative px-12 flex-auto">
                <p className="font-bold text-lg p-5">hey are you sure</p>
              </div>
              {/*footer*/}

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Close
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    afterConfirmation()
                  }}
                  className="bg-slate-900 text-white active:bg-slate-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default ConfimationModal;