import useFetchMovieData, { IMovieItem } from "../Components/Slide/Data/DataInterfaces";
import { ItemView } from "../Components/Slide/View/ItemViews/ItemView";
import Slide from "../Components/Slide/View/SlideView";
import { ApiKeys, ApiRequestUrls } from "../Environment/Environment";

function MainPage() {
  const config = {
    baseUrl: ApiRequestUrls.TMDB.movieList,
    apiKey: ApiKeys.TMDB.readerKey,
    animDeltaT: 500,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
       <Slide Item={(props:IMovieItem) => ItemView({data:props})}/> 
      </div>
    </>
  );
}

export default MainPage;
//<SlideView controller={config} dataProvider={useFetchMovieData} itemView={(props) => ItemView({data:props})}/>