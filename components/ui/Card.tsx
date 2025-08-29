import { StaticImageData } from "next/image";
import React from "react";

import { Heart } from "lucide-react";

import {
  selectIsFavorite,
  toggleFavorite,
} from "@/store/slices/favourite-slice";
import { useDispatch, useSelector } from "react-redux";

interface MovieCardProps {
  id: number;
  title: string;
  date: string;
  posterUrl: string | StaticImageData;
  gender: string;
  status: string;
}

const Card: React.FC<MovieCardProps> = ({
  id,
  title,
  // date,
  posterUrl,
  status,
  gender,
}) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };
  return (
    <div className="h-96 w-full rounded-xl overflow-hidden shadow-2xl relative">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${posterUrl})`,
          }}
        ></div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        ></div>
        {/* Netflix Logo */}
        <div className="absolute top-3 left-3 w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>

        <div className="absolute top-3 right-3 flex items-center space-x-1">
          <button
            onClick={handleFavoriteClick}
            className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-50 transition"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white text-2xl font-semibold mb-3">{title}</h2>

          <div className="flex items-center gap-4">
            {/* <span className="bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
              {new Date(date).toLocaleDateString()}
            </span> */}
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                status === "Alive"
                  ? "bg-green-500"
                  : status === "Dead"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            >
              {status}
            </span>
            <span className="px-2 py-1 rounded bg-blue-500 text-xs font-medium">
              {gender}
            </span>
          </div>
        </div>
   
    </div>
  );
};

export default Card;
