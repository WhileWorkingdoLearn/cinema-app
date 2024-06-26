import { useEffect, useRef } from "react";
import { IviewController } from "../Controller/ViewController";
import "./slideView.css";

export default function SlideView(params: { controller: IviewController }) {
  const {
    slotCountView,
    slotCountSide,
    animTime,
    animPercent,
    onWindowsWidthChange,
    onButtonClick,
  } = params.controller;

  const viewContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sideContainerRef = useRef<HTMLDivElement>(null);

  const ButtonEvent = (dir: "prev" | "next") => {
    console.log(dir);
    onButtonClick(dir, containerRef.current?.clientWidth || 0);
  };

  const update = () => {
    if (viewContainerRef.current) {
      onWindowsWidthChange(viewContainerRef.current.clientWidth || 0);
    }
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="Frame">
      <div
        className="Button"
        onClick={() => {
          ButtonEvent("prev");
        }}
      >
        Button
      </div>
      <div className="Viewport" ref={viewContainerRef}>
        <div
          className="Container"
          ref={containerRef}
          style={{
            transform: `translateX(${animPercent}%)`,
            transition: `${animTime}ms`,
          }}
        >
          <div className="Container Subframe" ref={sideContainerRef}>
            {[...Array(slotCountSide).keys()].map((value) => (
              <div key={value} className="Item">
                prevSide:{value + 1}
              </div>
            ))}
          </div>
          <div className="Container Subframe">
            {[...Array(slotCountView).keys()].map((value) => (
              <div key={value} className="Item">
                viewSide:{value + 1}
              </div>
            ))}
          </div>
          <div className=" Container Subframe">
            {[...Array(slotCountSide).keys()].map((value) => (
              <div key={value} className="Item">
                nextSide:{value + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="Button"
        onClick={() => {
          ButtonEvent("next");
        }}
      >
        Button
      </div>
    </div>
  );
}

/*  
{[...Array(cardCountView).keys()].map((index) => (
            <div className="Item">{index}</div>
          ))} */

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
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const buttonEvent = (dir: "next" | "prev") => {
    onButtonClick(dir);
  };

  const update = () => {
    updateCardCount(viewContainerRef);
  };

  useEffect(() => {
    Init();
    updateCardCount(viewContainerRef);
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
              ref={cardContainerRef}
              containerLength={curentCardCount}
              translateX={translateX}
              renderItems={renderData.prevData}
            />
            <ForwardRefCardContainer
              ref={cardContainerRef}
              containerLength={curentCardCount}
              translateX={translateX}
              renderItems={renderData.viewData}
            />
            <ForwardRefCardContainer
              ref={cardContainerRef}
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
  index: number;
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
    renderItems: IMovieItem[];
  }
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="CardContainer"
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
              index={value}
              item={props.renderItems[value].poster_path}
            />
          );
        },
      )}
    </div>
  );
});

export default SlideView;
*/
