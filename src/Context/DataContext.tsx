import {ReactNode} from "react";
import useFetchMovieData from "./useFetchMovieData";
import { IMovieItem } from "./Data/DataInterfaces";
import { ApiKeys, ApiRequestUrls } from "../Environment/Environment";
import { createGenericContext } from "./GenericContext";

// Erstellen des Contexts für den Beispieltyp
const [useMovieDataContext, DataProvider] = createGenericContext<IMovieItem[]>();

// Provider-Komponente
const MovieDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const movieData = useFetchMovieData(
    ApiRequestUrls.TMDB.movieList,
    ApiKeys.TMDB.readerKey,
  );
  
  return (
    <DataProvider value={{data:movieData}}>
      {children}
    </DataProvider>
  );
};

export { MovieDataProvider, useMovieDataContext };

