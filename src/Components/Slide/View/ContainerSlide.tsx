import { useEffect, useRef } from "react";
import { IMovieItem } from "../Data/DataProvider";
import { ItemContainer } from "./SlideView";
import transformArrayToRenderData from "../Data/DataFormatter";
import "./slideView.css";

export default function ContainerSlide({
  data,
  index,
  itemWidth,
  itemCount,
  anim,
  animTime,
}: {
  data: IMovieItem[];
  index: number;
  itemWidth: number;
  itemCount: number;
  anim: "Left" | "None" | "Right";
  animTime: number;
}) {
  const animValueRef = useRef<number>(0);
  const animTimeRef = useRef<number>(0);
  useEffect(() => {
    animValueRef.current = itemCount * itemWidth + 2;
    animTimeRef.current = animTime;
  }, [itemWidth, itemCount, animTime]);

  console.log("itemCount: " + itemCount);
  let [prev, current, next] = transformArrayToRenderData<IMovieItem>(
    data,
    index,
    itemCount,
  );
  if (anim) {
    //const [prev,current,next] = transformArrayToRenderData<IMovieItem>(data,index,itemCount);
    if (anim === "Right") {
      console.log("Right");
      animValueRef.current = 45;
      next = [];
    }

    if (anim === "None") {
      animValueRef.current = 0;
      animTime = 0;
      next = [];
      prev = [];
    }

    if (anim === "Left") {
      console.log("Left");
      animValueRef.current = -45;
      prev = [];
    }
    //updateView(prev, current, next);
  }
  if (index <= 0) {
    prev = [];
  }

  console.log(current);
  return (
    <div
      className="SlideAnimFrame"
      style={{
        transform: `translateX(${animValueRef.current}%)`,
        transition: `${animTime}ms`,
      }}
    >
      <div className="Container">
        <ItemContainer data={prev} />
        <ItemContainer data={current} />
        <ItemContainer data={next} />
      </div>
    </div>
  );
}
