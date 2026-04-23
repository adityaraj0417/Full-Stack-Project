import React, { useState } from 'react';
import Slider from 'react-slick';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Hero.css';

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
    afterChange: (current) => setActiveSlide(current)
  };

  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=2000',
      // tag: "NEW ARRIVAL • 2024",
      title: "EXTENDING STYLE",
      words: ["LUXURY FASHION REDEFINED"],
      subtitle: "Discover the new seasonal collection for men. Crafted for the modern gentleman.",
      cta: "Explore Men",
    },
    {
      img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=2000',
      tag: "COLLECTION • ACCESSORIES",
      title: "PURE ELEGANCE",
      words: ["TIMELESS ACCESSORIES"],
      subtitle: "Premium bags and watches for every occasion. Elegance in every detail.",
      cta: "Explore Accessories",
    },
    {
      img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000',
      tag: "EXCLUSIVE • COUTURE",
      title: "URBAN CHIC",
      words: ["SIGNATURE COUTURE"],
      subtitle: "Curated styles for the modern woman. Sophistication meets urban life.",
      cta: "Explore Women",
    },
  ];

  return (
    <div className="w-full bg-white pb-16">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
        <div className="rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] relative bg-black border-[12px] border-white ring-1 ring-gray-100">
          <Slider {...settings} className="hero-slider">
            {slides.map((slide, index) => (
              <div key={index} className="outline-none relative group overflow-hidden">
                <div className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
                  {/* Ken Burns Image Container */}
                  <div className={`absolute inset-0 w-full h-full transition-transform duration-[10000ms] ${activeSlide === index ? 'scale-110' : 'scale-100'}`}>
                    <img 
                      src={slide.img} 
                      alt={slide.title} 
                      className="w-full h-full object-cover object-center opacity-85" 
                    />
                  </div>
                  
                  {/* Sophisticated Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex flex-col justify-center px-10 md:px-32">
                    
                    <div className="hero-content-wrapper max-w-2xl relative">
                      {/* Vertical Accent Line */}
                      <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent hidden md:block"></div>

                      <p className="description text-white/50 font-black uppercase tracking-[0.8em] mb-6 text-[10px] md:text-xs">
                        {slide.tag}
                      </p>
                      
                      <div className="title-area min-h-[140px] md:min-h-[220px] flex flex-col justify-center mb-8">
                        <h2 className="text-white text-5xl md:text-8xl font-extralight tracking-tight leading-[0.9] uppercase">
                          <span className="block mb-2">{slide.title}</span>
                          <span className="text-white/40 block font-thin tracking-widest text-3xl md:text-6xl italic min-h-[1.1em] leading-tight">
                            {activeSlide === index && (
                              <Typewriter
                                words={slide.words}
                                loop={0}
                                cursor={false}
                                typeSpeed={80}
                                deleteSpeed={50}
                                delaySpeed={3000}
                              />
                            )}
                          </span>
                        </h2>
                      </div>

                      <p className="subtitle text-gray-400 text-lg md:text-xl mb-12 max-w-lg font-light tracking-wide leading-relaxed border-l-2 border-white/5 pl-8">
                        {slide.subtitle}
                      </p>

                      <div className="flex items-center gap-8">
                        <Link 
                          to={slide.cta.includes('Men') ? '/men' : slide.cta.includes('Women') ? '/women' : '/men'} 
                          className="btn-cta relative px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-transparent hover:text-white border-2 border-white transition-all duration-500 overflow-hidden group/btn shadow-[0_20px_40px_-5px_rgba(255,255,255,0.2)]"
                        >
                          <span className="relative z-10">{slide.cta}</span>
                        </Link>
                        
                        <div className="hidden md:flex items-center gap-4 group/scroll">
                           <div className="w-12 h-[1px] bg-white/20 group-hover/scroll:w-20 transition-all duration-500"></div>
                           <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest cursor-default">Scroll to Explore</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Hero;
