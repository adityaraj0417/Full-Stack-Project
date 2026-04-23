import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

function NavLink({to, text, icon}) {
  return (
    <RouterNavLink 
      to={to} 
      end={to === '/dashboard'}
      className={({ isActive }) => `
        flex gap-4 items-center px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest
        ${isActive 
          ? 'bg-white text-black shadow-xl translate-x-2' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'}
      `}
    > 
      <span className="opacity-70">{icon}</span>
      <span>{text}</span>
    </RouterNavLink>
  )
}

export default NavLink;
