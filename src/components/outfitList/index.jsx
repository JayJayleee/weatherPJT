import React from 'react'
import { fetchOutfit } from '../../api/weather';
import { useQuery } from '@tanstack/react-query';
import ClothCard from '../clothCard';

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
    <div className='w-full grid grid-cols-5 gap-5'>
        { outfitdata && outfitdata.map((outfit, index) => (
            <ClothCard key={index} props={outfit} />
      
      ))}
    </div>
  )
}
