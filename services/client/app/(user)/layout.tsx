"use client"
import { Navbar } from "@/components";


export default function Layout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="w-full">
                {children}
            </div>
        </>
    )
}