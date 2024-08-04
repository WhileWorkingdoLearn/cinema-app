import { ApiKeys, ApiRequestUrls } from "../../../Environment/Environment";
import { IMovieItem, IMovieTrailer } from "../../../Context/Data/DataInterfaces";
import useFetchMovieTrailer from "../Hooks/useFetchMovieTrailer";
import  "./MovieDetail.css"
import ReactPlayer from 'react-player/youtube'
import { useEffect, useState } from "react";

export function MovieImage({url,onTrailerClicked}:{url:string,onTrailerClicked:()=>void}){
    return <img style={{padding:'2px'}} src={url} onClick={()=> {onTrailerClicked()}}></img>
}

export function MovieTrailers({movieId}:{movieId:number}){
    const movies = useFetchMovieTrailer(ApiRequestUrls.TMDB.trailerlist + movieId + "/videos",ApiKeys.TMDB.readerKey);
    const [trailerUrl,setTrailerUrl] = useState<string[]|string>();

    useEffect(()=>{
        if(movies && movies.length > 0){
           const trailers = movies.filter((value:IMovieTrailer) => {
                return value.type === 'Trailer';
              }).map((trailer)=> {
                return ApiRequestUrls.Youtube.video + trailer.key;
              });
            if(trailers.length > 0){
                updateTrailerUrl(trailers);
            }
        }
    },[movies])

    const updateTrailerUrl = (id:string[] | string) => {
        setTrailerUrl(ApiRequestUrls.Youtube.video + id);   
    }


    return (
        <div>
        <   div className="player-wrapper">
                <ReactPlayer className='react-player' width='100%' height='100%' volume={0} controls={true} style={{padding:'2px', justifyContent:'center'}} url={trailerUrl} pip={true} stopOnUnmount={false}/>
            </div>  
            <div className="Flex">
            {
             movies.filter((value:IMovieTrailer) => {
                return value.type === 'Trailer';
              }).map((value => {
                const path = ApiRequestUrls.Youtube.img + value.key +'/default.jpg'
                return <MovieImage url={path} onTrailerClicked={()=> {
                        updateTrailerUrl(value.key);
                }}/>
            }))
        }
        </div>
    </div>
    );

}

export default function MovieDetail({props}:{props:IMovieItem|undefined}){
    const id = props ? props?.id : '';
    const MovieTrailerComponent = id ? <MovieTrailers movieId={id}/> : <div>No Trailer</div>
   
    return (<div className="container">
        <div className="">
        <h2 className="text" style={{paddingTop:'10px',paddingBottom:'10px',fontSize:'20px'}}>
        {props?.title}
        </h2>
        <div>
        {MovieTrailerComponent}
        </div>
        <div className="text">
            {props?.overview}
        </div>
        </div>
    </div>);
}