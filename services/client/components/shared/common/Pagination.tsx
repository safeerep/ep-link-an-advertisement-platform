import React from 'react'
import { BsArrowLeft, BsArrowRight, BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'

const Pagination = ({ totalPages, currentPage, passPageToComponent }: { totalPages: number, currentPage: number, passPageToComponent: any }) => {
    return (
        <>
            <div className="flex gap-2 justify-end px-20 mb-2">
                {
                    currentPage > 2 &&
                    <div
                        onClick={() => {
                            passPageToComponent(1)
                        }}
                        className="w-8 h-8 rounded-full bg-white border-2 border-black flex justify-center items-center">
                        <BsChevronDoubleLeft />
                    </div>
                }
                {
                    currentPage > 1 &&
                    <div
                        onClick={() => {
                            passPageToComponent(currentPage - 1)
                        }}
                        className="w-8 h-8 rounded-md bg-white border-2 border-black flex justify-center items-center">
                        <BsArrowLeft />
                    </div>
                }
                <div className="w-8 h-8 rounded-md bg-white border-2 border-black flex justify-center items-center">
                    {currentPage}
                </div>
                {
                    totalPages > currentPage &&
                    <div
                        onClick={() => {
                            passPageToComponent(currentPage + 1)
                        }}
                        className="w-8 h-8 rounded-md bg-white border-2 border-black flex justify-center items-center">
                        <BsArrowRight />
                    </div>
                }
                {
                    totalPages > currentPage && (totalPages - currentPage) > 1 &&
                    <div
                        onClick={() => {
                            passPageToComponent(totalPages)
                        }}
                        className="w-8 h-8 rounded-full bg-white border-2 border-black flex justify-center items-center">
                        <BsChevronDoubleRight />
                    </div>}
            </div>
        </>

    )
}

export default Pagination