import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuPackage, LuTruck, LuCheckCircle, LuClock } from "react-icons/lu";

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user-orders/${userId}`);
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchOrders();
  }, [userId]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Order Tracking</h1>
          <p className="text-gray-500 font-light">Monitor your luxury shipments in real-time.</p>
        </div>
        <div className="flex gap-4">
             <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                 <LuPackage className="text-gray-400" size={20}/>
                 <div className="leading-none">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="font-bold text-lg">{orders.length}</p>
                 </div>
             </div>
             <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                 <LuClock className="text-blue-500" size={20}/>
                 <div className="leading-none">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active</p>
                    <p className="font-bold text-lg">{orders.filter(o => o.status !== 'Completed').length}</p>
                 </div>
             </div>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex gap-6 items-center">
                  <div className="p-6 bg-gray-50 rounded-[2rem] group-hover:bg-gray-900 group-hover:text-white transition-colors duration-500">
                    <LuPackage className="text-blue-500 group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 tracking-tight">#{order._id.substring(0, 8).toUpperCase()}</h3>
                    <p className="text-sm text-gray-400">{new Date(order.orderDate).toLocaleDateString()} • {order.items.length} Items</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 animate-pulse'
                  }`}>
                    {order.status}
                  </span>
                  <p className="font-black text-2xl text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="mt-10 pt-10 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tracking ID:</p>
                      <p className="text-sm font-bold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 font-mono tracking-wider">TP-{order._id.substring(order._id.length - 6).toUpperCase()}</p>
                  </div>
                  <div className="flex gap-4">
                      <button className="text-xs font-bold uppercase tracking-widest bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-black transition-colors">Details</button>
                      <button className="text-xs font-bold uppercase tracking-widest border border-gray-200 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">Help</button>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
             <LuPackage size={64} className="mx-auto text-gray-200 mb-6" />
             <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
             <p className="text-gray-500 mb-8">You haven't placed any orders yet. Start your luxury journey now!</p>
             <button onClick={() => navigate('/')} className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">Go Shopping</button>
          </div>
        )}
      </div>
      
      {/* Search Order Feature */}
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Track Guest Order</h2>
            <p className="text-gray-400 font-light mb-8">Enter your order ID and email to check the status without signing in.</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <input className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all flex-1" placeholder="Order ID" />
                <button className="bg-white text-black font-bold uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-gray-100 transition-colors">Track</button>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
}

export default MyOrders;
