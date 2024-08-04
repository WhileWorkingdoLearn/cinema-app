import { error } from "console";
import App from "../Pages/App";
import Blank from "../Pages/Blank";
import ComingSoon from "../Pages/ComingSoon"
import ErrorMsg from "../Pages/Error";
import MainPage from "../Pages/MainPage"
import SneakPeek from "../Pages/SneekPeek"

export const ApiKeys = {
    TMDB:{
    readerKey : 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njg5YjMxMWNjY2QxYmU0YWUyZGEzNWEyMWI3M2Q4ZSIsIm5iZiI6MTcxOTA3MTgzMS4yMTIzNDYsInN1YiI6IjY2NzZmMzEzYzUwYjMyNmY5YzJiMzkzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VzCtZmWR-DY6JA9JKYahfecEiecInx329jvWiM0Jv1s',
    apiKey:'7689b311cccd1be4ae2da35a21b73d8e'
    }
}
export const ApiRequestUrls = {
    TMDB:{
        movieList: 'https://api.themoviedb.org/3/list/8304403?language=en-US&page=1',
        trailerlist: 'https://api.themoviedb.org/3/movie/',
        pictures: 'https://image.tmdb.org/t/p/w200/'
    },
    Youtube:{
        video: 'https://www.youtube.com/watch?v=',
        img: 'https://img.youtube.com/vi/'
    }
}

 const RoutConfig = { 
    Main: {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"/main",
                element: <MainPage/>
            },
            {
                path:"/soon",
                element: <ComingSoon/>
            },
            {
                path:"/sneakPeek",
                element: <SneakPeek/>
            }],
            errorElement:<ErrorMsg/>
  }
}

export default RoutConfig;

