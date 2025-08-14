"use client";

import { Filter } from "lucide-react";
import React from "react";

const TopNavigationBar: React.FC = () => {
  return (
    <nav className="bg-slate-900 p-6 border-b border-slate-700">
      <div className="flex items-center justify-between">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-white">
            Rick and Morty Characters & Episodes
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigationBar;
