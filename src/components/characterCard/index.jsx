import React from "react";
import { Card, CardTitle, CardDescription } from "../ui/card";
export default function CharacterCard(props) {
  console.log(props);
  return (
    <Card className="transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-100 hover:bg-yellow-100/30 hover:border-teal-500 hover:border-4 duration-300 w-full rounded-3xl flex flex-col items-center cursor-pointer">
      <img className="w-3/4 py-6" src={props.props.imgRoute} alt="chr" />
      <div className=" mb-3 rounded-3xl h-15 flex flex-col justify-center items-center w-3/4 bg-teal-800/50">
        <CardTitle className="text-xl font-bold text-white truncate ... px-5 overflow-hidden">
          {props.props.Title}
        </CardTitle>
        <CardDescription className=" text-white/60">
          {props.props.degree}°C / {props.props.status}
        </CardDescription>
      </div>
    </Card>
  );
}
