import { useEffect, useRef, useState } from "react";
import useFetchMovieData, {  IMovieItem } from "../Data/DataProvider";
import transformArrayToRenderData from "../Data/DataFormatter";


export interface RenderData<T> {
  prevData: T[];
  viewData: T[];
  nextData: T[];
}

export interface AnimView  { 
  animTime:number,
  animPercent:number
}

export interface RenderView {
  currentItemCount:number,
  containerWidth:number,
  itemWidth: number
}


export interface ControllerConfig {
  baseUrl:string,
  apiKey?:string,
  animDeltaT:number,
}

export interface RenderUpdate<T> {
  prevData: T[];
  viewData: T[];
  nextData: T[];
  animTime:number,
  animPercent:number
}

export default function useViewController(params:{controller:ControllerConfig}){
  const {baseUrl,apiKey,animDeltaT} = params.controller;
  const [renderData,setRenderData] = useState<RenderUpdate<IMovieItem>>({prevData:[],viewData:[],nextData:[],animTime:0,animPercent:0});
  const movieData = useFetchMovieData(baseUrl,apiKey ||'');
  const containerWidthRef = useRef<number>(0);
  const itemWidhtRef = useRef<number>(0);
  const index = useRef<number>(0);
  const itemCount = useRef<number>(0);
  const animTime = useRef<number>(0);
  const animValue = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const deltaTime = animDeltaT;

  useEffect(()=>{
    console.log("ViewControllerEffect");
    updateData();
    //return reset();
  },[movieData]);

  const updateData = () => {
    //console.log("update = datalenght:" + movieData.length + " indexStart: " + index.current + " itemCount: " + itemCount.current);
    const [prev,current,next] = transformArrayToRenderData<IMovieItem>(movieData,index.current,itemCount.current);
      setRenderData({
          prevData:prev,
          viewData:current,
          nextData:next,
          animTime:animTime.current,
          animPercent:animValue.current
        });
  }


  const calcSlidePercentage = (containerWidth:number,currentItemCount:number)=>{

    //console.log("Container Width: " + containerWidth);
    const percentage = Math.ceil((currentItemCount / containerWidth) * (100));
    var slidePercentage = Math.min(percentage,100);
    return slidePercentage;
  }

  const calcAnimTime = (containerWidth:number,currentItemCount:number,deltaTime:number) => {
    const distance = (containerWidth /currentItemCount); 
    const speed = deltaTime / 10000;
    return Math.floor(distance / speed);
  }

  const calculateItemCount = (containerWidth:number,itemWidth:number) => {
    containerWidthRef.current = containerWidth;
    itemWidhtRef.current = itemWidth;
    //console.log("container: " + containerWidthRef.current + " itemWidth: " + itemWidhtRef.current);
    const newCardCount = Math.max(Math.round(containerWidth / itemWidth), 1);
    itemCount.current = newCardCount;
    updateData();
  }

  
  const animateSlide = (dir:'prev'| 'next')=>{
    //console.log("indexPre" + index.current);
    if(dir === 'prev'){
      if (index.current > 0) {
        index.current = index.current - itemCount.current;
      } else {return}
    }
  
    if(dir === 'next'){
      if (index.current < movieData.length - 1) {
        index.current = index.current + itemCount.current;
      } else {return}
    };

    //console.log("indexAfter" + index.current);
      const itemWidth = itemWidhtRef.current; // Width + margin
       animValue.current = dir === 'next' ? -itemCount.current * itemWidth +20 : itemCount.current * itemWidth +20;
       animTime.current = 2500;
  
      //updateData();
      setRenderData({
        prevData:renderData.prevData,
        viewData:renderData.viewData,
        nextData:renderData.nextData,
        animPercent: animValue.current,
        animTime: animTime.current
      });
    
      timerRef.current = setTimeout(()=> {
        const update = () => {
          animTime.current = 0;
        animValue.current = animValue.current;
        updateData();
        }
        update()
      },animTime.current);

      
  };

  console.log("VieCOntrollerRender");

  return { 
    renderUpdate:renderData,
    updateIndex:animateSlide,
    updateViewSize:calculateItemCount
  }
}