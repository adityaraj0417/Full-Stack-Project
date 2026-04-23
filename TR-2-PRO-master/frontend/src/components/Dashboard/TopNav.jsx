import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { LuLogOut, LuHome } from "react-icons/lu";

function TopNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogOut = async() => {
    await dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='flex-1 flex items-center justify-between min-w-0'>
      <div className="flex flex-col">
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:block">Active Session</p>
         <h1 className='text-sm md:text-xl font-black text-gray-900 tracking-tight truncate'>
           Howdy, {localStorage.getItem('name')}
         </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          to="/" 
          className="p-2.5 md:px-6 md:py-2.5 bg-gray-50 text-gray-600 rounded-full hover:bg-black hover:text-white transition-all flex items-center gap-2 group shadow-sm"
        >
          <LuHome size={18} className="group-hover:scale-110 transition-transform" />
          <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Store</span>
        </Link>
        <button 
          onClick={handleLogOut}
          className="p-2.5 md:px-6 md:py-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 group shadow-sm"
        >
          <LuLogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">End Session</span>
        </button>
      </div>
    </div>
  )
}

export default TopNav
