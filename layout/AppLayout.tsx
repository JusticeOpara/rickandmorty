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
    <main className="flex min-h-screen bg-[#0F1117] text-white">
      <aside className="w-64 border-r border-gray-800 bg-[#141820]">
        <LeftNavigationBar />
      </aside>

      <div className="flex flex-col flex-1">
        <TopNavigationBar />

        {/* Scrollable content */}
        <div className="flex flex-1 overflow-hidden">
          <section className="flex-1 overflow-y-auto p-6">{children}</section>

          <aside className="w-72 border-l border-gray-800 bg-[#141820]">
            <RightNavigationBar />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
