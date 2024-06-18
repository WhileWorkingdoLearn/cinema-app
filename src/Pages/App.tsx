import { Outlet } from "react-router-dom";
import CustomHeader from "./CustomHeader";

export default function App(){
    return (<>
            <CustomHeader/>
            <Outlet/>
    </>); 
}