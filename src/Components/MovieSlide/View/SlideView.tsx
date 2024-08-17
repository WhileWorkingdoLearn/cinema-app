import { useEffect, useRef, useState } from "react";
import "./slideView.css";
import { SlideButton } from "./SlideButton";
import useItemsInViewCalculator from "../Hooks/useItemsInViewCalculator";
import useDataToView from "../Hooks/useDataToView";
import ItemContainer from "./ItemViews/ItemContainer";
import { useMovieDataContext } from "../../../Context/DataContext";
import { ItemView } from "./ItemViews/ItemView";
import { IMovieItem } from "../../../Context/Data/DataInterfaces";


export default function Slide({onItemClicked}:{onItemClicked:(data:IMovieItem)=>void}) {
  const [index, setIndex] = useState<number>(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const itemWidth = 208;

  const [itemCount, totalCount] = useItemsInViewCalculator(
    viewRef.current?.clientWidth || 1024,
    itemWidth,
  );
  const {data} = useMovieDataContext();

  const { view } = useDataToView(data, index, totalCount || 0);

  const [animation, setAnimation] = useState<"Left" | "None" | "Right">("None");

  const animTime = 800;

  useEffect(() => {
    setIndex(0);
  }, [itemCount]);

  const onIncrease = (amount: number) => {
    let leftOrRight: "Left" | "None" | "Right" = "None";
    if (amount < 0) {
      leftOrRight = "Left";
    }
    if (amount > 0) {
      leftOrRight = "Right";
    }
    setAnimation(leftOrRight);
  };

  const updateIndex = (dir: number) => {
    let val = 0;
    if (dir < 0) {
      val = index - itemCount + data.length;
    }
    if (dir > 0) {
      val = index + itemCount;
    }
    val = val % data.length;
    setIndex(val);
    setAnimation("None");
  };

  let cssAnimClass: { transform: number; transition: number } = {
    transform: 0,
    transition: 0,
  };

  let dir = 0;
  if (animation) {
    let offset = (slideRef.current?.clientWidth || 0) - (itemCount * itemWidth);
    let slideValue =
      ((itemCount * itemWidth) / (slideRef.current?.clientWidth || 0 - offset)) * 100;
    if (animation === "Left") {
      cssAnimClass.transform = slideValue;
      cssAnimClass.transition = animTime;
      dir = -1;
    }
    if (animation === "Right") {
      cssAnimClass.transform = -slideValue;
      cssAnimClass.transition = animTime;
      dir = 1;
    }
  }

  return (
    <div className="Frame">
      <SlideButton
        increase={true}
        amount={1}
        label="&#10094;"
        onClickCallback={(num) => {
          onIncrease(num);
        }}
      />
      <div className="Viewport" ref={viewRef}>
        <div
          className="Slide"
          ref={slideRef}
          style={{
            transform: `translate3d(${cssAnimClass.transform}%,0,0)`,
            transition: `${cssAnimClass.transition}ms`,
          }}
          onTransitionEnd={() => {
            updateIndex(dir);
          }}
        >
          <ItemContainer
            data={view}
            element={(props) => ItemView({data:props})}
            onItemClicked={(clickedData) => {
              console.log(clickedData);
              onItemClicked(clickedData)
            }}
          />
        </div>
      </div>
      <SlideButton
        increase={false}
        amount={1}
        label="&#10095;"
        onClickCallback={(num) => {
          onIncrease(num);
        }}
      />
    </div>
  );
}

