import React from 'react'
import { thrones } from '@/public/assets'
import Image from 'next/image'

const RightNavigationBar: React.FC = () => {

  return (
   <div className="p-4 space-y-6 h-screen w-full bg-[#1A161F]">

    <div>
      <Image className="" src={thrones} alt='pics'/>
    </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        <div>
          <p className="font-semibold">Samantha</p>
        </div>
      </div>

      <section>
        <h4 className="font-semibold mb-2">Continue</h4>
        {/* Continue Watching list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg">
            <span>WandaVision</span>
            <button className="text-teal-400">Watch</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default RightNavigationBar