import axios from "axios";
import { useEffect, useState } from "react";
import { ApiKeys } from "../../../Environment/Environment";

export interface IDataProvider {
        fetchData:()=> void,
        getData: IMovieItem[]
}

export interface IMovieItem {
    id: number;
    overview:string;
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

export default function DataHandler():IDataProvider {
    const [data,setData] = useState<IMovieItem[]>([]);
    const client = axios.create({
        baseURL:'https://api.themoviedb.org/3/list/',
        timeout:1000,
        headers: { Authorization: `Bearer ${ApiKeys.TMDB.readerKey}` }
    });

    const getData = () => {
        client.get<IMovieListResponse>('8304403?language=en-US&page=1').then(response => {
            console.log(response.data.items);
            setData(response.data.items);
        }
        ).catch();
    }

    return {
        fetchData:() =>{
           getData();
        },
        getData:data
    };
}