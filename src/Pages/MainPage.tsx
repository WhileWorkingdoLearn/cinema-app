import { ItemView } from "../Components/Slide/View/ItemViews/ItemView";
import Slide from "../Components/Slide/View/SlideView";
import DataContextProvider from "../Context/DataContext";

function MainPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <DataContextProvider>
          <Slide
            Item={(props) => ItemView({ data: props })}
            onItemClicked={(clickedData) => {
              console.log(clickedData);
            }}
          />
        </DataContextProvider>
      </div>
    </>
  );
}

export default MainPage;
//<SlideView controller={config} dataProvider={useFetchMovieData} itemView={(props) => ItemView({data:props})}/>
