import Image, { StaticImageData } from "next/image";
import React from "react";
import { thrones } from "@/public/assets";
import { ArrowLeft, Heart } from "lucide-react";
// import { selectIsFavorite, toggleFavorite } from '@/';
import { selectIsFavorite, toggleFavorite } from "@/store/slices/favourite-slice";
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
  date,
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

      <div className="w-full mx-auto bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <div className="relative h-36 cursor-pointer">
          <Image
            src={posterUrl}
            width={100}
            height={100}
            alt={title || 'poster'}
            className="absolute inset-0 bg-cover bg-center opacity-90 h-full w-full"
          />

          <div className="absolute top-4 right-4 flex justify-between items-center z-10">
          
            <button
              onClick={handleFavoriteClick}
              className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-50 transition"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 text-white">
        <h1 className="text-2xl font-semibold mb-2 line-clamp-1">{title}</h1>
        
        <div className="flex items-center space-x-3 text-gray-300 mb-3 text-sm">
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'Alive' ? 'bg-green-500' : 
            status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
          }`}>
            {status}
          </span>
          <span className="px-2 py-1 rounded-full bg-blue-500 text-xs font-medium">
            {gender}
          </span>
        </div>
      </div>
    </div>

    // <div className="w-full mx-auto bg-slate-800 rounded-3xl overflow-hidden shadojw">
    //   <div className="relative">
    //     <div className="relative h-36 cursor-pointer">
         
    //       <Image
    //         src={posterUrl || thrones}
    //         width={100}
    //         height={100}
    //         alt={title || "poster"}
    //         className="absolute inset-0 bg-cover bg-center opacity-90 h-full w-full"
    //         // className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    //       />

    //       {/* Navigation icons */}
    //       <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
    //         <div className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center">
    //           <ArrowLeft className="w-6 h-6 text-white" />
    //         </div>
    //         <div className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center">
    //           <Heart className="w-6 h-6 text-white" />
    //         </div>
    //       </div>

    //       <div className="absolute inset-0 flex items-center justify-center"></div>
    //     </div>
    //   </div>

    //   <div className="p-4 text-white">
    //     <h1 className="text-2xl font-semibold mb-4">{title}</h1>

    //     <div className="flex items-center space-x-3 text-gray-300 mb-4 text-sm">
    //       <span>{new Date(date).toDateString()}</span>
    //     </div>

    //     <p className="text-gray-300 text-sm leading-relaxed mb-6">
    //      {gender}
    //     </p>

    //     <p>{status}</p>
    //   </div>
    // </div>
  );
};

export default Card;
