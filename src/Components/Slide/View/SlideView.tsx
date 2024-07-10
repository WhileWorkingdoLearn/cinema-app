import { useEffect, useRef, useState, ReactNode, useContext } from "react";
import "./slideView.css";
import { SlideButton } from "./SlideButton";
import useItemsInViewCalculator from "../Hooks/useItemsInViewCalculator";
import useDataToView from "../Hooks/useDataToView";
import ItemContainer from "./ItemViews/ItemContainer";
import { DataContext } from "./Context/DataContext";

export default function Slide<T>({
  Item,
  onItemClicked,
}: {
  Item: (input: T) => ReactNode;
  onItemClicked?: (data: T) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const data: T[] = useContext(DataContext);

  const [itemCount, totalCount] = useItemsInViewCalculator(
    viewRef.current?.clientWidth || 1024,
    200,
  );

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
    let offset = slideRef.current?.clientWidth || 0 - itemCount * 204;
    let slideValue =
      ((itemCount * 200) / (slideRef.current?.clientWidth || 0 - offset)) * 100;
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
            element={Item}
            onItemClicked={onItemClicked}
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
