import {ReactNode} from "react";
import useFetchMovieData from "./useFetchMovieData";
import { IMovieItem } from "./Data/DataInterfaces";
import { ApiRequestUrls } from "../Environment/Environment";
import { createGenericContext } from "./GenericContext";

// Erstellen des Contexts für den Beispieltyp
const [useMovieDataContext, DataProvider] = createGenericContext<IMovieItem[]>();

// Provider-Komponente
const MovieDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiKey = process.env.REACT_APP_TMDB_READERKEY;
  console.log('API Key: ' + apiKey);
  
  const movieData = useFetchMovieData(ApiRequestUrls.Gateway.movieList);
  
  return (
    <DataProvider value={{data:movieData}}>
      {children}
    </DataProvider>
  );
};

export { MovieDataProvider, useMovieDataContext };

