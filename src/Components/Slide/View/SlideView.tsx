import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AnimView, ControllerConfig, RenderData, RenderUpdate } from "../Controller/ViewController";
import "./slideView.css";
import useFetchMovieData, { IMovieItem } from "../Data/DataProvider";
import {  ApiRequestUrls } from "../../../Environment/Environment";
import { throttle } from "lodash";
import transformArrayToRenderData from "../Data/DataFormatter";

function SlideButton({
  label,
  amount,
  increase,
  onClickCallback
}:{
    label:string,
    amount:number,
    increase:boolean,
    onClickCallback: (index:number) => void,
    //setFunction:React.Dispatch<React.SetStateAction<number>>
  }){
    return (<div className="Button" onClick={
    ()=> {
      const value = !increase ? amount : -amount;
      onClickCallback(value);
    }
  }>{label}</div>);
}

function ContainerSlide({
  data,
  index,
  itemWidth,
  itemCount,
  anim,
  animTime
}:
  {
    data:IMovieItem[],
    index:number,
    itemWidth:number,
    itemCount:number,
    anim: 'Left' | 'None' | 'Right'
    animTime:number
  }){
  const animValueRef = useRef<number>(0);
  const animTimeRef = useRef<number>(0);

   useEffect(() => {
    animValueRef.current = itemCount* itemWidth +2;
    animTimeRef.current = animTime;
   },[itemWidth]); 

   /*
   useEffect(()=> {
    const [prev,current,next] = transformArrayToRenderData<IMovieItem>(data,index,itemCount);
    updateView(prev,current,next);
   },[anim]);
*/
  const updateView = (prev:IMovieItem[],current:IMovieItem[],next:IMovieItem[])=> {
    //setRenderUpdate({prevData:prev,viewData:current,nextData:next});
  }


  const [prev,current,next] = transformArrayToRenderData<IMovieItem>(data,index,itemCount);
  if(anim){
    //const [prev,current,next] = transformArrayToRenderData<IMovieItem>(data,index,itemCount);
  if(anim === 'Left'){
    animValueRef.current =  110;
  }
  
  if(anim === 'None'){
    animValueRef.current = 0;
    animTime = 0;
  }

  if(anim === 'Right'){
    animValueRef.current =  -110;
  }
 // updateView(prev,current,next);
}


  return (<div className="SlideAnimFrame"  style={{
    transform: `translateX(${animValueRef.current}%)`,
    transition: `${animTime}ms`,
  }}>
<div
  className="Container">
      <ItemContainer data={prev} />
      <ItemContainer data={current} />
      <ItemContainer data={next} />
</div>
</div>);
}

function ItemContainer({data}:{data:IMovieItem[]}){ 
  
  return <div className="Container Subframe">
  {
      data.map((value:IMovieItem,index:number) => {             
        return value ?<div key={index} className="Item"  onClick={() =>{console.log("Item clicked")}}>
        <img src={ApiRequestUrls.TMDB.pictures + value.poster_path} alt="Image"/>
      </div>: <div key={index} className="Item" >No Item</div>;
      })
      }
  </div>;
}

export default function SlideView({controller}:
{
  controller:ControllerConfig
}
) {
  console.log("SlideViewRender");
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const movieData = useFetchMovieData(controller.baseUrl,controller.apiKey ||"");
  const [itemCount,setItemCount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [animeState,setAnimState] = useState<'Left'|'None'|'Right'>('None');

  useEffect(()=>{
    console.log("SlideViewEffect");
    const onWindowSizeChanged = () =>{
      console.log("onWindowSizeChanged");
      if(viewContainerRef.current){
       const newCardCount = Math.max(Math.round(viewContainerRef.current.clientWidth/ (window.innerWidth / 10)), 1);
        setItemCount(newCardCount);
      }
    };
    onWindowSizeChanged();
    window.addEventListener("resize",() => {onWindowSizeChanged()});
  return () => {
    window.removeEventListener("resize",() => {onWindowSizeChanged()});
  };
  },[]);

  const handleWheel = (event:WheelEvent) => {
    event.preventDefault();
    if(event.deltaY > 0){ 
        updateView(itemCount);
    } else {
     // updateIndex('prev');
     updateView(-itemCount);
    }
  };

  const throttledInput = throttle((e) => {handleWheel(e)},300);

  const updateView = (amount:number) =>{
    if(amount < 0 && index <= 0) return;
    if(amount > 0 && index >= movieData.length -1) return;
    const newIndex = index + amount; 
   console.log(newIndex);
   if(amount < 0) {
    setAnimState('Left');
   }
   if(amount > 0){
    setAnimState('Right');
   }

   setTimeout(()=>{
    const newIndex = index + amount;
    setIndex(newIndex); 
    resetAnim();
   },2500);
  }

  const resetAnim = () => {
    setAnimState('None');
  }

  return (
    <div className="Frame"  onWheel={throttledInput}>
      <SlideButton label="prev" amount={itemCount} increase={true} onClickCallback={updateView}/>
      <div className="Viewport" ref={viewContainerRef}>
          <ContainerSlide data={movieData} itemCount={itemCount} index={index} animTime={2000} itemWidth={window.innerWidth / 10} anim={animeState} />
      </div>
      <SlideButton label="next" amount={itemCount} increase={false} onClickCallback={updateView}/>
    </div>
  );
}

function uuseMemo(arg0: () => [IMovieItem[], IMovieItem[], IMovieItem[]], arg1: IMovieItem[][]): [any, any, any] {
  throw new Error("Function not implemented.");
}

