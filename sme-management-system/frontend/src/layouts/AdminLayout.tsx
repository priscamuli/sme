import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}