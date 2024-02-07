"use client"
import PolicyAdvertisementModal from "@/components/Modals/PolicyAdvertisement"
import ShowAttachments from "@/components/Modals/showAttachments"
import { useState } from "react"

export default function Home() {
  const [ modalOpen, setModalOpen] = useState(true)
  return (
    <>
    < ShowAttachments
    afterConfirmation={''} 
    isModalOpen={modalOpen}
    setModalOpen={setModalOpen}
    />
    </>
  )
}
