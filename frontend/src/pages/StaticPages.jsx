import React from 'react';
import Footer from '../components/Home/Footer';
import Navbar from '../components/Home/Navbar';

const StaticPage = ({ title, content }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto px-6 py-20 w-full animate-fade-in">
        <h1 className="text-5xl font-black text-black mb-12 tracking-tight uppercase border-l-8 border-black pl-6">{title}</h1>
        <div className="prose prose-xl text-gray-800 leading-relaxed max-w-none font-light">
          {content}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const About = () => (
  <StaticPage 
    title="About VYNTRA" 
    content={
      <div className="space-y-8">
        <p className="text-2xl font-medium text-gray-900 leading-snug">VYNTRA is more than just a fashion destination; it's a movement towards intentional style and premium quality.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-gray-50 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">Our Vision</h2>
            <p className="text-base">We believe that fashion should be a seamless integration of modern aesthetics and sustainable practices. Our goal is to redefine the digital shopping experience by providing a curated selection of products that empower your individuality. Every piece in our collection is handpicked for its design, durability, and the story it tells.</p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">Our Heritage</h2>
            <p className="text-base">Founded in 2024, VYNTRA emerged from a desire to bridge the gap between high-end luxury and everyday accessibility. Our journey started in a small studio with a big dream: to create a platform where technology meets craftsmanship. Today, we serve thousands of customers worldwide, but our core value remains the same—Customer First, Quality Always.</p>
          </div>
        </div>

        <section className="py-10">
          <h2 className="text-3xl font-black mb-6 uppercase">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg">
             <li><strong>Curated Quality:</strong> We don't just sell products; we select experiences.</li>
             <li><strong>Global Delivery:</strong> Fast, secure, and tracked shipping to over 200 countries.</li>
             <li><strong>Ethical sourcing:</strong> We partner with manufacturers who value fair labor and environmental responsibility.</li>
             <li><strong>Expert Support:</strong> Our fashion consultants are available 24/7 to help you find your perfect fit.</li>
          </ul>
        </section>
      </div>
    } 
  />
);

export const Help = () => (
  <StaticPage 
    title="Concierge & Support" 
    content={
      <div className="space-y-10">
        <p>Our dedicated support team is here to ensure your experience with VYNTRA is nothing short of exceptional. Whether it's tracking an order or styling advice, we're just a message away.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-8 rounded-2xl hover:border-black transition-colors cursor-pointer group">
            <h3 className="font-bold mb-2 group-hover:underline uppercase tracking-widest">Order Tracking</h3>
            <p className="text-sm text-gray-500">Real-time updates on your shipment's journey.</p>
          </div>
          <div className="border border-gray-200 p-8 rounded-2xl hover:border-black transition-colors cursor-pointer group">
            <h3 className="font-bold mb-2 group-hover:underline uppercase tracking-widest">Returns</h3>
            <p className="text-sm text-gray-500">Easy 30-day returns for a stress-free experience.</p>
          </div>
          <div className="border border-gray-200 p-8 rounded-2xl hover:border-black transition-colors cursor-pointer group">
            <h3 className="font-bold mb-2 group-hover:underline uppercase tracking-widest">Sizing Help</h3>
            <p className="text-sm text-gray-500">Get the perfect fit with our detailed guides.</p>
          </div>
        </div>
      </div>
    } 
  />
);

export const Terms = () => (
  <StaticPage 
    title="Terms of Service" 
    content={
      <div className="space-y-6 text-base">
        <h2 className="text-2xl font-bold uppercase tracking-widest">1. Agreement to Terms</h2>
        <p>By accessing our website at vyntra.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        
        <h2 className="text-2xl font-bold uppercase tracking-widest">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on VYNTRA's website for personal, non-commercial transitory viewing only.</p>
        
        <h2 className="text-2xl font-bold uppercase tracking-widest">3. Order Fulfillment</h2>
        <p>All orders placed through our platform are subject to availability. We reserve the right to limit the order quantity on any item and/or to refuse service to any customer without prior notification. Prices for products are subject to change without notice.</p>
      </div>
    } 
  />
);

export const Privacy = () => (
  <StaticPage 
    title="Privacy Policy" 
    content={<p>Your privacy is important to us. We never share your personal data with third parties without your explicit consent.</p>} 
  />
);

export const Contact = () => (
  <StaticPage 
    title="Contact Us" 
    content={
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <p className="mb-4"><strong>Email:</strong> contact@ecommerce.com</p>
        <p className="mb-4"><strong>Phone:</strong> +1 (555) 000-0000</p>
        <p><strong>Address:</strong> 123 Fashion Street, New York, NY 10001</p>
      </div>
    } 
  />
);

export default About; // Default export as requested in App.jsx
