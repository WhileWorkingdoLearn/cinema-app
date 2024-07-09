import { useEffect, useRef, useState, ReactNode } from "react";
import "./slideView.css";
import { SlideButton } from "./SlideButton";
import useItemsInViewCalculator from "../Hooks/useItemsInViewCalculator";
import useFetchMovieData from "../Hooks/useFetchMovieData";
import { ApiKeys, ApiRequestUrls } from "../../../Environment/Environment";
import useDataToView from "../Hooks/useDataToView";
import ItemContainer from "./ItemViews/ItemContainer";

export default function Slide({Item}:{Item:(input:any) => ReactNode}) {


  const [index, setIndex] = useState<number>(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [itemCount, totalCount] = useItemsInViewCalculator(
    viewRef.current?.clientWidth || 1024,
    200,
  );

  const data = useFetchMovieData(
    ApiRequestUrls.TMDB.movieList,
    ApiKeys.TMDB.readerKey,
  );
  const { view } = useDataToView(data, index, totalCount || 0);

  const [animation,setAnimation] = useState<'Left'|'None'|'Right'>('None');

 useEffect(()=> {
    setIndex(0);
  },[itemCount])


  const onIncrease = (amount: number) => {
    let leftOrRight : 'Left' | 'None' | 'Right' = 'None';
    if(amount < 0){
      leftOrRight = 'Left';
    }
    if(amount > 0){
      leftOrRight = 'Right';
    } 
    setAnimation(leftOrRight);
  };


  const updateIndex = (dir:number)=>{
    console.log(dir);
    let val = 0;
    if(dir < 0){
      val = index - itemCount + data.length;
    }
    if(dir > 0){
      val = index + itemCount;
    }
    val = val % data.length;
    console.log(val);
    setIndex(val );
    setAnimation("None");
  }

  let cssAnimClass :{transform:number,transition:number} = {
    transform: 0,
    transition:0,
  };

  let dir = 0;   

  if(animation){
    let slideValue = Math.floor((((slideRef.current?.clientWidth || 0)/ itemCount) / (slideRef.current?.clientWidth || 0)) * 100);
    console.log("slideValue " + slideValue + " width " + slideRef.current?.clientWidth + " ");
    if(animation === 'Left'){
      cssAnimClass.transform = 100 - slideValue;
      cssAnimClass.transition = 2000
      dir = -1;
    }
    if(animation === 'Right'){
      cssAnimClass.transform =  - (100 - slideValue);
      cssAnimClass.transition = 2000
        dir = 1;
     } 
    }
    

  return (
    <div  className="Frame">
      <SlideButton
        increase={true}
        amount={1}
        label="&#10094;"
        onClickCallback={(num) => {onIncrease(num)}}
      />
      <div  className="Viewport" ref={viewRef}>
        <div className="Slide" ref={slideRef} style={{transform:`translate3d(${cssAnimClass.transform}%,0,0)`,transition:`${cssAnimClass.transition}ms`}} onTransitionEnd={()=>{updateIndex(dir)}}>
          <ItemContainer data={view} element={Item}/> 
       </div>
      </div>
      <SlideButton
        increase={false}
        amount={1}
        label="&#10095;"
        onClickCallback={(num) => {onIncrease(num)}}
      />
    </div>
  );
}
