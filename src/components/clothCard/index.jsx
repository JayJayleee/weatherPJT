import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ClothCard(props) {
  const cardClass = `border-teal-500 border-4 rounded-2xl cursor-pointer flex flex-col items-center transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:border-teal-300 duration-300 ${
    props.isSelected ? "bg-teal-500" : "bg-white"
  }`;

  const images = useSelector((state) => state.images.images);
  const imagePath = `/image/clothImage/ast_${props.currentDegree}_${props.code}.png`;
  const matchingImage = images.find((image) => image.path === imagePath);

  return (
    <div onClick={props.onClick} className="h-2/3 xl:m-5 m-1">
      <div className={cardClass}>
        <div className="m-5 bg-green-950 w-3/4 rounded-2xl py-3">
          <p className="font-ws text-xs md:text-sm lg:text-xl text-white font-semibold text-center text-nowrap truncate">
            {props.name}
          </p>
        </div>
        <img className="w-3/4 py-4" src={matchingImage.base64} alt="의상" />
      </div>
    </div>
  );
}
