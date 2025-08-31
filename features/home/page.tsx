import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
       

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Character Image */}
          <div className="col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&crop=faces"
                alt="Anime character in urban setting"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay to make it look more anime-like */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

       

          {/* Right Character Image */}
          <div className="col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=faces&sat=2&hue=180"
                alt="Anime character with blue hair and headphones"
                className="w-full h-[500px] object-cover"
                style={{ filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-purple-500/20"></div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=faces&sat=2&hue=180"
                alt="Anime character with blue hair and headphones"
                className="w-full h-[500px] object-cover"
                style={{ filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-purple-500/20"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;