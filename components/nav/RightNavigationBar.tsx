import React, { ReactNode } from 'react'
import { thrones, rickandmorty, rickmortyshot } from '@/public/assets'
import Image from 'next/image'

const RightNavigationBar: React.FC = () => {
  return (
    <div className="p-4 h-screen w-full bg-[#1A161F]">
      <div className="w-full h-full relative overflow-hidden rounded-lg">
        <Image 
          className="w-full h-full object-cover" 
          src={rickandmorty} 
          alt='Rick and Morty'
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          priority
        />
        
      </div>
    </div>
  )
}

export default RightNavigationBar