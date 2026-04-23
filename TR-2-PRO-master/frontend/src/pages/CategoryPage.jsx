import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../redux/productSlice';
import ProductCard from '../components/Home/ProductCard';
import Footer from '../components/Home/Footer';
import Navbar from '../components/Home/Navbar';
import CategoryHero from '../components/Home/CategoryHero';

function CategoryPage({ categoryName }) {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // If products are empty, fetch them
    if (product.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch, product.length]);

  useEffect(() => {
    if (product.length > 0) {
      const filtered = product.filter(
        (item) => item.category && item.category.toLowerCase() === categoryName.toLowerCase()
      );
      
      // Group products by subcategory
      const grouped = filtered.reduce((acc, current) => {
        const sub = current.subcategory || 'General';
        if (!acc[sub]) {
          acc[sub] = [];
        }
        acc[sub].push(current);
        return acc;
      }, {});
      
      setFilteredProducts(grouped);
    }
  }, [product, categoryName]);

  const hasProducts = Object.keys(filteredProducts).length > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CategoryHero category={categoryName} />
      <div className="flex-1 max-w-screen-xl mx-auto px-6 pb-24 w-full">
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : hasProducts ? (
          Object.keys(filteredProducts).map((subcat) => (
            <div key={subcat} className="mb-24">
              <div className="flex flex-col items-center mb-16 group">
                <div className="flex items-center gap-8 mb-4">
                  <div className="h-[1px] w-12 md:w-24 bg-gray-200 group-hover:w-32 group-hover:bg-black transition-all duration-700"></div>
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter text-center">{subcat}</h2>
                  <div className="h-[1px] w-12 md:w-24 bg-gray-200 group-hover:w-32 group-hover:bg-black transition-all duration-700"></div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] opacity-100 transition-opacity duration-700">Exclusive Collection</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {filteredProducts[subcat].map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-xl font-bold text-gray-700 mb-1">No Products Found</h2>
            <p className="text-gray-500">We currently do not have any products listed under {categoryName}. Check back later!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
