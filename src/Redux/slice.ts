import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface IMovie {
    id:string,
    title:string,
    image:string
}

interface IMovieList {
    movies:IMovie[]
}

const initialStateMovies : IMovieList = {
    movies: []
}

export const movieActions = createSlice({
    name:'moviehandler',
    initialState:initialStateMovies,
    reducers: {
        increment:(state, action:PayloadAction<IMovie>)=> {
            state.movies.push(action.payload);
        },
        decrement:(state, action:PayloadAction<IMovie>)=> {
            state.movies.find((movie)=>(movie !== action.payload));
        }
    }
})

export  const {increment, decrement} = movieActions.actions;

export const movieHandler = (state:RootState) => state.moviehandler;

export default movieActions.reducer;


