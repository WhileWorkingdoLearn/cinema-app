import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IMovieTrailer,IMovieTrailerRespone} from "../../../Context/Data/DataInterfaces";

export default function useFetchMovieTrailer(url:string,key:string){
    const [movieTrailers,setMovieTrailers] = useState<IMovieTrailer[]>([]);
    useEffect(()=>{
        axios.get<IMovieTrailerRespone>(url,{
            timeout: 3000,
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }).then((response:AxiosResponse) => {
            const movieTrailerResponse: IMovieTrailerRespone =response.data;
            setMovieTrailers(movieTrailerResponse.results.slice());   
         }).catch(
          (reason:any)=> {console.log(reason)}
         );
    },[url,key]);

    return movieTrailers;
}