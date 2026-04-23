import React from 'react';
import { Link } from 'react-router-dom';

function FitGuide() {
  const images = {
    Men: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80',
    Women: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    Kids: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=80',
  };

  const links = {
    Men: '/men',
    Women: '/women',
    Kids: '/kids',
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center tracking-[0.2em] text-3xl mb-12 font-light uppercase">
        FIT GUIDE
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {['Men', 'Women', 'Kids'].map((label) => (
          <Link key={label} className="relative group overflow-hidden rounded-3xl" to={links[label]}>
            <div className="h-[500px] w-full relative">
              <img
                className="h-full w-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                src={images[label]}
                alt={`${label} Fashion`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-90 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white text-black font-bold px-10 py-3 rounded-full shadow-2xl uppercase tracking-widest text-sm transform group-hover:-translate-y-2 transition-transform duration-300">
                  {label}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FitGuide;
