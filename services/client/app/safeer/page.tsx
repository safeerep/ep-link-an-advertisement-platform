"use client"
import { useState } from "react";
import Pagination from "@/components/shared/common/Pagination";

export default function Home() {
  const [ currentPage, setCurrentPage] = useState(1)
  const getPageChangeFromPagination = (pageNumber: number) => {
    console.log(`clicked `);
    console.log(pageNumber);
    
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <Pagination totalPages={10} currentPage={currentPage} passPageToComponent={getPageChangeFromPagination}></Pagination>
    </>

  );
}
