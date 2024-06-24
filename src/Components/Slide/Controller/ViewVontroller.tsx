import { useState } from "react";
import { IDataProvider, IMovieItem } from "../Data/DataProvider";
import DLList from "../../../Model/DLList";
export interface RenderData<T> {
  prevData: T[];
  viewData: T[];
  nextData: T[];
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
  DataProviderModel: IDataProvider<DLList<IMovieItem>>,
): IViewController<IMovieItem> {
  const { fetchData, data } = DataProviderModel;
  const [translateX, setTranslateX] = useState<{
    transformDirPercentage: number;
    transitionDuration: number;
  }>({
    transformDirPercentage: 0,
    transitionDuration: 0,
  });
  const [cardCount, setCardCount] = useState<number>(0);
  const [animationDuration, setAnimationDuration] =
    useState<number>(AnimationDuration);
  const [renderData, setRenderData] = useState<RenderData<IMovieItem>>({
    prevData: [],
    viewData: [],
    nextData: [],
  } as RenderData<IMovieItem>);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const ComponentInit = () => {
    fetchData();
  };

  const ButtonHandler = (dir: "next" | "prev") => {
    if (pageIndex <= 0 && dir === "prev") return;

    var update = {
      transformDirPercentage: 0,
      transitionDuration: 0,
    };

    if (dir === "next") {
      setPageIndex(pageIndex + 1);
      update = {
        transformDirPercentage: -AnimPercentage,
        transitionDuration: animationDuration,
      };
    }

    if (dir === "prev") {
      setPageIndex(pageIndex - 1);
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
    viewContainerRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (viewContainerRef.current) {
      const containerWidth = viewContainerRef.current.clientWidth;
      const newCardCount = Math.floor(containerWidth / ItemWidht);
      const distance = containerWidth * (AnimPercentage / 100);
      const duration = calculateAnimationDuration(distance);
      setAnimationDuration(duration);
      setCardCount(newCardCount);
    }
  };

  const calculateAnimationDuration = (distance: number) => {
    const speed = AnimationDuration / 1000; // Speed in pixels per millisecond
    return distance / speed;
  };

  const onSlideEnd = () => {
    updateDataContainers(data);
  };

  const updateDataContainers = (list: DLList<IMovieItem>) => {
    setRenderData({
      prevData: list.traverseFromTo(pageIndex, pageIndex - cardCount),
      viewData: list.traverseFromTo(pageIndex, pageIndex + cardCount),
      nextData: list.traverseFromTo(pageIndex + cardCount, 4),
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
