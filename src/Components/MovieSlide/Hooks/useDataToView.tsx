import { useEffect, useState } from "react";

export default function useDataToView<T>(
  array: T[],
  index: number,
  fieldSize: number,
) {
  const [renderView, setRenderView] = useState<T[]>([]);

  function dataToView<T>(data: T[], index: number, feldLength: number): T[] {
    if (index < 0 || index >= array.length) {
      index = 0;
    }
    const countItemsOutOfView = Math.max(feldLength - 2, 2);
    // Create an array to store the result
    const result: T[] = [];

    // Calculate the start position for the subset
    const startIndex =
      (index - countItemsOutOfView + data.length) % data.length;

    // Iterate over the data array and fill the result array
    for (let i = 0; i < feldLength; i++) {
      const currentIndex = (startIndex + i) % data.length;
      result.push(data[currentIndex]);
    }

    return result;
  }

  useEffect(() => {
    const viewData = dataToView(array, index, fieldSize);
    setRenderView(viewData);
  }, [array, index, fieldSize]);

  return { view: renderView };
}
