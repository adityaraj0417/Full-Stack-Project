import React from 'react';

function CategoryHero({ category }) {
  const content = {
    men: {
      title: "Gentlemen's Edit",
      subtitle: "Sharp tailoring meets contemporary streetwear for the modern man.",
      img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=2000",
      accent: "Authentic & Sharp"
    },
    women: {
      title: "Women's Couture",
      subtitle: "Elevate your everyday with our curated luxury collection.",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000",
      accent: "Timeless & Elegant"
    },
    kids: {
      title: "Mini Collection",
      subtitle: "Comfortable, playful, and stylish pieces for your little adventurers.",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=2000",
      accent: "Comfort & Joy"
    }
  };

  const data = content[category.toLowerCase()] || content.men;

  return (
    <div className="w-full bg-white pb-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="h-[400px] md:h-[500px] rounded-[3.5rem] overflow-hidden relative shadow-2xl border-[10px] border-white">
          <img src={data.img} alt={data.title} className="w-full h-full object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10 md:px-24">
             <p className="text-gray-300 font-bold uppercase tracking-[0.5em] mb-4 text-[10px] md:text-sm">
                {data.accent}
             </p>
             <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tighter uppercase mb-4 leading-none">
                {data.title}
             </h1>
             <p className="text-gray-300 text-lg md:text-xl font-light max-w-lg mb-8 tracking-wide">
                {data.subtitle}
             </p>
             <div className="h-1.5 w-24 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryHero;
