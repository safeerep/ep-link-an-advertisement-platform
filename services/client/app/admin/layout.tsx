"use client"
import { AdminNavbar } from "@/components";
import { AdminSidebar } from "@/components";

export default function Layout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <AdminNavbar />
            <div className=" flex justify-center w-full px-2 p-2">
                <AdminSidebar />
                <div className="w-full">
                    {children}
                </div>
            </div>
        </>
    )
}