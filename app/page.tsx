
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { AppLayout } from '@/layout';
import { rickandmorty } from '@/public/assets';

export default function Home() {


  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Rick and Morty Universe
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore the chaotic multiverse of Rick and Morty. Discover characters, episodes, and locations from across infinite dimensions.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
       
            <Link
            href={"/characters"} 
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-green-400 hover:shadow-2xl hover:shadow-green-400/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
           
            >
              <div className="relative overflow-hidden">
                <Image 
                  src={rickandmorty} 
                  className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                  alt="Rick and Morty Characters" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Characters
                </h2>
                <p className="text-gray-400 text-sm lg:text-base">
                  Meet the wild cast of characters across the multiverse
                </p>
                <div className="mt-4 flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Explore Characters</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

      
            <Link
            href={"/episodes"} 
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-green-400 hover:shadow-2xl hover:shadow-green-400/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
              
            >
              <div className="relative overflow-hidden">
                <Image 
                  src={rickandmorty} 
                  className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                  alt="Rick and Morty Episodes" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Episodes
                </h2>
                <p className="text-gray-400 text-sm lg:text-base">
                  Dive into interdimensional adventures and chaos
                </p>
                <div className="mt-4 flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Browse Episodes</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

          
            <Link
           href={"/locations"}  
              className="group md:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-green-400 hover:shadow-2xl hover:shadow-green-400/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
             
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative overflow-hidden lg:w-80">
                  <Image 
                    src={rickandmorty} 
                    className="w-full h-48 lg:h-full lg:w-80 object-cover group-hover:scale-110 transition-transform duration-300" 
                    alt="Rick and Morty Locations" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/60 lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900/80"></div>
                </div>
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center">
                  <h2 className="text-2xl lg:text-4xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                    Locations
                  </h2>
                  <p className="text-gray-400 text-sm lg:text-lg mb-6 max-w-2xl">
                    Discover the infinite realms and dimensions where Rick and Morty&#39;s adventures unfold. From Earth C-137 to the Citadel of Ricks.
                  </p>
                  <div className="flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-medium">Explore Locations</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">800+</div>
              <div className="text-gray-400">Characters</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-400">Episodes</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-400">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}