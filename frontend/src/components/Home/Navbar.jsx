import React, { useState } from 'react';
import logo from '../../assets/logo_vyntra.png';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUser, HiMenu, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import Navitems from './Navitems';
import { NavData } from './data';
import { GoSignOut } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../../redux/userSlice';

function Navbar() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const name = localStorage.getItem('name');
 const dispatch = useDispatch();
 const location = useLocation();
 const { totalQuantity } = useSelector((state) => state.cart);
 const wishlistQuantity = useSelector((s) => s.wishlist?.totalWishlistQuantity || 0);
 
 const handleLogOut = () => {
  dispatch(logout());
 };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        {/* first row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* Hamburger Button for Mobile */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>

            <Link to="/" className="flex items-center group py-1">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-500">
                <img src={logo} className="h-8 md:h-10 object-contain transform group-hover:scale-105 transition-transform duration-500" alt="VYNTRA Logo" />
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-12 hidden lg:block">
            <div className="relative">
              <input
                className="w-full pl-5 pr-10 py-2.5 bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-full text-sm transition-all duration-300 outline-none shadow-inner"
                type="text"
                placeholder="Search premium products..."
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* User Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-3 text-gray-600 hover:text-black transition-all duration-300 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full group-hover:shadow-lg transition-all duration-500 overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-black/5">
                  {localStorage.getItem('profilePic') ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL}/${localStorage.getItem('profilePic')}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <HiOutlineUser size={22} />
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</span>
                  <span className="text-sm font-black tracking-tight truncate max-w-[80px]">{name || 'Guest'}</span>
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[100] p-6 transform translate-y-4 group-hover:translate-y-0">
                <div className="flex flex-col space-y-2 text-left">
                  <Link to="/dashboard" className="px-6 py-3 hover:bg-black hover:text-white rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest flex items-center justify-between group/item text-gray-600">
                    Dashboard
                    <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                  </Link>
                  <Link to="/dashboard/profile" className="px-6 py-3 hover:bg-black hover:text-white rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest flex items-center justify-between group/item text-gray-600">
                    My Profile
                    <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                  </Link>
                  <Link to="/dashboard/my-orders" className="px-6 py-3 hover:bg-black hover:text-white rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest flex items-center justify-between group/item text-gray-600">
                    Track Orders
                    <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                  </Link>
                  <div className="h-[1px] bg-gray-100 my-2"></div>
                  <button onClick={handleLogOut} className="px-6 py-3 hover:bg-red-600 hover:text-white rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest flex items-center justify-between group/item text-red-600">
                    Sign Out
                    <GoSignOut className="group-hover/item:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="relative text-gray-600 hover:text-black transition-all duration-300 group">
              <div className="p-2 md:p-2.5 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                <HiOutlineHeart size={24} />
              </div>
              {wishlistQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 md:h-6 md:w-6 text-[10px] font-black text-white bg-black rounded-full border-2 border-white shadow-xl">
                  {wishlistQuantity}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="relative text-gray-600 hover:text-black transition-all duration-300 group">
              <div className="p-2 md:p-2.5 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                <HiOutlineShoppingBag size={24} />
              </div>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 md:h-6 md:w-6 text-[10px] font-black text-white bg-black rounded-full border-2 border-white shadow-xl animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links (Second Row) */}
        <div className="hidden lg:flex justify-center items-center border-t border-gray-50 pt-4">
          <ul className="flex space-x-12">
            {NavData.map((items, idx) => {
              const isActive = location.pathname === items.url;
              return (
                <li key={idx} className="relative group/nav">
                  <Link 
                    to={items.url} 
                    className={`text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 relative pb-1 ${
                      isActive ? 'text-black' : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {items.text}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-black rounded-full transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0 group-hover/nav:w-1/2'
                    }`}></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Sidebar/Menu Selection */}
        <div className={`lg:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
           <div className="flex flex-col h-full p-10">
              <div className="flex justify-between items-center mb-16">
                 <img src={logo} className="h-10" alt="Logo" />
                 <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-50 rounded-full">
                    <HiX size={32} />
                 </button>
              </div>
              <ul className="flex flex-col space-y-8">
                 {NavData.map((items, idx) => {
                    const isActive = location.pathname === items.url;
                    return (
                       <li key={idx}>
                          <Link 
                            to={items.url} 
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-4xl font-black uppercase tracking-tighter transition-all ${isActive ? 'text-black translate-x-4' : 'text-gray-300 hover:text-black'}`}
                          >
                             {items.text}
                          </Link>
                       </li>
                    );
                 })}
              </ul>
              <div className="mt-auto pt-10 border-t border-gray-100 flex flex-col gap-6">
                 <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-500">My Dashboard</Link>
                 <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-500">My Cart</Link>
                 <button onClick={() => { handleLogOut(); setIsMenuOpen(false); }} className="text-xs font-bold uppercase tracking-widest text-red-500 text-left">Sign Out</button>
              </div>
           </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
