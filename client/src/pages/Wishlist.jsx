import React, { useEffect, useState } from 'react';
import {
      FaHeart,
      FaStar,
      FaTrashAlt
} from 'react-icons/fa';
import { fetchPerfumeById } from '../apis/perfume.api';
import { clearWishlist } from '../apis/wishlist.api';
import { Card, Footer, Header } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '../features/perfumeSlice';



export default function Wishlist() {

      const { wishlist } = useSelector(state => state.perfume)
      

      const dispatch = useDispatch()

      const clearWishlistHandler = async () => {
            try {
                  const response = await clearWishlist();
                  dispatch(
                        setWishlist(response.data?.list || [])
                  )
            } catch (error) {
                  console.error("Error clearing wishlist:", error);
            }
      };

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary]">


                  <Header />

                  {/* --- PAGE HEADER --- */}
                  <div className="bg-primary-white border-b border-beige-light py-10 px-6">
                        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                              <h1 className="text-4xl font-bold text-primary-black font-primary mb-2 flex items-center gap-3">
                                    <FaHeart className="text-beige-accent" /> Your Wishlist
                              </h1>
                              <p className="text-secondary-black text-sm font-secondary max-w-lg mt-2">
                                    A curated collection of your favorite signature scents and botanical extraits. Keep them here until you're ready to make them yours.
                              </p>
                        </div>
                  </div>

                  {/* --- MAIN CONTENT: WISHLIST GRID --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-6 py-12">
                        <div className="flex justify-between items-center mb-6 font-secondary">
                              <span className="text-beige-dark text-sm tracking-wide">{wishlist?.length} Items Saved</span>
                              <button
                                    onClick={clearWishlistHandler}
                                    className="text-sm text-secondary-black hover:text-primary-black underline decoration-beige-light underline-offset-4">
                                    Clear Wishlist
                              </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {
                                    wishlist
                                    && wishlist.map((perfume) => (
                                          <Card key={perfume?.perfume?._id} perfume={perfume.perfume} />
                                    ))}
                        </div>
                  </main>

                  {/* --- FOOTER --- */}
                  <Footer />
            </div>
      );
}