"use client"
import { AdminNavbar, Categories } from "@/components";
import { AdminSidebar } from "@/components";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <AdminNavbar />
      <div className=" flex justify-center w-full px-2 p-2">
        <AdminSidebar />
        <div className="w-full">
          {/* starting */}
          <div className="flex justify-between w-full">
            <h1 className='text-xl p-3'>Subscribers</h1>
          </div>
          <table className="table border w-full overflow-scroll ms-1">
            <thead>
              <tr>
                <th className="border text-center">Email</th>
                <th className="border text-center">Policy Chosen</th>
                <th className="border text-center">Paid Amount</th>
                <th className="border text-center">Taken On</th>
                <th className="border text-center">Validity upto</th>
              </tr>
            </thead>
            <tbody>

              <tr key={''}>
                <td className="border text-center">khk</td>
                <td className="border text-center">hfjk</td>
                <td className="border text-center">tfyioio</td>
                <td className="border text-center">tfyioio</td>
                <td className="border text-center">tfyioio</td>

              </tr>
            </tbody>
          </table>
          {/* ending */}
        </div>
      </div>
    </>

  );
}
