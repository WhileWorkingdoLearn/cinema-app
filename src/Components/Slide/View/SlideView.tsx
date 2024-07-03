import { useEffect, useRef, useState } from "react";
import "./slideView.css";
import useFetchMovieData, { IMovieItem } from "../Data/DataProvider";
import { ApiRequestUrls } from "../../../Environment/Environment";
import { throttle } from "lodash";
import ContainerSlide from "./ContainerSlide";

export interface ControllerConfig {
  baseUrl: string;
  apiKey?: string;
  animDeltaT: number;
}

export function SlideButton({
  label,
  amount,
  increase,
  onClickCallback,
}: {
  label: string;
  amount: number;
  increase: boolean;
  onClickCallback: (index: number) => void;
  //setFunction:React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <div
      className="Button"
      onClick={() => {
        const value = !increase ? amount : -amount;
        onClickCallback(value);
      }}
    >
      {label}
    </div>
  );
}

export function ItemContainer({ data }: { data: IMovieItem[] }) {
  // console.log(data);

  return (
    <div className="Container Subframe">
      {data.map((value: IMovieItem, index: number) => {
        return value ? (
          <div
            key={index}
            className="Item"
            onClick={() => {
              console.log("Item clicked");
            }}
          >
            <img
              src={ApiRequestUrls.TMDB.pictures + value.poster_path}
              alt="No Data"
            />
          </div>
        ) : (
          <div key={index} className="Item">
            No Item
          </div>
        );
      })}
    </div>
  );
}

export default function SlideView({
  controller,
}: {
  controller: ControllerConfig;
}) {
  console.log("SlideViewRender");
  const AnimtTime = 1000;
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const itemWidth = useRef<number>(0);
  const movieData = useFetchMovieData(
    controller.baseUrl,
    controller.apiKey || "",
  );
  const [itemCount, setItemCount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [animeState, setAnimState] = useState<"Left" | "None" | "Right">(
    "None",
  );

  useEffect(() => {
    console.log("SlideViewEffect");
    const onWindowSizeChanged = () => {
      console.log("onWindowSizeChanged");
      if (viewContainerRef.current) {
        itemWidth.current = Math.max(window.innerWidth / 10, 250);
        const newCardCount = Math.max(
          Math.ceil(viewContainerRef.current.offsetWidth / itemWidth.current),
          1,
        );
        console.log(
          "newCardCount" +
            newCardCount +
            " widht: " +
            viewContainerRef.current.clientWidth,
        );
        setItemCount((itemCount: number) => newCardCount);
      }
    };
    onWindowSizeChanged();
    window.addEventListener("resize", () => {
      onWindowSizeChanged();
    });
    return () => {
      window.removeEventListener("resize", () => {
        onWindowSizeChanged();
      });
    };
  }, []);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      updateView(itemCount);
    } else {
      // updateIndex('prev');
      updateView(-itemCount);
    }
  };

  const throttledInput = throttle((e) => {
    handleWheel(e);
  }, 300);

  const updateView = (amount: number) => {
    if (amount < 0 && index <= 0) return;
    if (amount > 0 && index >= movieData.length - itemCount) return;
    const newIndex = index + amount;
    console.log(newIndex);
    let state: "Left" | "None" | "Right" = "None";
    if (amount < 0) {
      state = "Right";
    }
    if (amount > 0) {
      state = "Left";
    }
    setAnimState(state);

    setTimeout(() => {
      const newIndex = index + amount;
      console.log(newIndex);
      setIndex(newIndex);
      resetAnim();
    }, AnimtTime);
  };

  const resetAnim = () => {
    setAnimState("None");
  };

  return (
    <div className="Frame" onWheel={throttledInput}>
      <SlideButton
        label="prev"
        amount={itemCount}
        increase={true}
        onClickCallback={updateView}
      />
      <div className="Viewport" ref={viewContainerRef}>
        <ContainerSlide
          data={movieData}
          itemCount={itemCount}
          index={index}
          animTime={AnimtTime}
          itemWidth={itemWidth.current}
          anim={animeState}
        />
      </div>
      <SlideButton
        label="next"
        amount={itemCount}
        increase={false}
        onClickCallback={updateView}
      />
    </div>
  );
}
