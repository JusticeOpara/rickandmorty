"use client";

import { FC, ReactNode, Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { Loader } from "@/components/ui";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ReduxProvider store={store}> 
          {children}
         </ReduxProvider> 
      </Suspense>
    </>
  );
};

export default Providers;
