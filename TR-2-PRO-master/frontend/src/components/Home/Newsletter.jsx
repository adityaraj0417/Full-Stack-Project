import React from 'react';

function Newsletter() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-16 text-white my-12 rounded-3xl mx-4 md:mx-auto max-w-screen-xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
          Get the latest updates on new products, exclusive discounts, and upcoming sales tailored directly for you.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="flex-1 px-6 py-4 rounded-full text-black outline-none focus:ring-4 focus:ring-blue-500/50 shadow-inner"
            required
          />
          <button 
            type="submit" 
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-lg"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 tracking-wide">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
}

export default Newsletter;
