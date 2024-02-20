import React from "react";
import { Card, CardTitle, CardDescription } from "../ui/card";
export default function ClothCard(props) {
  console.log(props)
return <Card className="w-full flex flex-col justify-center items-center">
  <img className="w-3/4 py-6" src={props.props.imgRoute} alt="chr" />
  <div className=" flex flex-col justify-center items-center bg-blue-200 w-full">
  <CardTitle>Seoul, {props.props.degree}°C</CardTitle>
  <CardDescription>{props.props.status}</CardDescription>
  </div>

  </Card>;
}
