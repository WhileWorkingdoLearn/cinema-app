import { ForwardedRef, forwardRef, ReactNode, useEffect, useRef} from "react";
import "./slideView.css";
import { IViewController } from "../Controller/ViewVontroller";
import { IMovieItem } from "../Data/DataProvider";

function ItemContainer(params: {width: number; height: number; index: number,item:string }) {
  const width = params.width;
  return (<div
        className="ItemContainer"
        style={{
          width: params.width,
          height: params.height,
        }}
      >
      <img src={`https://image.tmdb.org/t/p/w300/${params.item}`} className="Image"/>
      </div>);
}


const ForwardRefCardContainer = forwardRef<HTMLDivElement,{ref:ForwardedRef<HTMLDivElement>, containerLength:number, translateX:{
  transformDirPercentage: number;
  transitionDuration: number;
}, renderItems:IMovieItem[]}>(  
  (props, ref) => {
    return  (<div
      ref={ref}
      className="CardContainer"
      style={{
        transform:`translateX(${props.translateX.transformDirPercentage}%)`,
        transition:`${props.translateX.transitionDuration}ms`
      }}
    >
      {Array.from({ length: props.containerLength }, (_, i) => i ).map(
        (value: number) => {
          return (
            <ItemContainer key={value} height={100} width={150} index={value} item={'lNz2Ow0wGCAvzckW7EOjE03KcYv.jpg'}/>
          );
        },
      )}
    </div>);;
});


function SlideView(params: { tiitle: string, controller:IViewController}) {

  const {
    curentCardCount,
    isNextButtonActive,
    isPrevButtonActive,
    translateX,
    updateCardCount,
    onButtonClick,
    prevData,
    viewData,
    nextData,
    
  } = params.controller;

  const viewContainerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef =  useRef<HTMLDivElement>(null);

  const buttonEvent = (dir: "next" | "prev") => {

    if (isNextButtonActive || isPrevButtonActive) {
      onButtonClick(dir);
      
    }
  };

  const update = ()=> {
    updateCardCount(viewContainerRef);
  }


  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div className="MainFrame">
        <header>
          <div className="Title"> {params.tiitle}</div>
        </header>
        <div className="ComponentGrid">
          <button
            className="SlideButtonLeft"
            onMouseEnter={()=> {
              console.log('enter');
            }}
            onClick={() => {
              buttonEvent("prev");
            }}
          >
            prev
          </button>
          <div className="ViewContainer" ref={viewContainerRef}>
              <ForwardRefCardContainer ref={cardContainerRef} containerLength={curentCardCount} translateX={translateX} renderItems={prevData}/>
              <ForwardRefCardContainer ref={cardContainerRef} containerLength={curentCardCount} translateX={translateX} renderItems={viewData}/>
              <ForwardRefCardContainer ref={cardContainerRef} containerLength={curentCardCount} translateX={translateX} renderItems={nextData}/>
          </div>          
          <button
            className="SlideButtonRight"
            onClick={() => {
              buttonEvent("next");
            }}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default SlideView;
