import { useEffect, useState } from "react";

export default function useItemsInViewCalculator(viewSize: number, itemSize: number) {
  const [itemCount, setItemCount] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    console.log("SlideViewEffect");
    const onWindowSizeChanged = () => {
      const countOfItemsInView = Math.max(Math.floor(viewSize / itemSize), 1);
      const countItemsOutOfView = Math.max(countOfItemsInView - 1, 1);
      setItemCount([
        countOfItemsInView,
        countOfItemsInView + countItemsOutOfView * 2,
      ]);
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
  }, [viewSize, itemSize]);

  return itemCount;
}
