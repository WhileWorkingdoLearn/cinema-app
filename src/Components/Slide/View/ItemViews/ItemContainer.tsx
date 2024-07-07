
export interface Input<T> {
    data: T[],
    element: (data:T) => React.ReactNode;
};



export default function ItemContainer<T>({ data,element}:Input<T>) {
    // console.log(data);
  
    return (
      <div className="Container Subframe">
        {data.map((value: T, index: number) => {
          return value ? (
            <div
              key={index}
              className="Item"
              onClick={() => {
                console.log("Item clicked");
              }}
            >
                {element(value)}
            </div>
          ) : (
            <div key={index} className="Item">
              No Item
            </div>
          );
        })}
      </div>
    );
  }
  