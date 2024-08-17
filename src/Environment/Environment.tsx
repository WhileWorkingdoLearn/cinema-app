
import App from "../Pages/App";
import ComingSoon from "../Pages/ComingSoon"
import ErrorMsg from "../Pages/Error";
import MainPage from "../Pages/MainPage"
import SneakPeek from "../Pages/SneekPeek"


export const ApiRequestUrls = {
    Gateway:{
        movieList: 'http://localhost:4000/movies/123456789',
        trailerlist: 'http://localhost:4000/movies/trailers/',
        pictures: 'https://image.tmdb.org/t/p/w200/'
    },

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

