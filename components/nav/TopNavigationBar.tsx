import { Filter, Search } from "lucide-react";

import React from "react";

const TopNavigationBar: React.FC = () => {
  return (
    <nav className="bg-slate-900 p-6 border-b border-slate-700">
      <div className="flex items-center justify-between">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-8">
          <div className="text-white text-lg font-medium cursor-pointer">
            Movies
          </div>
         
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-80 pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigationBar;
