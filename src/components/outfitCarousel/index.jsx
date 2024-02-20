import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { z } from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ClothCard from "../clothCard";

export default function OutfitCarousel(props) {
  const [pickCard, setPickCard] = useState(false);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    // index 값에 따라 pickCard 상태 업데이트
    if (index === 1 && props.topOutfit) {
      setPickCard(true);
    } else if (index === 2 && props.bottomOutfit) {
      setPickCard(true);
    } else if (index === 3 && props.itemOutfit) {
      setPickCard(true);
    } else {
      setPickCard(false);
    }
  }, [index, props.topOutfit, props.bottomOutfit, props.itemOutfit]);

  const formSchema = z.object({
    Title: z.string().min(1, {
      message: "일기 제목을 써 주세요!",
    }),
    Description: z
      .string()
      .min(1, { message: "일기는 한 글자 이상으로 작성해주세요!" })
      .max(300, { message: "일기는 최대 300자까지만 작성 가능합니다." }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    props.saveDailyLog(data);
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setValue("Title", value, { shouldValidate: true });
    props.setTitle(value);
    // console.log(value);
  };

  const handleDiaryChange = (e) => {
    const { value } = e.target;
    setValue("Description", value, { shouldValidate: true });
    props.setDiary(value);
    // console.log(value);
  };
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (type, code) => {
    // 각 카테고리별로 선택된 아이템의 상태를 업데이트
    if (type === "top") {
      setSelectedTop(code);
      props.pickTop(code);
    } else if (type === "bottom") {
      setSelectedBottom(code);
      props.pickBottom(code);
    } else if (type === "item") {
      setSelectedItem(code);
      props.pickItem(code);
    }
  };

  return (
    <div className="w-full h-full col-span-2">
      <Carousel className="w-full h-full bg-slate-100 flex flex-col justify-center items-center">
        <CarouselContent className="w-full">
          <CarouselItem
            className="w-full h-full flex flex-col justify-center items-center"
            key={1}
          >
            <p className="text-center">상의</p>
            <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-5">
              {Object.entries(props.codyList.top).map(([key, value]) => (
                <ClothCard
                  key={key}
                  type="top"
                  name={value.name}
                  code={value.code}
                  currentDegree={props.currentDegree}
                  isSelected={selectedTop === value.code}
                  onClick={() => handleCardClick("top", value.code)}
                />
              ))}
            </div>
          </CarouselItem>

          <CarouselItem
            className="w-full h-full flex flex-col justify-center items-center"
            key={1}
          >
            <p className="text-center">상의</p>
            <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-5">
              {Object.entries(props.codyList.bottom).map(([key, value]) => (
                <ClothCard
                  key={key}
                  type="bottom"
                  name={value.name}
                  code={value.code}
                  currentDegree={props.currentDegree}
                  isSelected={selectedBottom === value.code}
                  onClick={() => handleCardClick("bottom", value.code)}
                />
              ))}
            </div>
          </CarouselItem>

          <CarouselItem
            className="w-full h-full flex flex-col justify-center items-center"
            key={1}
          >
            <p className="text-center">소품</p>
            <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-5">
              {Object.entries(props.codyList.item).map(([key, value]) => (
                <ClothCard
                  key={key}
                  currentDegree={props.currentDegree}
                  name={value.name}
                  code={value.code}
                  isSelected={selectedItem === value.code}
                  onClick={() => handleCardClick("item", value.code)}
                />
              ))}
            </div>
          </CarouselItem>

          <CarouselItem key={4}>
            <div>
              <p className="font-ws">일기장</p>
              <Form>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="font-ws">타이틀</label>
                    <Input
                      className="font-ws"
                      {...register("Title", { onChange: handleTitleChange })}
                    />
                    {errors.Title && <p>{errors.Title.message}</p>}
                  </div>
                  <div>
                    <label className="font-ws">일기</label>
                    <Textarea
                      className="font-ws"
                      {...register("Description", {
                        onChange: handleDiaryChange,
                      })}
                    />
                    {errors.Description && <p>{errors.Description.message}</p>}
                  </div>

                  <Button type="submit">저장하기</Button>
                </form>
              </Form>
            </div>
            <div></div>
          </CarouselItem>
        </CarouselContent>
        <div>
          <CarouselPrevious setIndex={setIndex} />
          <CarouselNext pickCard={pickCard} setIndex={setIndex} />
        </div>
      </Carousel>
    </div>
  );
}
