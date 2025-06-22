const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDVhOTcxMDE5ZDY1ZGZkMzg0OWQ4ZGQzOTQ5NWU1YyIsIm5iZiI6MTY0OTI4NDg2Ni4zOTIsInN1YiI6IjYyNGUxNzAyMWY3NDhiMDA2NjZhZWQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DzWDJB38AiEmn7VF4DWVYp4wEe8LB3xuucuhDTBoYqk";
const BASE_URL = "https://api.themoviedb.org/3";

async function fnFetch(url:string){
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        }
    };
    const json = await fetch(url,options).then(res => res.json());
    return json;
    
}
export function getMovie(type:"now_playing"|"upcoming"|"popular"|"top_rated"="now_playing"){
    const url = `${BASE_URL}/movie/${type}?language=en-US&page=1&region=kr`;
    return fnFetch(url)
}
export function getTv(type:"on_the_air"|"airing_today"|"popular"|"top_rated"="on_the_air"){
    const url = `${BASE_URL}/tv/${type}?language=en-US&page=1&region=kr`;
    return fnFetch(url)
}
export function getSearch(type:"movie"|"tv",keywoord:string){
    const url =`${BASE_URL}/search/${type}?query=${keywoord}&include_adult=false&language=en-US&page=1&region=kr`;
    return fnFetch(url);
}

export function getImageUrl(file:string|undefined, type:"original"|"w500"|"w300"|"w200"="original"){
    return file ? `https://image.tmdb.org/t/p/${type}/${file}` : ""
}

export function getMovieDetail(id:string){
    if(!id || id === "") throw new Error("Movie ID is required");
    const url = `${BASE_URL}/movie/${id}?language=en-US`;
    return fnFetch(url)
}
export interface IMovieDetail{
    adult: false,
    backdrop_path: string,
    budget: number,
    genres: {
        id: number,
        name: string
      }[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    first_air_date: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}
export interface IMovie{
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    first_air_date: string,
    title: string,
    name: string,
    video: boolean,
    vote_average: number,
    vote_count: number

}
export interface IMovieData{
    dates: {
        maximum: string,
        minimum: string
      }
    page:number,
    results: IMovie[],
    total_pages: number,
    total_results: number
}
