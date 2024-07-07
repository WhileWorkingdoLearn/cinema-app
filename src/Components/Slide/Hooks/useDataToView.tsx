import { useEffect, useState } from "react";
import { GenericArray } from "../Data/DataFormatter";

export default function useDataToView<T>(array:T[],index:number,fieldSize:number){
    const [renderView,setRenderView] = useState<T[]>([]);

    function dataToView<T>(array: GenericArray<T>, index: number, fieldSize: number): T[] {
        if (index < 0 || index >= array.length) {
            index = 0;
        }
        console.log(array.length);
            const start = index - (Math.min(fieldSize - 1,1))
            const result : Array<T> = [];
            for (let i = 0; i < fieldSize; i++) {
                result.push(array[(start + i + array.length) % array.length]);
            }
            
     return result;
    }

    useEffect(()=> {
            const viewData = dataToView(array,index,fieldSize);
            setRenderView(viewData);

    },[array,index,fieldSize]);
    
    return renderView;
}

