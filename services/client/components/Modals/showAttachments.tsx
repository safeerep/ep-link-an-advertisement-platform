"use client"
import React, { useState, useRef } from 'react'
import { Toaster } from 'react-hot-toast';
import { BsPlay } from 'react-icons/bs'
import { MdAudiotrack } from 'react-icons/md'

const ShowAttachments = ({ isModalOpen, setModalOpen, afterConfirmation, files, fileType }: { isModalOpen: boolean, setModalOpen: any, afterConfirmation: any, files?: any, fileType?: string }) => {
  const [main, setMain] = useState(0)
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
              {
                fileType === 'image' && files && files.length > 0 && files[0].type.startsWith('image/') && (
                  <div className="relative px-12 flex-auto">
                    <img src={URL.createObjectURL(files[main])} alt="" />
                    <div className="flex justify-center gap-1 overflow-x-auto">
                      {files.length > 1 && files?.map((image: any, index: any) => (
                        <img
                          onClick={() => setMain(index)}
                          className='w-20 h-20 m-2' key={index} src={URL.createObjectURL(image)} alt="" />
                      ))}
                    </div>
                  </div>
                )
              }
              {
                fileType === 'video' && files && files.length > 0 && (
                  <div className="relative px-12 flex-auto">
                    <div
                      className='relative'
                    >
                      <video
                        className='p-4'
                        ref={mainVideoRef}
                        src={URL.createObjectURL(files[main])}
                      ></video>
                      {
                        videoPlaying ?
                          null :
                          <button
                            onClick={handleVideoClick}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
                          >
                            <BsPlay />
                          </button>
                      }
                    </div>
                    <div className="flex justify-center gap-1 overflow-x-scroll">
                      {files.length > 1 && files?.map((video: any, index: any) => (
                        <video
                          onClick={() => setMain(index)}
                          key={index} src={URL.createObjectURL(video)}></video>
                      ))}
                    </div>
                  </div>
                )
              }
              {
                fileType === 'document' && files && files.length > 0 && (
                  <div className="relative px-12 flex-auto">
                    <object
                      data={URL.createObjectURL(files[main])}
                      type="application/pdf"
                      className="p-4"
                    >
                      <p>Your browser doesn't support embedded PDFs. You can still download it.</p>
                      <a href={URL.createObjectURL(files[main])} target="_blank" rel="noopener noreferrer">Download PDF</a>
                    </object>
                    <div className="flex justify-center gap-1 overflow-x-auto overflow-y-hidden">
                      {files.length > 1 && files.map((document: any, index: any) => (
                        <object
                          key={index}
                          onClick={() => setMain(index)}
                          data={URL.createObjectURL(document)}
                          type="application/pdf"
                          className="p-4"
                        >
                          <p>Your browser doesn't support embedded PDFs. You can still download it.</p>
                          <a href={URL.createObjectURL(document)} target="_blank" rel="noopener noreferrer">Download PDF</a>
                        </object>
                      ))}
                    </div>
                  </div>
                )
              }
              {
                fileType === 'audio' && files && files.length > 0 && (
                  <div className="relative px-12 flex-auto">
                    <div className="flex justify-center gap-1 overflow-x-auto overflow-y-hidden">
                      {files.map((audio: any, index: any) => (
                        <div
                          className='h-20 w-20 bg-yellow-500 flex justify-center items-center text-center my-1'
                          key={index} >
                          <MdAudiotrack className='text-2xl text-center' />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
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