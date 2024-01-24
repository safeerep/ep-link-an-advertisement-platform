"use client"
import { Navbar } from "@/components";
import { Footer } from "@/components";

export default function Layout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen">
                {children}
            </div>
            <Footer />
        </>
    )
}