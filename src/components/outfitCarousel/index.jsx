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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "../ui/alert-dialog";

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
      message: "타이틀을 입력해주세요.",
    }),
    Description: z
      .string()
      .min(1, { message: "한 글자 이상 작성해주세요." })
      .max(300, { message: "최대 300자까지만 작성 가능합니다." }),
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

  // console.log(props.codyList.bottom);
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

  const handleSaveButtonClick = (e) => {
    e.preventDefault();
    handleSubmit((data) => {
      // console.log(data);
      setOpenModal(true);
    })();
  };

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full h-full col-span-2">
      <Carousel className="w-full h-full bg-slate-100 flex flex-col justify-center items-center rounded-xl">
        <CarouselContent className="w-full">
          <CarouselItem
            className="w-full md:h-full h-auto flex flex-col justify-center items-center ml-1"
            key={1}
          >
            <div className="text-center text-4xl md:text-6xl font-ws my-5 md:my-10 font-extrabold underline decoration-sky-500/30">
              상의는 뭘 입을까?
            </div>
            <div className="w-full h-auto grid grid-cols-3 grid-rows-1 md:gap-5 lg:h-full md:mt-8 gap-1 mb-8 xl:mb-0">
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
            className="w-full md:h-full h-auto flex flex-col justify-center items-center ml-1"
            key={2}
          >
            <div className="text-center text-4xl md:text-6xl font-ws my-5 md:my-10 font-extrabold underline decoration-sky-500/30">
              하의는 뭘 입을까?
            </div>
            <div className="w-full h-auto grid grid-cols-3 grid-rows-1 md:gap-5 lg:h-full md:mt-8 gap-1 mb-8 xl:mb-0">
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
            className="w-full md:h-full h-auto flex flex-col justify-center items-center ml-1"
            key={3}
          >
            <div className="text-center text-4xl md:text-6xl font-ws my-5 md:my-10 font-extrabold underline decoration-sky-500/30">
              무엇을 들고 나가볼까?
            </div>
            <div className="w-full h-auto grid grid-cols-3 grid-rows-1 md:gap-5 lg:h-full md:mt-8 gap-1 mb-8 xl:mb-0">
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

          <CarouselItem
            className="w-full md:h-full h-auto flex flex-col justify-center items-center ml-1"
            key={4}
          >
            <div className="text-center text-4xl lg:text-6xl font-ws my-5 md:my-10 font-extrabold underline decoration-sky-500/30">
              오늘의 기록
            </div>
            <div className="w-3/5">
              <Form className="mx-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="h-15 flex flex-col justify-around">
                    <label className=" text-xl font-ws xl:text-4xl underline decoration-sky-500/80">
                      타이틀
                    </label>
                    <Input
                      className="font-ws my-5 text-sm lg:text-lg"
                      placeholder="오늘 코디는 어떤가요?"
                      {...register("Title", { onChange: handleTitleChange })}
                    />
                    {errors.Title && (
                      <p className="font-ws text-red-600 pb-3">
                        {errors.Title.message}
                      </p>
                    )}
                  </div>
                  <div className="h-1/3 lg:h-3/4 flex flex-col justify-around md:mt-4">
                    <label className="text-xl font-ws xl:text-4xl underline decoration-sky-500/80">
                      일기
                    </label>
                    <Textarea
                      className="font-ws h-10 max-h-15 my-5 text-sm md:min-h-30  xl:min-h-56 xl:max-h-56 md:text-lg "
                      placeholder="오늘은 어떤 일이 일어날까요?"
                      {...register("Description", {
                        onChange: handleDiaryChange,
                      })}
                    />
                    {errors.Description && (
                      <p className="font-ws text-red-600 pb-3">
                        {errors.Description.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex justify-center">
                    <Button
                      type="button"
                      onClick={handleSaveButtonClick}
                      className="w-full h-8 text-xl font-ws mt-3 rounded-full md:w-full xl:h-20 xl:text-3xl "
                    >
                      저장하기
                    </Button>

                    <AlertDialog open={openModal}>
                      <AlertDialogContent className="rounded-xl flex flex-col items-center">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-ws text-center text-4xl py-3 underline decoration-sky-500/50">
                            오늘의 코디가 맞나요?
                          </AlertDialogTitle>
                          <img src={props.imgRoute} alt="최종 이미지" />
                          {/* <AlertDialogDescription className="font-ws text-center text-lg">
                            한 번 더 확인해보세요!
                          </AlertDialogDescription> */}
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setOpenModal(false)}
                            className="font-ws rounded-full w-1/3"
                          >
                            아니요..
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="font-ws rounded-full w-1/3"
                            onClick={handleSubmit(onSubmit)}
                          >
                            맞아요!
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </form>
              </Form>
            </div>
          </CarouselItem>
        </CarouselContent>
        {index !== 4 && (
          <div className="w-2/5 h-15 md:h-30 grid grid-cols-2 gap-4 xl:mt-20">
            <CarouselPrevious setIndex={setIndex} />
            <CarouselNext pickCard={pickCard} setIndex={setIndex} />
          </div>
        )}
      </Carousel>
    </div>
  );
}
