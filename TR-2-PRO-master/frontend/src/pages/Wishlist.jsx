import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { LuTrash2, LuShoppingBag, LuHeartOff } from "react-icons/lu";
import { Link } from 'react-router-dom';

function Wishlist() {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist({ id }));
  };

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist({ id: item.id }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-screen-xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase mb-2">My Wishlist</h1>
                <p className="text-gray-500 font-light">Saved items you love, ready for your collection.</p>
            </div>
            <div className="text-right">
                <span className="text-4xl font-black text-gray-200">{wishlistItems.length}</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Items</p>
            </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <LuHeartOff size={64} className="text-gray-200 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-xs">Seems like you haven't saved anything yet. Start exploring our collections!</p>
            <Link to="/" className="btn-primary px-10 py-4">Explore Trends</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50 group hover:shadow-xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <img src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL}/${item.image}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100"
                  >
                    <LuTrash2 size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight truncate">{item.name}</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-2xl font-black text-black">₹{Math.floor(item.discountPrice || item.price).toLocaleString('en-IN')}</span>
                    {(item.discountPrice && item.discountPrice < item.price) && (
                       <span className="text-xs text-gray-400 line-through font-light">₹{Math.floor(item.price).toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => moveToCart(item)}
                    className="w-full btn-primary flex items-center justify-center gap-3 py-4 hover:scale-[1.02] transform transition-all shadow-lg active:scale-95"
                  >
                    <LuShoppingBag size={18} />
                    Move to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
