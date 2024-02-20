import React from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

export default function OutfitCarousel(props) {
  const formSchema = z.object({
    Title: z.string().min(1, {
      message: "타이틀을 입력해주세요!",
    }),
    Description: z.string().min(1, {
      message: "일기를 입력해주세요!",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    props.saveDailyLog(data);
  };

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
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

          <CarouselItem>
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

          <CarouselItem>
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

          <CarouselItem>
            <div>
              <p className="font-ws">일기장</p>
              <Form>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="font-ws">타이틀</label>
                    <Input className="font-ws" {...register("Title")} />
                    {errors.Title && <p>{errors.Title.message}</p>}
                  </div>
                  <div>
                    <label className="font-ws">일기</label>
                    <Input className="font-ws" {...register("Description")} />
                    {errors.Description && <p>{errors.Description.message}</p>}
                  </div>
                  <Button type="submit">저장하기</Button>
                </form>
              </Form>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <button
        onClick={props.saveDailyLog}
        className="px-6 h-12 bg-teal-400"
        type="submit"
      >
        저장하기
      </button>
    </div>
  );
}
