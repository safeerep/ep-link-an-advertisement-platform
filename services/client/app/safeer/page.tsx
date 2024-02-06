"use client"
import PolicyAdvertisementModal from "@/components/Modals/PolicyAdvertisement"
import { useState } from "react"

export default function Home() {
  const [ modalOpen, setModalOpen] = useState(true)
  return (
    <>
    < PolicyAdvertisementModal 
    isModalOpen={modalOpen}
    setModalOpen={setModalOpen}
    />
    </>
  )
}
