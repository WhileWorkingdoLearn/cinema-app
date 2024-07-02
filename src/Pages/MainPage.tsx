import SlideView from "../Components/Slide/View/SlideView";
import useViewController, { ControllerConfig } from "../Components/Slide/Controller/ViewController";
import { ApiKeys, ApiRequestUrls } from "../Environment/Environment";


function Image() {
  return <div>Hello</div>;
}




function MainPage() {

  const config  = {
    baseUrl:ApiRequestUrls.TMDB.movieList,
    apiKey: ApiKeys.TMDB.readerKey,
    animDeltaT:500,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
          flex: "100",
        }}
      >
        <SlideView controller={config} />
      </div>
    </>
  );
}

export default MainPage;
