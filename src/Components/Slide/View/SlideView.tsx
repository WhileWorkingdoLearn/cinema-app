import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import "./slideView.css";
import { IViewController } from "../Controller/ViewVontroller";
import { IMovieItem } from "../Data/DataProvider";


export default function SlideView(){
  const ButtonEvent = (dir:'prev'|'next')=>{ console.log(dir)};
  return (
    <div className="Frame">
    <div className="Button" onClick={() => {ButtonEvent("prev")}}>Button</div>
    <div className="Viewport">
        <div className="Container">
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
            <div className="Item">Item</div>
        </div>
    </div>
    <div className="Button"  onClick={() => {ButtonEvent("next")}}>Button</div>
</div>
  );
}
/*
function SlideView(params: {
  tiitle: string;
  controller: IViewController<IMovieItem>;
}) {
  const {
    Init,
    curentCardCount,
    translateX,
    updateCardCount,
    onButtonClick,
    renderData,
  } = params.controller;

  const viewContainerRef = useRef<HTMLDivElement>(null);
  const sldeContainerRef = useRef<HTMLDivElement>(null);

  const buttonEvent = (dir: "next" | "prev") => {
    onButtonClick(dir);
  };

  const update = () => {
    updateCardCount(sldeContainerRef);
    
  };

  useEffect(() => {
    Init();
    updateCardCount(sldeContainerRef);
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
            onMouseEnter={() => {
              console.log("enter");
            }}
            onClick={() => {
              buttonEvent("prev");
            }}
          >
            prev
          </button>
          <div className="ViewContainer" ref={viewContainerRef}>
            <ForwardRefCardContainer
              ref={sldeContainerRef}
              containerLength={curentCardCount}
              translateX={translateX}
              renderItems={renderData.prevData}
            />
            <ForwardRefCardContainer
              ref={sldeContainerRef}
              containerLength={curentCardCount}
              translateX={translateX}
              renderItems={renderData.viewData}
            />
            <ForwardRefCardContainer
              ref={sldeContainerRef}
              containerLength={curentCardCount}
              translateX={translateX}
              renderItems={renderData.nextData}
            />
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

function ItemContainer(params: {
  width: number;
  height: number;
  item: string;
}) {
  const width = params.width;
  return (
    <div
      className="ItemContainer"
      style={{
        width: params.width,
        height: params.height,
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/${params.item}`}
        className="Image"
        loading="lazy"
        alt="Epmty"
      />
    </div>
  );
}

const ForwardRefCardContainer = forwardRef<
  HTMLDivElement,
  {
    ref: ForwardedRef<HTMLDivElement>;
    containerLength: number;
    translateX: {
      transformDirPercentage: number;
      transitionDuration: number;
    };
    renderItems?: (IMovieItem|null)[];
  }
>((props, ref) => {

  if(!props.renderItems){
    return  <div
    ref={ref}
    className="SlideContainer"
    style={{
      transform: `translateX(${props.translateX.transformDirPercentage}%)`,
      transition: `${props.translateX.transitionDuration}ms`,
    }}
  >
    {Array.from({ length: props.containerLength }, (_, i) => i).map(
        (value: number) => {
          return (
            <ItemContainer
              key={value}
              height={100}
              width={150}
              item={"item"}
            />
          );
        },
      )}
  </div>
  }

  return (
    <div
      ref={ref}
      className="SlideContainer"
      style={{
        transform: `translateX(${props.translateX.transformDirPercentage}%)`,
        transition: `${props.translateX.transitionDuration}ms`,
      }}
    >
     {
        props.renderItems.map((value:IMovieItem|null,index:number) => {
          if(value=== null) return <div>empty</div>;
        return <ItemContainer width={150} height={100} key={index} item={value.poster_path}/>})
      }
    </div>
  );
});

export default SlideView;

*/