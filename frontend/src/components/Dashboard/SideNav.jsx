import React from 'react';
import NavLink from './NavLink';
import { LuUsers, LuUser, LuPackage, LuShoppingBag, LuLayoutDashboard, LuX } from "react-icons/lu";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import logo from '../../assets/logo_vyntra.png';

function SideNav({ isOpen, setIsOpen }) {
  const { role } = useSelector((state) => state.user);

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      {/* Brand Logo Section */}
      <div className="h-32 flex items-center justify-center px-8 border-b border-white/5">
        <div className="bg-white px-6 py-3 rounded-2xl shadow-2xl group transition-all hover:scale-105 duration-500 overflow-hidden border border-white/10">
             <img src={logo} alt="VYNTRA Logo" className="h-10 md:h-12 object-contain" />
        </div>
      </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-gray-400 hover:text-white transition-colors">
          <LuX size={24} />
        </button>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
        <div className="px-4 mb-4">
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Main Overview</p>
        </div>
        
        <NavLink to="/dashboard" text="Dashboard Overview" icon={<LuLayoutDashboard/>} />

        <div className="px-4 mt-8 mb-4">
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Management</p>
        </div>

        {role === 'admin' ? (
          <>
            <NavLink to="/dashboard/products" text="Inventory Fleet" icon={<RiAlignItemLeftLine/>} />
            <NavLink to="/dashboard/users" text="Registered Users" icon={<LuUsers/>}/>
            <NavLink to="/dashboard/orders" text="Supply Orders" icon={<LuPackage/>}/>
          </>
        ) : (
          <>
            <NavLink to="/dashboard/my-orders" text="My Purchase History" icon={<LuShoppingBag/>} />
          </>
        )}

        <div className="px-4 mt-8 mb-4">
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Personal</p>
        </div>
        <NavLink to="/dashboard/profile" text="Secure Profile" icon={<LuUser/>}/>
      </nav>

      {/* Footer / Status */}
      <div className="p-6 bg-black/20 border-t border-white/5">
         <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-white/10 flex items-center justify-center text-xs font-black uppercase overflow-hidden">
               {localStorage.getItem('profilePic') ? (
                 <img 
                   src={`${import.meta.env.VITE_API_URL}/${localStorage.getItem('profilePic')}`} 
                   alt="Profile" 
                   className="w-full h-full object-cover"
                 />
               ) : (
                 localStorage.getItem('name')?.charAt(0) || 'U'
               )}
            </div>
            <div className="min-w-0">
               <p className="text-sm font-bold truncate">{localStorage.getItem('name')}</p>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{role}</p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default SideNav;
