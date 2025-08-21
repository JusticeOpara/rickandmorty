
import React, { ReactNode } from "react";
import {
  RightNavigationBar,
  TopNavigationBar,
  LeftNavigationBar,
} from "@/components/nav";

const AppLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  
  return (
    <main className="flex h-screen bg-[#0F1117] text-white">
   
      <aside className="w-64 border-r border-gray-800 bg-[#141820] flex-shrink-0 md:block hidden">
        <LeftNavigationBar />
      </aside>


      <div className="flex flex-col flex-1">
    
        <div className="sticky top-0 z-10 bg-[#0F1117]">
          <TopNavigationBar  />
        </div>

 
        <section className="flex-1 overflow-y-auto pp-6">{children}</section>
      </div>


      <aside className="w-[300px] border-l border-gray-800 bg-[#141820] flex-shrink-0 md:block hidden">
        <RightNavigationBar />
      </aside>
    </main>
  );
};

export default AppLayout;
