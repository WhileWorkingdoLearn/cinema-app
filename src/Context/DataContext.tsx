import { createContext } from "react";
import useFetchMovieData from "../Components/Slide/Hooks/useFetchMovieData";
import { IMovieItem } from "../Components/Slide/Data/DataInterfaces";
import { ApiKeys, ApiRequestUrls } from "../Environment/Environment";

export const DataContext = createContext<IMovieItem[]>([]);

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = useFetchMovieData(
    ApiRequestUrls.TMDB.movieList,
    ApiKeys.TMDB.readerKey,
  );

  return (
    <>
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    </>
  );
}
