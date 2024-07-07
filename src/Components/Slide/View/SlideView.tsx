import { CSSProperties, useRef } from "react";
import "./slideView.css";
import { SlideButton } from "./SlideButton";
import useItemCalculator from "../Hooks/useItemCalculator";
import useFetchMovieData from "../Hooks/useFetchMovieData";
import { ApiKeys, ApiRequestUrls } from "../../../Environment/Environment";
import useDataToView from "../Hooks/useDataToView";


export default function Slide(){


  const ContainerStyle: CSSProperties = {
    display:"flex",
    height:'20rem',
    width:'100%',
    backgroundColor:'blue',
    justifyContent:'center'
  }
  const ViewStyle: CSSProperties = {
    display:"flex",
    width: '80%',
    backgroundColor:'red',
    justifyContent:'center',
    overflow:'hidden'
  }

  const SlideStyle :CSSProperties = {
    display:'flex',
    width:'100%',
    justifyContent:'center',
  }

  const ItemStyle :CSSProperties = {
    color:'white',
    margin: '2px',
    padding:'2px',
    height:'100%',
    flex: '0 0 200px',
    backgroundColor:'gray',
    objectFit: 'contain',
    textAlign:'center'
  }

  const AnimStyle : CSSProperties = {
    transform:'translate3d(-116, 0, 0)'
  }

  const viewRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<number>(0);
  const [itemCount,totalCount] = useItemCalculator(viewRef.current?.clientWidth || 1024,200);
  const data = useFetchMovieData(ApiRequestUrls.TMDB.movieList,ApiKeys.TMDB.readerKey);
  const viewData = useDataToView(data,indexRef.current,totalCount || 0);
  const onIncrease = (amount:number) => {
    const numberOfSlides = Math.ceil(data.length / itemCount);
    const indexVal = (indexRef.current * amount);

    if(amount < 0 && indexVal <= 0){
      indexRef.current = numberOfSlides;
    }  
      
    indexRef.current = indexRef.current + amount;      
    
    if(amount > 0 && indexVal >= numberOfSlides){
      indexRef.current = 0;      
    } 

    console.log("NumberOfSlides: " + numberOfSlides + " Amount: " + amount +  " IndexVal: " + indexVal);
    //indexRef.current = indexRef.current + index;
  }
  console.log(viewData);
  return (
  <div style={ContainerStyle} className="Conainer">
    <SlideButton increase={true} amount={itemCount} label="&#10094;" onClickCallback={onIncrease}/>
    <div style={ViewStyle} className="View" ref={viewRef}>
      <div style={SlideStyle}> 
       {viewData.map((value,index) =>  value ? <img loading="lazy" style={ItemStyle} key={index} src={ApiRequestUrls.TMDB.pictures +value.poster_path}></img> : <div key={index} style={ItemStyle}>No Item</div>) || null}
    </div>
    </div>
    <SlideButton increase={false} amount={itemCount} label="&#10095;" onClickCallback={onIncrease}/>
  </div>);
}

/// {Array.from(Array(itemCount).keys()).map((value:number)=> <img style={ItemStyle}>Item + {value}</img> )}
/*
import { useCallback, useEffect, useRef, useState } from "react";
import "./slideView.css";

import { throttle } from "lodash";
import ContainerSlide from "./ContainerSlide";
import { SlideButton } from "./Slideutton";


export interface ControllerConfig {
  baseUrl: string;
  apiKey?: string;
  animDeltaT: number;
}


export default function SlideView<T extends {},N extends React.ReactNode>({
  controller,
  dataProvider,
  itemView
}: {
  controller: {
    baseUrl: string,
    apiKey: string,
    animDeltaT: number,
  };
  dataProvider:(url:string,key:string) => T[];
  itemView:(input:T) => N;
}) {
  console.log("SlideViewRender");
  const AnimtTime = 1500;
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const itemWidth = useRef<number>(0);
  const movieData =dataProvider(controller.baseUrl,controller.apiKey);
  const [itemCount, setItemCount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [animState, setAnimState] = useState<"Left" | "None" | "Right">(
    "None",
  );

  useEffect(() => {
    console.log("SlideViewEffect");
    const onWindowSizeChanged = () => {
      console.log("onWindowSizeChanged");
      if (viewContainerRef.current) {
        itemWidth.current = Math.max(window.innerWidth / 10, 250);
        const newCardCount = Math.max(
          Math.ceil(viewContainerRef.current.offsetWidth / itemWidth.current) +1,
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
        label="&#10094;"
        amount={itemCount}
        increase={true}
        onClickCallback={updateView}
      />
      <div className="Viewport" ref={viewContainerRef}>
        <ContainerSlide
          data={{data:movieData,item:itemView}}
          itemCount={itemCount}
          index={index}
          animTime={AnimtTime}
          itemWidth={itemWidth.current}
          anim={animState}
        />
      </div>
      <SlideButton
        label="&#10095;"
        amount={itemCount}
        increase={false}
        onClickCallback={updateView}
      />
    </div>
  );
}
*/