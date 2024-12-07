import axios, { AxiosResponse } from "axios"

export default function getData<P>(url:string):Promise<P>{
    const data = axios.get<P>(url);
    const dataResponse = data.then((response:AxiosResponse<P>) => response.data); 
  return dataResponse;
}