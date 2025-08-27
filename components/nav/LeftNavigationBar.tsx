"use client"


import React from "react";
import Link from "next/link";
import {
  Home,
  Clock,
  Star,
  Download,
  Heart,
  Settings,
  Info,
  AlarmClock,
  Users,
  Bookmark,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  href,
  isActive ,
}) => (
  <Link href={href} passHref>
    <div
      className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
        isActive ? "text-teal-400" : "text-gray-300 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  </Link>
);

const LeftNavigationBar: React.FC = () => {
    const pathname = usePathname();
  return (
    <div className="w-full h-screen bg-slate-800 flex flex-col">
      <div className="p-6 border-b border-teal-400 border-dashed">
        <h1 className="text-white text-2xl font-bold">Rick & Morty Wiki</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-6 pl-4">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">Menu</h3>

          <MenuItem 
            icon={<Home size={20} />} 
            label="Home" 
            href="/" 
            isActive={pathname === "/"}
          />

          <MenuItem 
            icon={<Heart size={20} />} 
            label="Favourite" 
            href="/favourites"
            isActive={pathname === "/favourites"} 
          />

          <MenuItem 
            icon={<Users size={20} />} 
            label="Episodes" 
            href="/episodes" 
              isActive={pathname === "/episodes"}
          />

          <MenuItem 
            icon={<AlarmClock size={20} />} 
            label="Coming soon" 
            href="/coming-soon"
              isActive={pathname === "/coming-soon"} 
          />
        </div>

        <div className="py-6 pl-4">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">
            Library
          </h3>

          <MenuItem 
            icon={<Clock size={20} />} 
            label="Recent" 
            href="/recent" 
              isActive={pathname === "/recent"}
          />
        
          <MenuItem 
            icon={<Bookmark size={20} />} 
            label="Bookmarked" 
            href="/bookmarked" 
              isActive={pathname === "/bookmarked"}
          />

          <MenuItem 
            icon={<Star size={20} />} 
            label="Top rated" 
            href="/" 
              isActive={pathname === "/"}
          />

          <MenuItem 
            icon={<Download size={20} />} 
            label="Downloaded" 
            href="/"
              isActive={pathname === "/"} 
          />
        </div>

        <div className="py-6 pl-4">
          <MenuItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            href="/" 
              isActive={pathname === "/"}
          />
        
          <MenuItem 
            icon={<Info size={20} />} 
            label="Help" 
            href="/" 
              isActive={pathname === "/"}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftNavigationBar;