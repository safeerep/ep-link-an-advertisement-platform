"use client"
import React, { useState, useRef } from 'react'
import { Toaster } from 'react-hot-toast';
import { BsPlay } from 'react-icons/bs'

const ShowAttachments = ({ isModalOpen, setModalOpen, afterConfirmation }: { isModalOpen: boolean, setModalOpen: any, afterConfirmation: any }) => {
  const [videoPlay, setVideoPlay] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const handleVideoClick = () => {
    const video = mainVideoRef.current;
    if (video?.paused) {
      video.play();
      setVideoPlaying(true)
    } else if (video) {
      setVideoPlaying(false)
      video.pause();
    }
  };
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
              {/* <div className="relative px-12 flex-auto">
                <img src="brand.png" alt="" />
                <div className="flex justify-center gap-1 overflow-x-auto">
                  <img src="brand.png" alt="" />
                  <img src="brand.png" alt="" />
                  <img src="brand.png" alt="" />
                  <img src="brand.png" alt="" />
                </div>

              </div> */}
              {/* <div className="relative px-12 flex-auto gap-1">
                <div
                  onClick={handleVideoClick}
                  className='relative'>
                  <video
                    className='p-4' ref={mainVideoRef} src="sample video.mp4"></video>
                  {
                    videoPlaying ?
                      '' :
                      <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
                      >
                        < BsPlay />
                      </button>
                  }
                </div>
                <div className="flex justify-center gap-1 overflow-x-scroll">
                  <video src="sample video.mp4"></video>
                  <video src="sample video.mp4"></video>
                  <video src="sample video.mp4"></video>
                </div>

              </div> */}

              <object
                // key={index}
                data={'SAFEER MON EP.pdf'}
                // type={`application/${document.type === 'pdf' ? 'pdf' : 'vnd.openxmlformats-officedocument.' + document.type}`}
                type={`application/pdf`}
                className={`p-4  'border-blue-500' : 'border-white'}`}
                // className={`p-4 ${selectedDocument === index ? 'border-blue-500' : 'border-white'}`}
                // onClick={() => handleDocumentClick(index)}
              >
                {/* {document.title} */}
              </object>
              {/*footer*/}

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    afterConfirmation()
                  }}
                  className="bg-slate-900 text-white active:bg-slate-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Send
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

export default ShowAttachments;