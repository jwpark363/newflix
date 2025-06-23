import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getImageUrl, getSearch, type IMovie, type IMovieData } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Loading } from "../components/StyledComponents";
const Boxes = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;
const Box = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;
const MovieBox = styled(Box)`
    margin-top: 108px;
    margin-left: 48px
`;
const TvBox = styled(Box)`
    margin-top: 48px;
    margin-left: 48px;
`;
const Title = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    gap: 24px;
    align-items: center;
    font-size: 32px;
    color: ${props => props.theme.white.light};
    select{
        height: 36px;
        font-size: 20px;
        padding: 8px;
        border: none;
        border-radius: 4px;
    }
`
const Item = styled.div`
    width: 300px;
    height: 400px;
    display: grid;
    grid-template-rows: 4fr 1fr;
`;
const ItemImg = styled.div`
    background-size: cover;
    background-position: center center;
    border-radius: 12px;
`;
const ItemInfo = styled.div`
    position: relative;
    padding-top: 12px;
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-radius: 8px;
    background-color: ${props => props.theme.black.heavy};
    color:${props => props.theme.white.dark};
    .title{
        font-size: 24px;
    }
    .year{
        font-size: 18px;
    }
`;
const ItemRate = styled.div`
    position: absolute;
    bottom: 4px;
    right: 10px;
    z-index: 1;
    width: 84px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border:2.8px solid tomato;
    font-size: 16px;
    color: ${props => props.theme.white.light};
`;
interface ISort{
    name:string,
    value:number
}
const SortKey : ISort[] = [
    {
        name:"Popularity",
        value:1
    },
    {
        name:"Issue Date",
        value:2
    }
];
export default function Search(){
    const navigate = useNavigate();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const [movieSortKey, setMovieSortKey] = useState(param.get("movieSortKey") === null ? SortKey[0].value : param.get("movieSortKey")!);
    const [tvSortKey, setTvSortKey] = useState(param.get("tvSortKey") === null ? SortKey[0].value : param.get("tvSortKey")!);
    const [movieItems, setMovieItems] = useState<IMovie[]>([]);
    const [tvItems, setTvItems] = useState<IMovie[]>([]);
    const {data:movieData, isLoading:isLoading1} = useQuery<IMovieData>({
        queryKey:["search-movie",param.get("keyword")!], 
        queryFn: () => getSearch("movie",param.get("keyword")!)})
    const {data:tvData, isLoading:isLoading2} = useQuery<IMovieData>({
        queryKey:["search-tv",param.get("keyword")!], 
        queryFn: () => getSearch("tv",param.get("keyword")!)})
    const onMovieChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setMovieSortKey(Number(event.currentTarget.value));
        navigate(`/newflix/search?keyword=${param.get("keyword")}&movieSortKey=${movieSortKey}&tvSortKey=${tvSortKey}`);
    }
    const onTvChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setTvSortKey(Number(event.currentTarget.value));
        navigate(`/newflix/search?keyword=${param.get("keyword")}&movieSortKey=${movieSortKey}&tvSortKey=${tvSortKey}`);
    }
    useEffect(() => {
        if(isLoading1 || !movieData) return;
        if(movieSortKey === 1){
            setMovieItems(movieData.results.
                sort((item1, item2) => item2.popularity - item1.popularity));
        }else if(movieSortKey === 2){
            setMovieItems(movieData.results.
                sort((item1, item2) => new Date(item2.release_date).getTime() - new Date(item1.release_date).getTime()));
        }else{
            setMovieItems(movieData.results);
        }
    },[movieSortKey,isLoading1]);
    useEffect(() => {
        if(isLoading2 || !tvData) return;
        if(tvSortKey === 1){
            setTvItems(tvData.results.
                sort((item1, item2) => item2.popularity - item1.popularity));
        }else if(tvSortKey === 2){
            setTvItems(tvData.results.
                sort((item1, item2) => new Date(item2.first_air_date).getTime() - new Date(item1.first_air_date).getTime()));
        }else{
            setTvItems(tvData.results);
        }
    },[tvSortKey,isLoading2]);
    return     <Boxes>
    { isLoading1 || isLoading2 ?
        <Loading>Loading...</Loading> :
        <>
        <MovieBox>
            <Title>
                <span>Popular Movie</span>
                <select value={movieSortKey} onChange={onMovieChange}>
                    {SortKey.map((item) => <option key={item.value} value={item.value}>
                            {item.name}
                    </option>)}
                </select>
            </Title>
            { movieItems.map(item => <Item>
                <ItemImg style={{
                    backgroundImage:`url(${getImageUrl(item.poster_path,"w500")})`}}
                />
                <ItemInfo>
                <ItemRate>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px" height="16px">
                    <path fill="white" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                    </svg>
                    {(item.popularity*10).toFixed(2)}%
                </ItemRate>
                <p className="title">{item.title}</p>
                <p className="year">{item.release_date}</p>
                </ItemInfo>
            </Item>)}
        </MovieBox>
        <TvBox>
            <Title>
                <span>Popular TV</span>
                <select value={tvSortKey} onChange={onTvChange}>
                    {SortKey.map((item) => <option key={item.value} value={item.value}>
                            {item.name}
                    </option>)}
                </select>
            </Title>
            {tvItems.map(item => <Item>
                <ItemImg style={{
                    backgroundImage:`url(${getImageUrl(item.poster_path,"w500")})`}}
                />
                <ItemInfo>
                <ItemRate>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px" height="16px">
                    <path fill="white" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                    </svg>
                    {(item.popularity*10).toFixed(2)}%
                </ItemRate>
                <p className="title">{item.name}</p>
                <p className="year">{item.first_air_date}</p>
                </ItemInfo>
            </Item>)}
        </TvBox>
    </>
    }
    </Boxes>
}