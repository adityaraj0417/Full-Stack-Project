import React, { useState } from 'react'
import TopNav from './TopNav'
import SideNav from './SideNav'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Product from './Product'
import ProfileView from './ProfileView'
import MyOrders from './MyOrders'
import { HiMenuAlt2 } from "react-icons/hi"

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex min-h-screen bg-gray-50 overflow-hidden'>
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Side Navigation */}
      <SideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className='flex-1 flex flex-col min-w-0'>
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center px-4 md:px-8">
           <button 
             className="lg:hidden p-2 -ml-2 mr-4 text-gray-600 hover:text-black transition-colors"
             onClick={() => setIsSidebarOpen(true)}
           >
             <HiMenuAlt2 size={28} />
           </button>
           <TopNav />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route index element={<Product />} />
              <Route path="products" element={<Product />} />
              <Route path="users" element={<div className="p-20 bg-white rounded-[3rem] shadow-sm text-center font-black text-3xl uppercase tracking-tighter text-gray-300">Manage Users (System View)</div>} />
              <Route path="orders" element={<div className="p-20 bg-white rounded-[3rem] shadow-sm text-center font-black text-3xl uppercase tracking-tighter text-gray-300">Global Orders (System View)</div>} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="profile" element={<ProfileView />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
