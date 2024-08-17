import "../../View/slideView.css";

export default function ItemContainer<T>({
  data,
  element,
  onItemClicked,
}: {
  data: T[];
  element: (data: T) => React.ReactNode;
  onItemClicked?: (data: T) => void;
}) {
  return (
    <div className="Container">
      {data.map((value: T, index: number) => {
        return value ? (
          <div
            key={index}
            className="Item"
            onClick={(e) => {
              e.preventDefault();
              if (onItemClicked) {
                onItemClicked(value);
              }
            }}
          >
            {element(value)}
          </div>
        ) : null;
      })}
    </div>
  );
}
