import SlideView from "../Components/Slide/View/SlideView";
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
          flex: "100",
        }}
      >
        <SlideView controller={config} />
      </div>
    </>
  );
}

export default MainPage;
