
import { useState, useEffect } from "react";
import { IMovieItem } from "./Data/DataInterfaces";
import getData from "../Services/DataReceiver";

export default function useFetchMovieData(url:string):IMovieItem[]{
    const [data,setData] = useState<IMovieItem[]>([]);

    useEffect(() => {
      getData<IMovieItem[]>(url).then((data) => {
      console.log("FetchMovieDataEffect");
      setData(data);
    });
    },[url]);

    return data;
}