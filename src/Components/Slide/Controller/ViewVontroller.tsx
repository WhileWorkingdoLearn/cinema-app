import { useState } from "react";
import { IDataProvider, IMovieItem } from "../Data/DataProvider";


export interface IViewController {
  isPrevButtonActive:boolean,
  isNextButtonActive:boolean,
  curentCardCount:number,
  translateX:{
    transformDirPercentage: number;
    transitionDuration: number;
  },
  onButtonClick:  (dir:'next' | 'prev') => void,
  updateCardCount: (viewContainerRef:React.RefObject<HTMLDivElement>)=> void,
  prevData:IMovieItem[],
  viewData:IMovieItem[],
  nextData:IMovieItem[],
}


export default function Controller(AnimPercentage:number,AnimationDuration:number,itemWidht:number , dataProviderModel:IDataProvider): IViewController {

  const {fetchData,getData} = dataProviderModel;

  const [translateX, setTranslateX] = useState<{
    transformDirPercentage: number;
    transitionDuration: number;
  }>({
    transformDirPercentage: 0,
    transitionDuration:0,
  });


  const [cardCount,setCardCount] = useState<number>(0);
  const [prevButtonActive, setPrevButtonActive] = useState<boolean>(true);
  const [nextButtonActive, setNextButtonActive] = useState<boolean>(true);
  const [animationDuration, setAnimationDuration] = useState<number>(AnimationDuration);
  const [index,setIndex]= useState<number>(0);

  const ButtonHandler = (dir:'next' | 'prev')=>{
    
    if (index <= 0 && dir === 'prev') return;

    var update = {
      transformDirPercentage: 0,
      transitionDuration:0,
    };

    if (dir === "next") {
      setIndex(index + cardCount);
      update = {
        transformDirPercentage: -AnimPercentage,
        transitionDuration: animationDuration,
      };
    }

    if (dir === "prev") {
      setIndex(index - cardCount);
      update = {
        transformDirPercentage: AnimPercentage,
        transitionDuration: animationDuration,
      };
    }

    console.log(index);

    setTranslateX(update);

    setTimeout(() => {
      setTranslateX({
        transformDirPercentage: 0,
        transitionDuration: 0,
      });

    }, animationDuration);
  }



  const UpdateCardCount = (viewContainerRef: React.RefObject<HTMLDivElement>) => {
    if (viewContainerRef.current) {
      const containerWidth = viewContainerRef.current.clientWidth;
      const newCardCount = Math.floor(
        containerWidth / itemWidht,
      );
      const distance = containerWidth * (AnimPercentage/100);
      const duration = calculateAnimationDuration(distance);
      setAnimationDuration(duration);
      setCardCount(newCardCount);
    }
  };

  const calculateAnimationDuration = (distance: number) => {
    const speed = AnimationDuration / 1000; // Speed in pixels per millisecond
    return distance / speed;
  };

  return {
    isPrevButtonActive:prevButtonActive,
    isNextButtonActive:nextButtonActive,
    curentCardCount:cardCount,
    translateX:translateX,
    onButtonClick: ButtonHandler,
    updateCardCount:UpdateCardCount,
    prevData:[],
    viewData:[],
    nextData:[],
  };
}
