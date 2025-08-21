import React from "react";
import {
  Home,
  Compass,
  Award,
  Users,
  Clock,
  Star,
  Download,
  Heart,
  Plus,
  Check,
  Settings,
  LogOut,
} from "lucide-react";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  isActive = false,
}) => (
  <div
    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
      isActive ? "text-teal-400" : "text-gray-300 hover:text-white"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const LeftNavigationBar: React.FC = () => {
  return (
    <div className="w-full h-screen bg-slate-800 flex flex-col">
      <div className="p-6 border-b border-teal-400 border-dashed">
        <h1 className="text-white text-2xl font-bold">Rick&morty-UI</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-6">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">Menu</h3>

          <MenuItem icon={<Home size={20} />} label="Home" isActive={true} />
          <MenuItem icon={<Compass size={20} />} label="Discover" />

        </div>

        <div className="py-6">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">
            Library
          </h3>

          <MenuItem icon={<Star size={20} />} label="Top Rated" />
        
          <MenuItem icon={<Heart size={20} />} label="Favourite" />
   
        </div>

        <div className="py-6">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">
            General
          </h3>

          <MenuItem icon={<Settings size={20} />} label="Settings" />
          <MenuItem icon={<LogOut size={20} />} label="Log Out" />
        </div>
      </div>
    </div>
  );
};

export default LeftNavigationBar;
