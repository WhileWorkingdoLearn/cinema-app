import { useEffect, useRef } from "react";
import  ItemContainer from "./ItemViews/ItemContainer"
import transformArrayToRenderData from "../Data/DataFormatter";
import "./slideView.css";

export default function ContainerSlide<T>({
  data,
  index,
  itemWidth,
  itemCount,
  anim,
  animTime,
}: {
  data:  {   data: T[],
  item:(input:T)=>React.ReactNode,
  }
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
  let [prev, current, next] = transformArrayToRenderData<T>(
    data.data,
    index,
    itemCount,
  );
  if (anim) {

    if (anim === "Right") {
      console.log("Right");
      animValueRef.current = 57;
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
      animValueRef.current = -57;
      prev = [];
    }

  }
  if (index <= 0) {
    prev = [];
  }

  return (
    <div
      className="SlideAnimFrame"
      style={{
        transform: `translateX(${animValueRef.current}%)`,
        transition: `${animTime}ms`,
      }}
    >
      <div className="Container">
       <ItemContainer data={prev} element={data.item}/>
       <ItemContainer data={current} element={data.item}/>
       <ItemContainer data={next} element={data.item}/>
      </div>
    </div>
  );
}
