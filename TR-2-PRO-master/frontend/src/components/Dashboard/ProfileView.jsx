import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LuUser, LuMail, LuShieldCheck, LuPackage, LuMapPin, LuSettings, LuCamera } from "react-icons/lu";
import { updateUserProfile } from '../../redux/userSlice';

function ProfileView() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const profilePic = useSelector((state) => state.user.profilePic);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);
      await dispatch(updateUserProfile(formData));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl overflow-hidden border-4 border-white ring-1 ring-gray-100">
             {profilePic ? (
               <img 
                 src={`${import.meta.env.VITE_API_URL}/${profilePic}`} 
                 alt="Profile" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
               />
             ) : (
               name ? name.charAt(0).toUpperCase() : 'U'
             )}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <LuCamera className="text-white" size={32} />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{name || 'User Name'}</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-tighter w-fit mx-auto md:mx-0">Verified Member</span>
          </div>
          <p className="text-gray-500 font-light flex items-center justify-center md:justify-start gap-2">
            <LuMail size={16} /> {email || 'user@example.com'}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">Edit Profile</button>
            <button className="bg-white text-black border border-gray-200 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">Manage Security</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <LuPackage className="text-gray-900 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-1 tracking-tight">Active Orders</h3>
          <p className="text-gray-500 text-sm font-light">You have 0 active shipments in transit.</p>
          <button className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-900 hover:underline">View All</button>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <LuMapPin className="text-gray-900 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-1 tracking-tight">Address Book</h3>
          <p className="text-gray-500 text-sm font-light">Manage your primary delivery locations.</p>
          <button className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-900 hover:underline">Manage</button>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <LuSettings className="text-gray-900 mb-4" size={32} />
          <h3 className="font-bold text-lg mb-1 tracking-tight">Preferences</h3>
          <p className="text-gray-500 text-sm font-light">Update your notification and privacy settings.</p>
          <button className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-900 hover:underline">Open</button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Login Security</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl"><LuShieldCheck className="text-green-600" size={24}/></div>
              <div>
                <p className="font-bold text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-gray-400">Keep your account extra secure.</p>
              </div>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">Enable</button>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl"><LuUser className="text-blue-600" size={24}/></div>
              <div>
                <p className="font-bold text-sm">Session History</p>
                <p className="text-xs text-gray-400">Manage your active logins across devices.</p>
              </div>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
