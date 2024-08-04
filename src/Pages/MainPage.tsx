import { useState } from "react";
//import MovieDetail from "../Components/MovieDetail/View/MovieDetail";
import { IMovieItem } from "../Context/Data/DataInterfaces";
import Slide from "../Components/MovieSlide/View/SlideView";
import {MovieDataProvider }from "../Context/DataContext";
import MovieRoom, { IRowSegment } from "../Components/SeatSelection/View/MovieRoom";

function MainPage() {
  const [itemSelected,setItemSelected] = useState<IMovieItem>();
  //  <MovieDetail props={itemSelected}/>

  
const roomRows : IRowSegment[][] = [
  [
      {
          startNumber:0,
          range:2,
          display:false
      },
      {
          startNumber:1,
          range:8,
          display:true
      },
      {
          startNumber:0,
          range:2,
          display:false
      }
  ],
  [
      {
          startNumber:9,
          range:12,
          display:true
      }
  ],
  [
    {
        startNumber:21,
        range:12,
        display:true
    }
],
[
  {
    startNumber:0,
    range:1,
    display:false
  },
  {
      startNumber:33,
      range:3,
      display:true
  },
  {
    startNumber:0,
    range:4,
    display:false
  },
  {
    startNumber:36,
    range:3,
    display:true
},  {
  startNumber:0,
  range:1,
  display:false
}
],
[
  {
    startNumber:0,
    range:1,
    display:false
  },
  {
      startNumber:39,
      range:10,
      display:true
  },
  {
    startNumber:0,
    range:1,
    display:false
  }
],
]

  return (
    <MovieDataProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >

       <Slide onItemClicked={(data:IMovieItem)=> {
        console.log("Tata");
        setItemSelected(data);
       } }/>

       <MovieRoom roomLayout={roomRows}/>
      </div>
      </MovieDataProvider>
  );
  }

  export default MainPage;