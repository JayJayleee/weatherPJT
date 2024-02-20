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

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem key={1}>
            <div className="w-full h-30">
              <p>상의</p>
              {Object.entries(props.codyList.top).map(([key, value]) => (
                <button
                  className="px-6 h-12 uppercase font-WS tracking-wider border-2 border-black bg-teal-400 text-black"
                  type="button"
                  key={key}
                  onClick={() => props.pickTop(value.code)}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </CarouselItem>

          <CarouselItem key={2}>
            <div>
              <p>하의</p>
              {Object.entries(props.codyList.bottom).map(([key, value]) => (
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                  type="button"
                  key={key}
                  onClick={() => props.pickBottom(value.code)}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </CarouselItem>

          <CarouselItem key={3}>
            <div>
              <p>아이템</p>
              {Object.entries(props.codyList.item).map(([key, value]) => (
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                  type="button"
                  key={key}
                  onClick={() => props.pickItem(value.code)}
                >
                  {value.name}
                </button>
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
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious setIndex={setIndex} />
        <CarouselNext pickCard={pickCard} setIndex={setIndex} />
      </Carousel>
    </div>
  );
}
