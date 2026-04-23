import React from 'react';
import footerColumns from './footerData';
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_vyntra.png';

function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          
          {/* Brand & Social Section */}
          <div className="lg:col-span-2">
            <div className="mb-8 inline-block bg-white px-6 py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500">
               <img src={logo} alt="VYNTRA" className="h-10 md:h-12 object-contain" />
            </div>
            <p className="text-gray-400 mb-10 max-w-sm leading-relaxed text-base font-light">
              Elevating your lifestyle with premium fashion and exclusive collections. Experience the future of online shopping with VYNTRA.
            </p>
            <div className="flex gap-5">
              {[
                { icon: <FaInstagram size={18} />, color: "hover:bg-pink-600", label: "Instagram" },
                { icon: <FaFacebookF size={18} />, color: "hover:bg-blue-600", label: "Facebook" },
                { icon: <FaTwitter size={18} />, color: "hover:bg-sky-500", label: "Twitter" },
                { icon: <FaYoutube size={18} />, color: "hover:bg-red-600", label: "Youtube" },
                { icon: <FaLinkedinIn size={18} />, color: "hover:bg-blue-700", label: "Linkedin" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className={`w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-500 transform hover:-translate-y-2 ${social.color} hover:rotate-[360deg] shadow-lg`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          {footerColumns.map((item, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-[0.2em] border-b border-gray-800 pb-3 inline-block">{item.title}</h3>
              <ul className="space-y-4">
                {item.links.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      className="text-gray-500 hover:text-white transition-all duration-300 text-sm font-light flex items-center group" 
                      to={link.url}
                    >
                      <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-white mr-0 group-hover:mr-2"></span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-900 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
          <p>© {new Date().getFullYear()} VYNTRA EXCLUSIVE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-10 mt-6 md:mt-0 items-center">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            <Link to="/help" className="hover:text-white transition-colors duration-300">Accessibility</Link>
            <div className="flex items-center space-x-2 text-gray-700 ml-4">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;