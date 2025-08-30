"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  Star,
  Heart,
  Settings,
  Info,
  Users,
  Bookmark,
  LocateIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href, isActive }) => (
  <Link href={href} passHref>
    <div
      className={`flex items-center space-x-3  px-4 py-3 cursor-pointer transition-colors ${
        isActive ? "" : "text-gray-300 hover:text-white"
      }`}
    >
      <span className={`${isActive ? "text-[#881326] " : ""}`}>{icon}</span>
      <span className="text-base font-light">{label}</span>
    </div>
  </Link>
);

const LeftNavigationBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-screen bg-[#1A161F] flex flex-col">
      <div className="flex-1 mt-20 overflow-y-auto">
        <div className="py-6 pl-4">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">Menu</h3>

          <MenuItem
            icon={
              <Home size={20} fill={pathname === "/" ? "#881326" : "none"} />
            }
            label="Home"
            href="/"
            isActive={pathname === "/"}
          />

          <MenuItem
            icon={
              <Users
                size={20}
                fill={pathname === "/characters" ? "#881326" : "none"}
              />
            }
            label="Characters"
            href="/characters"
            isActive={pathname === "/characters"}
          />

          <MenuItem
            icon={
              <Users
                size={20}
                fill={pathname === "/episodes" ? "#881326" : "none"}
              />
            }
            label="Episodes"
            href="/episodes"
            isActive={pathname === "/episodes"}
          />

          <MenuItem
            icon={
              <LocateIcon
                size={20}
                fill={pathname === "/location" ? "#881326" : "none"}
              />
            }
            label="Locations"
            href="/locations"
            isActive={pathname === "/location"}
          />
        </div>

        <div className="py-6 pl-4">
          <h3 className="text-gray-400 text-sm font-medium px-4 mb-4">
            Library
          </h3>

          <MenuItem
            icon={
              <Heart
                size={20}
                fill={pathname === "/favourites" ? "#881326" : "none"}
              />
            }
            label="Favourite"
            href="/favourites"
            isActive={pathname === "/favourites"}
          />

          <MenuItem
            icon={
              <Bookmark
                size={20}
                fill={pathname === "/bookmarked" ? "#881326" : "none"}
              />
            }
            label="Bookmarked"
            href="/bookmarked"
            isActive={pathname === "/bookmarked"}
          />

          <MenuItem
            icon={
              <Star
                size={20}
                fill={pathname === "/rating" ? "#881326" : "none"}
              />
            }
            label="Top rated"
            href="/rating"
            isActive={pathname === "/rating"}
          />
        </div>

        <div className="py-6 pl-4">
          <MenuItem
            icon={
              <Settings
                size={20}
                fill={pathname === "/setting" ? "#881326" : "none"}
              />
            }
            label="Settings"
            href="/settings"
            isActive={pathname === "/settings"}
          />

          <MenuItem
            icon={
              <Info
                size={20}
                fill={pathname === "/help" ? "#881326" : "none"}
              />
            }
            label="Help"
            href="/help"
            isActive={pathname === "/help"}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftNavigationBar;
