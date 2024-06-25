import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { ApiKeys } from "../../../Environment/Environment";
import slice from "../../../Redux/slice";

export interface IDataProvider<T> {
  fetchData: () => void;
  data: T;
}

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

export function GetDataAxios<T extends {}>(
  url: string,
  onDataCHanged: (data: T) => void,
) {
  const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/list/",
    timeout: 3000,
    headers: {
      Authorization: `Bearer ${ApiKeys.TMDB.readerKey}`,
    },
  });

  async function axiosGetJsonData(url: string) {
    try {
      const response: AxiosResponse = await client.get(url);
      const responseData: T = response.data;
      console.log(responseData);
      onDataCHanged(responseData);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  axiosGetJsonData(url);
}

//IMovieListResponse
export default function DataHandler(): IDataProvider<IMovieItem[]> {
  const [movieData, setMovieData] = useState<IMovieItem[]>();
  //"8304403?language=en-US&page=1"
  const fetchAxios = () => {
    GetDataAxios<IMovieListResponse>(
      "8304403?language=en-US&page=1",
      MapMovieListToDataFields,
    );
  };

  const MapMovieListToDataFields = (data: IMovieListResponse) => {
    setMovieData(data.items.slice());
  };

  return {
    fetchData: () => {
      fetchAxios();
    },
    data: movieData,
  } as IDataProvider<IMovieItem[]>;
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
