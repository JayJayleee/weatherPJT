import React, { useEffect, useState } from "react";
import { Card, CardTitle, CardDescription } from "../ui/card";
import {
  doc,
  updateDoc,
  collection,
  increment,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase-config";

export default function CharacterCard(props) {
  const [likes, setLikes] = useState(props.props.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    setLiked(likedItems.includes(props.props.id));
  }, [props.props.id]);

  useEffect(() => {
    const docRef = doc(firestore, "dailyLog", props.props.id);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setLikes(doc.data().likes);
      }
    });

    return () => unsubscribe();
  }, [props.props.id]);

  const toggleLike = async (event) => {
    event.stopPropagation();
    const newLikedState = !liked;
    setLiked(newLikedState);

    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    const docRef = doc(firestore, "dailyLog", props.props.id);

    if (newLikedState) {
      likedItems.push(props.props.id);
      localStorage.setItem("likedItems", JSON.stringify(likedItems));
      setLikes(likes + 1); // 좋아요 수 증가
      await updateDoc(docRef, { likes: increment(1) });
    } else {
      const index = likedItems.indexOf(props.props.id);
      if (index > -1) {
        likedItems.splice(index, 1); // 항목 제거
      }
      localStorage.setItem("likedItems", JSON.stringify(likedItems));
      setLikes(likes - 1); // 좋아요 수 감소
      await updateDoc(docRef, { likes: increment(-1) });
    }
  };

  return (
    <Card
      onClick={props.onClick}
      className="transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-100  hover:border-indigo-500 hover:border-4 duration-300 w-full rounded-3xl flex flex-col items-center cursor-pointer hover:bg-indigo-300/30"
    >
      <button onClick={toggleLike}>{likes} 좋아요</button>
      <img className="w-3/4 py-6" src={props.props.imgRoute} alt="chr" />

      <div className="rounded-bl-2xl rounded-br-2xl h-15 flex flex-col justify-center items-center w-full bg-blue-800/90 bg-opacity-75">
        <CardTitle className="text-xl font-bold text-white truncate w-full px-5 overflow-hidden text-center">
          {props.props.Title}
        </CardTitle>
        <CardDescription className=" text-white/60 overflow-hidden">
          {props.props.degree}°C / {props.props.status}
        </CardDescription>
      </div>
    </Card>
  );
}
