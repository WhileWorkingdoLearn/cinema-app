import { error } from "console";
import App from "../Pages/App";
import Blank from "../Pages/Blank";
import ComingSoon from "../Pages/ComingSoon"
import ErrorMsg from "../Pages/Error";
import MainPage from "../Pages/MainPage"
import SneakPeek from "../Pages/SneekPeek"

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