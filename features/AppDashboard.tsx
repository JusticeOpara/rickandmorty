"use client";

import { Card } from "@/components/ui";
import React from "react";

import { useGetRickAndMortyQuery } from "@/services/prickandmortyService";

const AppDashboard = () => {
  const { data: rickandmortyData } = useGetRickAndMortyQuery({
    refetchOnMountOrArgChange: true,
  });
  console.log(rickandmortyData?.results, "--data");

  return (
    <div className="bg-[#0F1117] grid grid-cols-4 gap-8">
      {rickandmortyData?.results.map((data) => (
        <Card title={data.name} 
        date={data.created} 
        key={data.id} 
        posterUrl={data.image}
        status={data.status}
        gender={data.gender}
        />
      ))}

    </div>
  );
};

export default AppDashboard;
