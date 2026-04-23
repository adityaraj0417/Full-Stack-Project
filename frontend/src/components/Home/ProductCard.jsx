import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { addToWishlist } from '../../redux/wishlistSlice';
import { HiOutlineHeart } from 'react-icons/hi2';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((s) => s.wishlist?.wishlistItems || []);
  const isInWishlist = wishlistItems.some(item => item.id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
        id : product._id,
        name : product.name,
        price : product.price,
        image : product.image,
        discountPrice : product.discountPrice
    }));
  }

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(addToWishlist({
        id : product._id,
        name : product.name,
        price : product.price,
        image : product.image,
        discountPrice : product.discountPrice
    }));
  }

  return (
    <div className="group flex flex-col justify-between bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
      <div className="relative w-full h-96 overflow-hidden bg-gray-50 flex items-center justify-center">
        {product.discountPercentage > 0 && (
          <div className="absolute top-5 left-5 bg-black text-white font-bold text-[10px] px-4 py-1.5 rounded-full shadow-2xl z-20 uppercase tracking-widest">
            {`${product.discountPercentage}% OFF`}
          </div>
        )}
        <img
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          src={product.image && product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}/${product.image}`}
          alt={product.name}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=500&auto=format&fit=crop'; }}
        />
        <div
          className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]"
        >
          <button 
            onClick={handleAddToCart} 
            className="btn-outline w-40 text-[10px] tracking-widest scale-90 group-hover:scale-100 transition-all duration-500"
          >
            Add to Bag
          </button>
          <button 
             onClick={handleWishlist}
             className={`w-40 border border-white text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 scale-90 group-hover:scale-100 ${isInWishlist ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
          >
            <HiOutlineHeart size={16} fill={isInWishlist ? 'black' : 'none'} />
            {isInWishlist ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{product.category}</span>
            <h1 className="text-xl font-bold text-gray-900 line-clamp-1 mt-1 tracking-tight">{product.name}</h1>
        </div>
        <div className="flex items-baseline gap-3 mt-4">
          <span className="text-2xl font-black text-gray-900">₹{Math.floor(product.discountPrice).toLocaleString('en-IN')}</span>
          <span className="text-sm text-gray-400 line-through font-light">₹{Math.floor(product.price).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
