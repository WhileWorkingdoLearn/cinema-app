import { useState } from "react";

export default function useAnimCalculator() {
  const [animValues, setAnimValues] = useState<[number, number]>([0, 0]);
  return animValues;
}
