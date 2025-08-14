import Image, { StaticImageData } from "next/image";
import React from "react";
import { thrones } from "@/public/assets";
import { ArrowLeft, Heart } from "lucide-react";

interface MovieCardProps {
  title: string;
  date: string;
  posterUrl: string | StaticImageData;
  gender: string;
  status: string;
}

// let date = new Date(d);
// let formattedDate = date.toDateString() 
// console.log(formattedDate);

const Card: React.FC<MovieCardProps> = ({
  title,
  date,
  posterUrl,
  status,
  gender,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl">
      <div className="relative">
        <div className="relative h-36 cursor-pointer">
          {/* <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          /> */}
          <Image
            src={posterUrl || thrones}
            width={100}
            height={100}
            alt={title || "poster"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Navigation icons */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <div className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>
      </div>

      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        <div className="flex items-center space-x-3 text-gray-300 mb-4 text-sm">
          <span>{date}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
         {gender}
        </p>

        <p>{status}</p>
      </div>
    </div>
  );
};

export default Card;
