import { Link } from 'react-router-dom';
import large from '../../assets/fitSection/bigmenimge.jpg';
import all_products from '../../assets/all_product';
function GridSection() {
  const topFourImage = all_products.slice(0, 4);
  console.log(topFourImage);
  return (
    <div className="mx-auto px-8 py-4">
      <h1 className="text-center mb-12 text-2xl font-normal leading-wide tracking-[0.2em] uppercase">
        STYLISH PICKS FOR EVERY OCCASION
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:grid-rows-2">
        <Link to="/men" id="first_section" className="md:col-span-2 lg:col-span-2 lg:row-span-2 group overflow-hidden rounded-3xl h-[400px] md:h-auto">
          <div className="relative h-full">
            <img src={large} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
              <span className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs">View Men's</span>
            </div>
          </div>
        </Link>
        {topFourImage.map((product, index) => (
          <Link key={index} to={index % 2 === 0 ? "/women" : "/kids"} className='relative group overflow-hidden rounded-2xl'>
            <img src={product.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
               <span className="bg-white text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px]">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GridSection;
