import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LuUser, LuMapPin, LuGlobe, LuCreditCard, LuX, LuSmartphone, LuWallet } from "react-icons/lu";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const CheckoutModal = ({ open, onClose, totalAmount, items }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!open) return null;

  const handleFormSubmit = async (data) => {
    setLoading(true);
    const userId = localStorage.getItem('userId');
    
    const orderData = {
      items,
      totalAmount,
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      },
      userId,
      paymentMethod
    };

    try {
      if (paymentMethod === 'card') {
         // Create Stripe Session
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData), 
         });
         const session = await response.json();
         if (session.url) window.location.href = session.url;
      } else {
        // Direct order for COD/UPI
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-order`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(orderData),
        });
        if (response.ok) {
           toast.success('Order Placed Successfully!');
           dispatch(clearCart());
           navigate('/dashboard/my-orders');
           onClose();
        }
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 z-10 p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
          <LuX size={16} />
        </button>

        {/* Form Container */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[85vh]">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Secure Checkout</h2>
            <p className="text-gray-400 font-light mt-1">Complete your purchase details below.</p>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">First Name</label>
                <div className="relative">
                  <LuUser className="absolute left-4 top-4 text-gray-400" size={16} />
                  <input {...register('firstName', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-black transition-all outline-none" placeholder="Aadi" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Last Name</label>
                <div className="relative">
                  <LuUser className="absolute left-4 top-4 text-gray-400" size={16} />
                  <input {...register('lastName', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-black transition-all outline-none" placeholder="Sir" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Delivery Address</label>
              <div className="relative">
                <LuMapPin className="absolute left-4 top-4 text-gray-400" size={16} />
                <input {...register('streetAddress', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-black transition-all outline-none" placeholder="Street, Building Name" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input {...register('city', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="City" />
              <input {...register('state', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="State" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input {...register('zipCode', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="Zip Code" />
              <div className="relative">
                 <LuGlobe className="absolute left-4 top-4 text-gray-400" size={16} />
                 <input {...register('country', { required: true })} className="w-full bg-gray-50 border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="Country" />
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Summary & Payment */}
        <div className="w-full md:w-[40%] bg-gray-900 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-8 tracking-tight">Payment Options</h3>
            <div className="space-y-3">
              {[
                { id: 'card', name: 'Credit/Debit Card', icon: <LuCreditCard /> },
                { id: 'upi', name: 'UPI Payment', icon: <LuSmartphone /> },
                { id: 'cod', name: 'Cash on Delivery', icon: <LuWallet /> }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    paymentMethod === method.id ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/30 text-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {method.icon}
                    <span className="text-xs font-bold uppercase tracking-wider">{method.name}</span>
                  </div>
                  {paymentMethod === method.id && <div className="h-2 w-2 bg-black rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Total Payable</p>
                <p className="text-4xl font-black">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <button
              form="checkout-form"
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Place Order`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
