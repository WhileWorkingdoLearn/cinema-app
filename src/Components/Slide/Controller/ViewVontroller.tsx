import { useState } from "react";
import { IDataProvider, IMovieItem } from "../Data/DataProvider";
import transformArrayToRenderData from "../Data/DataFormater";
export interface RenderData<T> {
  prevData: (T|null)[];
  viewData: (T|null)[];
  nextData: (T|null)[];
}
export interface IViewController<T> {
  Init: () => void;
  curentCardCount: number;
  translateX: {
    transformDirPercentage: number;
    transitionDuration: number;
  };
  onButtonClick: (dir: "next" | "prev") => void;
  updateCardCount: (viewContainerRef: React.RefObject<HTMLDivElement>) => void;
  renderData: RenderData<T>;
}

export default function Controller(
  AnimPercentage: number,
  AnimationDuration: number,
  ItemWidht: number,
  DataProviderModel: IDataProvider<IMovieItem[]>): IViewController<IMovieItem> {
    const { fetchData, data } = DataProviderModel;
    const [translateX, setTranslateX] = useState<{
      transformDirPercentage: number;
      transitionDuration: number;
    }>({
      transformDirPercentage: 0,
      transitionDuration: 0,
    });
    const [cardCount, setCardCount] = useState<number>(0);
    const [animationDuration, setAnimationDuration] = useState<number>(AnimationDuration);
    const [renderData, setRenderData] = useState<RenderData<IMovieItem>>({
      prevData: [],
      viewData: [],
      nextData: [],
    });
    const [pageIndex, setPageIndex] = useState<number>(0);

    const ComponentInit = () => {
      fetchData();
    };

    const ButtonHandler = (dir: "next" | "prev") => {
      if (pageIndex <= 0 && dir === "prev") return;

      if(pageIndex >= (data.length-1)) {
        setPageIndex(0);
      }

      var update = {
        transformDirPercentage: 0,
        transitionDuration: 0,
      };

      if (dir === "next") {
        setPageIndex(pageIndex + Math.floor(cardCount * 0.25));
        update = {
          transformDirPercentage: -AnimPercentage,
          transitionDuration: animationDuration,
        };
      }

      if (dir === "prev") {
        setPageIndex(pageIndex -  Math.floor(cardCount * 0.25));
        update = {
          transformDirPercentage: AnimPercentage,
          transitionDuration: animationDuration,
        };
      }

      console.log(pageIndex);

      setTranslateX(update);

      setTimeout(() => {
        setTranslateX({
          transformDirPercentage: 0,
          transitionDuration: 0,
        });
        onSlideEnd();
      }, animationDuration);
  };

  const UpdateCardCount = (
     containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newCardCount = Math.floor(containerWidth / ItemWidht);
      const distance = containerWidth * (AnimPercentage / 100);
      const duration = calculateAnimationDuration(distance);
      setAnimationDuration(duration);
      setCardCount(newCardCount);
      updateDataContainers(data||[]);
    }
   
  };

  const calculateAnimationDuration = (distance: number) => {
    const speed = AnimationDuration / 1000; // Speed in pixels per millisecond
    return distance / speed;
  };

  const onSlideEnd = () => {
    updateDataContainers(data);
  };

  const updateDataContainers = (list: IMovieItem[]) => {
     const [prev,current,next] = transformArrayToRenderData<IMovieItem>(list,pageIndex ,cardCount);
    setRenderData({
      prevData: prev,
      viewData: current,
      nextData: next,
    });
  };

  return {
    Init: ComponentInit,
    curentCardCount: cardCount,
    translateX: translateX,
    onButtonClick: ButtonHandler,
    updateCardCount: UpdateCardCount,
    renderData: renderData,
  };
}
