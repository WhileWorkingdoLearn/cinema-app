import { useEffect, useState } from "react";

export default function useItemCalculator(viewSize:number,itemSize:number){
    const [itemCount,setItemCount] = useState<[number,number]>([0,0]);
  
    const onWindowSizeChanged = () => {
       const countOfItemsInView = Math.max(Math.floor(viewSize / itemSize),1);
       const countItemsOutOfView = Math.max(countOfItemsInView - 1,1);
       console.log("onWindowSizeChanged = width:" + viewSize  + " itemWidth: " +itemSize + " " + countOfItemsInView + " : " + countItemsOutOfView + " = " + (countOfItemsInView + (countItemsOutOfView *2)));
       setItemCount([countOfItemsInView,countOfItemsInView + (countItemsOutOfView *2)]);
    };
  
    useEffect(() => {
      console.log("SlideViewEffect");
      onWindowSizeChanged();
      window.addEventListener("resize", () => {
        onWindowSizeChanged();
      });
      return () => {
        window.removeEventListener("resize", () => {
          onWindowSizeChanged();
        });
      };
    }, [viewSize,itemSize]);
  
    return itemCount;
  }