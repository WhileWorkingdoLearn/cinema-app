import { useState } from "react";
import { IMovieItem } from "../../Data/DataInterfaces";

export function ItemView({data}:{data:IMovieItem}){
    const [isLoading,setLoading] = useState<Boolean>(false);
      
    return (
        <>
        {!isLoading ? (<div>No Picture</div>) : null}
        <img
        src={'https://image.tmdb.org/t/p/w200/' + data.poster_path}
        loading="lazy"
        onLoad={() => setLoading(true)}
        onError={() => setLoading(false)}
        alt="No Data"
        style={!isLoading ? { visibility: 'hidden' } : {}}
      />
      </>
      );
}