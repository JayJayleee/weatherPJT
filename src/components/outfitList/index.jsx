import React from "react";
import { fetchOutfit } from "../../api/weather";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../characterCard";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "../ui/alert-dialog";

export default function OutfitList() {
  const {
    data: outfitdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getOutfit"],
    queryFn: fetchOutfit,
  });

  console.log(outfitdata, "데이터");

  if (isLoading) return <div>로딩중(로티같은거 넣기)</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  //   console.log(outfitdata, "데이터")

  return (
    <div className="w-full lg:h-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 p-5 snap-y overflow-y-scroll scroll-auto">
      {outfitdata &&
        outfitdata.map((outfit, index) => (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <CharacterCard key={index} props={outfit} />
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-xl flex flex-col items-center w-full">
              <AlertDialogHeader className="rounded-xl flex flex-col items-center w-full">
                <AlertDialogTitle className="w-full font-ws text-center text-4xl py-9 underline decoration-sky-500/50 whitespace-normal">
                  {outfit.Title}
                </AlertDialogTitle>
                <img
                  src={outfit.imgRoute}
                  className="w-3/4 rounded-xl p-5"
                  alt="최종 이미지"
                />
                <AlertDialogDescription className="font-ws text-center text-lg py-5 font-light rounded-lg  w-4/5 whitespace-normal text-white bg-blue-500/80">
                  {outfit.Diary}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="font-ws rounded-full w-1/3">
                  뒤로가기
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
    </div>
  );
}
