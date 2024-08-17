
import { useEffect, useState } from "react";
import getData from "../../../Services/DataReceiver";
import { IMovieTrailer } from "../../../Context/Data/DataInterfaces";


export default function useFetchMovieTrailer(url:string):IMovieTrailer{
    const [movieTrailers,setMovieTrailers] = useState<IMovieTrailer>({provider:'',trailerPaths:[],imagePaths:[]});
    useEffect(()=>{
      getData<IMovieTrailer>(url).then((data) => {
        console.log("FetchMovieDataEffect");
        
        setMovieTrailers(data);
      }).catch(()=>{});
    },[url]);

    return movieTrailers;
}