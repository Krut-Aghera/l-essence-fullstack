import React, { useState } from 'react';
import { FaHeart, FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes, FaThLarge, FaPlusCircle } from "react-icons/fa";
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import completeColoredLogo from '../assets/completeColoredLogo.png';

const Header = () => {
      const { isLoggedIn, userData } = useSelector(state => state.auth);
      const { cart } = useSelector(state => state.perfume.cartData);

      const isAdmin = userData?.role === 'admin';

      const location = useLocation();
      const navigate = useNavigate();

      const [inpurQuery, setInputQuery] = useState('');
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      const searchParams = new URLSearchParams(location.search);
      const gender = searchParams.get("gender");

      const activeClass = "text-beige-dark font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-beige-dark";
      const defaultClass = "text-secondary-black hover:text-beige-accent transition-colors duration-200";

      const isMale = gender?.toLowerCase() === "male";
      const isFemale = gender?.toLowerCase() === "female";
      const isUnisex = gender?.toLowerCase() === "unisex";
      const isGenderPage = isMale || isFemale || isUnisex;

      const queryHandler = (e) => {
            e.preventDefault();
            const query = inpurQuery.trim();
            if (query) {
                  navigate(`/perfumes?search=${query}`);
                  setInputQuery('');
                  setIsMobileMenuOpen(false);
            }
      };

      return (
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-beige-light/40 shadow-xs transition-all duration-300">
                  {/* Primary Navigation Layer */}
                  <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

                        {/* Brand Logo Wrapper */}
                        <Link to="/">
                              <img className="h-12" src={completeColoredLogo} alt="L essence logo" />
                        </Link>

                        {/* Mid Section Menu: Desktop Layout */}
                        <div className="hidden min-[901px]:flex items-center gap-8 font-medium text-[14px] tracking-wide font-['Alegreya_Sans',sans-serif]">
                              <NavLink to="/" className={`${location.pathname === "/" ? activeClass : defaultClass}`}>
                                    Home
                              </NavLink>
                              <NavLink to="/perfumes?gender=male" className={`${isMale ? activeClass : defaultClass}`}>
                                    Male
                              </NavLink>
                              <NavLink to="/perfumes?gender=female" className={`${isFemale ? activeClass : defaultClass}`}>
                                    Female
                              </NavLink>
                              <NavLink to="/perfumes?gender=unisex" className={`${isUnisex ? activeClass : defaultClass}`}>
                                    Unisex
                              </NavLink>
                              <NavLink to="/perfumes" className={`${location.pathname === "/perfumes" && !location.search ? activeClass : defaultClass}`}>
                                    Explore
                              </NavLink>
                        </div>

                        {/* Right-Side Search Core & Utility Actions Matrix */}
                        <div className="flex items-center gap-2 sm:gap-4 text-secondary-black grow min-[901px]:grow-0 justify-end">
                              {/* Omnipresent Search Bar Container */}
                              <form onSubmit={queryHandler} className="relative max-w-45 sm:max-w-52.5 w-full">
                                    <input
                                          onChange={e => setInputQuery(e.target.value)}
                                          value={inpurQuery}
                                          type="text"
                                          placeholder="Search notes, collections..."
                                          className="bg-secondary-white text-xs font-['Roboto',sans-serif] px-4 py-2 pl-9 rounded-xl focus:outline-none border border-transparent focus:border-beige-dark w-full transition-all duration-200 text-primary-black placeholder:text-beige-dark/70"
                                    />
                                    <button type='submit' className="absolute left-3 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer text-beige-dark hover:text-primary-black transition-colors">
                                          <FaSearch className="text-[11px]" />
                                    </button>
                              </form>

                              {/* Icon Operations Toolbar */}
                              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                    <Link to='/user/wishlist' aria-label="Wishlist" className="hover:text-beige-accent p-2 transition-colors relative group">
                                          <FaHeart className="text-base group-hover:scale-110 transition-transform duration-200" />
                                    </Link>

                                    <Link
                                          to={isLoggedIn ? '/user/account' : '/auth/login'}
                                          aria-label="Account"
                                          className="hover:text-beige-accent p-2 transition-colors relative group"
                                    >
                                          <FaUser className="text-base group-hover:scale-110 transition-transform duration-200" />
                                    </Link>

                                    <Link to='/user/cart' state={{ from: location.pathname }} aria-label="Shopping Bag Container" className="hover:text-beige-accent p-2 transition-colors relative group">
                                          <FaShoppingBag className="text-base group-hover:scale-110 transition-transform duration-200" />
                                          <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-bold min-w-3.75 h-3.75 px-1 rounded-full flex items-center justify-center font-['Roboto',sans-serif] shadow-xs scale-90">
                                                {cart?.length}
                                          </span>
                                    </Link>

                                    {/* Responsive Mobile Menu Callout Toggle Button */}
                                    <button
                                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                          className="min-[901px]:hidden p-2 text-primary-black hover:text-beige-accent transition-colors cursor-pointer"
                                          aria-label="Toggle Navigation Container Menu"
                                    >
                                          {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                                    </button>
                              </div>
                        </div>
                  </nav>

                  {/* Secondary Context Control Layer: Rendered if Admin Role Validated */}
                  {isAdmin && (
                        <div className="hidden min-[901px]:block border-t border-beige-light/30 bg-secondary-white/40 font-['Alegreya_Sans',sans-serif]">
                              <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-end gap-3">
                                    <Link to='/admin/dashboard' className="inline-block">
                                          <button className='flex items-center justify-center py-1.5 px-4 gap-2 text-xs font-bold uppercase tracking-wider text-primary-white bg-green-dark hover:bg-primary-black duration-300 ease-in-out cursor-pointer rounded-lg shadow-xs hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0'>
                                                <FaThLarge className="text-[10px]" /> Dashboard Panel
                                          </button>
                                    </Link>
                                    <Link to="/admin/perfume" className="inline-block">
                                          <button className='flex items-center justify-center py-1.5 px-4 gap-2 text-xs font-bold uppercase tracking-wider text-primary-white bg-beige-dark hover:bg-secondary-black duration-300 ease-in-out cursor-pointer rounded-lg shadow-xs hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0'>
                                                <FaPlusCircle className="text-[10px]" /> Register New Perfume
                                          </button>
                                    </Link>
                              </div>
                        </div>
                  )}

                  {/* Fully Interactive Mobile Drawer Panel Overlay Menu */}
                  {isMobileMenuOpen && (
                        <div className="min-[901px]:hidden border-t border-beige-light/50 bg-white font-['Alegreya_Sans',sans-serif]">
                              <div className="px-6 py-4 flex flex-col gap-4 font-medium text-sm tracking-wide">
                                    <NavLink
                                          to="/"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={({ isActive }) => `${isActive ? 'text-beige-dark font-bold pl-2 border-l-2 border-beige-dark' : 'text-secondary-black'} py-1`}
                                    >
                                          Home
                                    </NavLink>
                                    <NavLink
                                          to="/perfumes?gender=male"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={() => `${isMale ? 'text-beige-dark font-bold pl-2 border-l-2 border-beige-dark' : 'text-secondary-black'} py-1`}
                                    >
                                          Male Catalog
                                    </NavLink>
                                    <NavLink
                                          to="/perfumes?gender=female"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={() => `${isFemale ? 'text-beige-dark font-bold pl-2 border-l-2 border-beige-dark' : 'text-secondary-black'} py-1`}
                                    >
                                          Female Catalog
                                    </NavLink>
                                    <NavLink
                                          to="/perfumes?gender=unisex"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={() => `${isUnisex ? 'text-beige-dark font-bold pl-2 border-l-2 border-beige-dark' : 'text-secondary-black'} py-1`}
                                    >
                                          Unisex Collection
                                    </NavLink>
                                    <NavLink
                                          to="/perfumes"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={() => `${location.pathname === "/perfumes" && !location.search ? 'text-beige-dark font-bold pl-2 border-l-2 border-beige-dark' : 'text-secondary-black'} py-1`}
                                    >
                                          Explore All
                                    </NavLink>

                                    {/* Mobile Responsive Admin Actions */}
                                    {isAdmin && (
                                          <div className="pt-4 border-t border-beige-light/60 flex flex-col gap-3">
                                                <div className="text-[11px] font-bold uppercase tracking-widest text-beige-dark/80 mb-1">
                                                      Management Systems
                                                </div>
                                                <Link to='/admin/dashboard' onClick={() => setIsMobileMenuOpen(false)}>
                                                      <button className='flex items-center justify-center py-2.5 px-4 gap-2 text-xs font-bold uppercase tracking-wider text-primary-white bg-green-dark active:bg-primary-black w-full rounded-xl shadow-xs duration-150'>
                                                            <FaThLarge /> Access Dashboard
                                                      </button>
                                                </Link>
                                                <Link to="/admin/perfume" onClick={() => setIsMobileMenuOpen(false)}>
                                                      <button className='flex items-center justify-center py-2.5 px-4 gap-2 text-xs font-bold uppercase tracking-wider text-primary-white bg-beige-dark active:bg-secondary-black w-full rounded-xl shadow-xs duration-150'>
                                                            <FaPlusCircle /> Register New Product
                                                      </button>
                                                </Link>
                                          </div>
                                    )}
                              </div>
                        </div>
                  )}
            </header>
      );
};

export default Header;