
import { IMovieItem } from "../../Data/DataInterfaces";

export function ItemView({data}:{data:IMovieItem}){
    const isLoading =true;
      //console.log("Render");
    return (
        <>
        {!isLoading ? (<div>No Picture</div>) : null}
        <img
        onClick={() => {console.log({
          id:data.id,
          title:data.title,
          overView:data.overview
        });}}
        src={'https://image.tmdb.org/t/p/w200/' + data.poster_path}
        loading="lazy"
        alt="No Data"
        style={!isLoading ? { visibility: 'hidden' } : {}}
      />
      </>
      );
}