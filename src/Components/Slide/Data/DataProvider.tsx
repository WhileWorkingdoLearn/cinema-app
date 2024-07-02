import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export interface IMovieItem {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
}

export interface IMovieListResponse {
  description: string;
  id: number;
  iso_639_1: string;
  item_count: number;
  items: IMovieItem[];
  name: string;
  page: number;
}

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
        //console.log(movieResponse.items); 
        setData(() => movieResponse.items);

     });
    },[url,key]);

    return data;
}

//https://api.themoviedb.org/3/list/8304403?language=en-US&page=1"


/*
export type MovieGengre = [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ];

    */
