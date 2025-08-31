
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
    <main className="flex w-full h-screen bg-[#0C0C0E] text-white">
   
      <aside className="w-[250px] border-r border-gray-800  flex-shrink-0 md:block hidden">
        <LeftNavigationBar />
      </aside>


      <div className="flex flex-col flex-1 w-full ">
    
        <div className="sticky top-0 z-10">
          <TopNavigationBar  />
        </div>

        <section className="flex-1 overflow-y-auto w-full lg:p-16 p-4">{children}</section>
      </div>


      <aside className="w-[400px] border-l border-gray-800  flex-shrink-0  hidden">
        <RightNavigationBar />
      </aside>
    </main>
  );
};

export default AppLayout;


