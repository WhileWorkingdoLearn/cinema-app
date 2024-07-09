
import { IMovieItem } from "../../Data/DataInterfaces";
import "../../View/slideView.css"
import { ItemView } from "./ItemView";


export default function ItemContainer<T>({ data,element}: {
  data: T[],
  element: (data:T) => React.ReactNode;
}) {

    return (
      <div className="Container">
        {data.map((value: T, index: number) => {
          return value ? (
            <div
              key={index}
              className="Item"
             >
               <ItemView key={index} data={value as unknown as IMovieItem}/>
            </div>
          ) : null;
        })}
      </div>
    );
  }
  