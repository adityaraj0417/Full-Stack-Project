// CartItem.js
import React from 'react';

const CartItem = ({ item, onIncrease, onDecrease }) => {
  
  console.log(item)
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-gray-100 gap-6 group hover:bg-gray-50/50 transition-all rounded-2xl px-4">
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={`${import.meta.env.VITE_API_URL}/${item.image}`}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-black tracking-tight text-gray-900 group-hover:text-black transition-colors">{item.name}</h2>
          <div className="flex gap-4 mt-1">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Size: {item.size}</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Color: {item.color}</p>
          </div>
          <div className="flex gap-4 mt-4 items-center">
             <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
             <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">In Stock</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full md:w-auto gap-12">
        <div className="flex items-center bg-gray-100/50 rounded-2xl p-1 border border-gray-100">
          <button
            className="h-10 w-10 flex items-center justify-center text-gray-900 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"
            onClick={() => onDecrease(item.id)}
          >
            -
          </button>
          <span className="px-6 text-sm font-black">{item.quantity}</span>
          <button
            className="h-10 w-10 flex items-center justify-center text-gray-900 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
          <p className="text-xl font-black text-gray-900">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </p>
        </div>

        <button
          className="h-10 w-10 flex items-center justify-center bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-full transition-all group/del active:scale-90"
          onClick={() => onDecrease(item.id)}
        >
          <span className="text-xl leading-none">×</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;