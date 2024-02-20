import React from "react";
import { fetchOutfit } from "../../api/weather";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../characterCard";

export default function OutfitList() {
  const {
    data: outfitdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getOutfit"],
    queryFn: fetchOutfit,
  });

  if (isLoading) return <div>로딩중(로티같은거 넣기)</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  //   console.log(outfitdata, "데이터")

  return (
    <div className="w-full grid grid-cols-5 gap-5 p-5 overflow-y-scroll">
      {outfitdata &&
        outfitdata.map((outfit, index) => (
          <CharacterCard key={index} props={outfit} />
        ))}
    </div>
  );
}
