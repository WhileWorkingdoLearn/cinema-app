import { IMovieItem } from "../../../../Context/Data/DataInterfaces";

export function ItemView({ data }: { data: IMovieItem }) {
  const isLoading = true;
  //console.log("Render");
  return (
    <>
      {!isLoading ? <div>No Picture</div> : null}
      <img
        src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
        loading="lazy"
        alt="No Data"
        style={!isLoading ? { visibility: "hidden" } : {}}
      />
    </>
  );
}
