import { useState } from "react";

export interface IviewController {
  itemWidth: number;
  slotCountView: number;
  slotCountSide: number;
  animTime: number;
  animPercent: number;
  onWindowsWidthChange: (xLength: number) => void;
  onButtonClick: (dir: "next" | "prev", containerX: number) => void;
}

export default function useVviewController(): IviewController {
  const [slotCountView, setSlotCountView] = useState<number>(0);
  const [slotCountSide, setSlotCountSide] = useState<number>(0);
  const [animPercent, setAnimPercent] = useState<number>(0);
  const [animTime, setAnimTime] = useState<number>(0);

  const itemWidth = 150;
  const dTimeMS = 500;
  const cardRangeSlide = 2;

  const updateSlotCount = (containerWidth: number) => {
    const newCardCount = Math.max(Math.ceil(containerWidth / itemWidth), 1);
    setSlotCountView(newCardCount);
    const sideCardCount = Math.max(newCardCount, 2);
    setSlotCountSide(sideCardCount);
  };

  const inputEvent = (dir: "next" | "prev", containerX: number) => {
    console.log(dir);
    const containerWidht = containerX;

    const slidePercentage = Math.min(
      Math.floor(((itemWidth * cardRangeSlide) / containerWidht) * 100),
      100,
    );

    console.log("slide :" + slidePercentage + " %");
    const sideDir = dir === "next" ? -slidePercentage : slidePercentage;
    setAnimPercent(sideDir);
    const distance = Math.floor((containerWidht / 100) * slidePercentage);
    console.log("distance: " + distance);
    const speed = dTimeMS / 1000;
    const deltaTime = distance / speed;
    setAnimTime(deltaTime);
    console.log("deltaT: " + deltaTime);

    setTimeout(() => {
      setAnimPercent(0);
      setAnimTime(0);
    }, deltaTime);
  };

  return {
    itemWidth: itemWidth,
    slotCountView: slotCountView,
    slotCountSide: slotCountSide,
    animTime: animTime,
    animPercent: animPercent,
    onWindowsWidthChange: updateSlotCount,
    onButtonClick: inputEvent,
  };
}
