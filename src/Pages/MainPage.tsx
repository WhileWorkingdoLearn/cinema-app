import SlideView from "../Components/Slide/View/SlideView";
import useVviewController from "../Components/Slide/Controller/ViewController";
import DataHandler from "../Components/Slide/Data/DataProvider";

function Image() {
  return <div>Hello</div>;
}

function MainPage() {
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
        <SlideView controller={useVviewController()} />
      </div>
    </>
  );
}

export default MainPage;
