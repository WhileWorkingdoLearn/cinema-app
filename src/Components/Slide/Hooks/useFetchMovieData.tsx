import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import  IMovieListResponse,{ IMovieItem } from "../Data/DataInterfaces";

export default function useFetchMovieData(url:string,key :string):IMovieItem[]{
    const [data,setData] = useState<IMovieItem[]>([]);

    useEffect(() => {
      console.log("FetchMovieDataEffect");
      axios.get<IMovieListResponse>(url,{
        timeout: 3000,
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }).then((response:AxiosResponse) => {
        const movieResponse : IMovieListResponse = response.data; 
        setData(() => movieResponse.items.slice());

     }).catch(
      (reason:any)=> {console.log(reason)}
     );
    },[url,key]);

    return data;
}