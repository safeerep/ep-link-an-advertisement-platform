"use client"
import { ProfileSidebar } from "@/components"

export default function Layout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex lg:flex-row md:flex-col sm:flex-col w-full px-8 p-2">
                <ProfileSidebar />
                {children}
            </div>
        </>
    )
}