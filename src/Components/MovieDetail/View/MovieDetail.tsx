import { ApiRequestUrls } from "../../../Environment/Environment";
import { IMovieItem} from "../../../Context/Data/DataInterfaces";
import useFetchMovieTrailer from "../Hooks/useFetchMovieTrailer";
import  "./MovieDetail.css"
import ReactPlayer from 'react-player/youtube'
import {  useState } from "react";

export function MovieImage({url,onTrailerClicked}:{url:string,onTrailerClicked:()=>void}){
    return <img style={{padding:'2px'}} src={url} onClick={()=> {onTrailerClicked()}}></img>
}

export function MovieTrailers({movieId}:{movieId:number}){
    const movies = useFetchMovieTrailer(ApiRequestUrls.Gateway.trailerlist + movieId); 
    const [trailer,setTrailer] =  useState<string>(movies.trailerPaths[0] || '');

    const updateTrailerUrl = (url:string)=>{
        setTrailer(url);
    }

   return (
        <div>
        <   div className="player-wrapper">
                <ReactPlayer className='react-player' width='100%' height='100%' volume={0} controls={true} style={{padding:'2px', justifyContent:'center'}} url={trailer} pip={true} stopOnUnmount={false}/>
            </div>  
            <div className="Flex">
            {
             movies.imagePaths.map((value,index) => {
                return <MovieImage url={value} onTrailerClicked={()=> {
                        updateTrailerUrl(movies.trailerPaths[index]);
                }}/>
            })
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