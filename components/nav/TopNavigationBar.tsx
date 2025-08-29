"use client";
import React, { useState } from "react";

import { MenuIcon, X, Home, Users, MapPin, Heart, Info, User } from "lucide-react";

const TopNavigationBar: React.FC = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Characters", href: "/characters" },
    { icon: MapPin, label: "Locations", href: "/locations" },
    { icon: User, label: "Episodes", href: "/episodes" },
    { icon: Heart, label: "Favorties", href: "/favourites" },
    { icon: Info, label: "About", href: "/about" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-[#0C0C0E] p-6 border-b border-slate-700 relative">
        <div className="flex items-center justify-between">
          {/* Navigation Tabs */}
          <div className="flex items-center space-x-8">
            <h1 className="lg:text-3xl font-medium text-white">
              Rick and Morty Wiki
            </h1>
          </div>

         

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-[#0C0C0E] w-full h-full shadow-xl border-r border-slate-700">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-xl font-medium text-white">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-4 text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <IconComponent size={20} className="text-gray-400" />
                    <span className="text-base font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>

     
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
              <p className="text-sm text-gray-400 text-center">
                Rick and Morty Wiki © 2024
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavigationBar;
