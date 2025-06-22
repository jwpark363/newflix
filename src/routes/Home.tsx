import { useQuery } from "@tanstack/react-query"
import { getImageUrl, getMovie, type IMovie, type IMovieData } from "../api"
import styled from "styled-components";
import { DetailBottom, DetailImg, DetailInfo, DetailOverview, DetailTitle, Loading } from "../components/StyledComponents";
import Slider from "../components/Slider";
import { AnimatePresence, useScroll } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { getSelectedID, selectedAtom, selectedIDAtom } from "../atom";

const Boxes = styled.div`
    width: 100vw;
    background-color: ${props => props.theme.black.dark};
    background-size: cover;
    background-position: center center;
`;
const BackgroundBox = styled.div<{$bgImg : string}>`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.black.dark};
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)),
                    url(${props => props.$bgImg ?? ""});
    background-size: cover;
    background-position: center center;
    display: flex;
    align-items: center;
`;
const Title = styled.div`
    margin-left: 64px;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: ${props => props.theme.white.dark};
    .title{
        font-size: 52px;
    }
    .overview{
        font-size: 32px;
        line-height: 1.2;
    }
`;
const SliderBox = styled.div`
    position: absolute;
    bottom: -600px;
    display: flex;
    flex-direction: column;
`;

export default function Home(){
    const navigate = useNavigate();
    const {id} = useParams<string>();
    const [info, setInfo] = useState<IMovie>();
    const [isSelecte, setSelected] = useAtom(selectedAtom);
    const selectedIdAtom = useAtomValue(selectedIDAtom);
    const {scrollY} = useScroll();
    const {data:now_playing, isLoading:isLoading1} = useQuery<IMovieData>({
        queryKey:["movie","now_playing"], 
        queryFn: () => getMovie()})
    const {data:upcoming, isLoading:isLoading2} = useQuery<IMovieData>({
        queryKey:["movie","upcoming"], 
        queryFn: () => getMovie("upcoming")})
    const {data:top_rated, isLoading:isLoading3} = useQuery<IMovieData>({
        queryKey:["movie","top_rated"], 
        queryFn: () => getMovie("top_rated")})
    const {data:popular, isLoading:isLoading4} = useQuery<IMovieData>({
        queryKey:["movie","popular"], 
        queryFn: () => getMovie("popular")})
    useEffect(() => {
        if(!id) return;
        let _info = now_playing?.results.find(item => item.id === Number(id));
        if(!_info) _info = upcoming?.results.find(item => item.id === Number(id));
        if(!_info) _info = top_rated?.results.find(item => item.id === Number(id));
        if(!_info) _info = popular?.results.find(item => item.id === Number(id));
        if(!_info) navigate("/");
        setInfo(_info);
    },[id]);
return (
<Boxes>
{isLoading1 || isLoading2 || isLoading3 || isLoading4 ?
    <Loading>Loading...</Loading> :
    <>
    <BackgroundBox $bgImg={getImageUrl(now_playing?.results[0].backdrop_path)}>
    <Title>
        <span className="title">{now_playing?.results[0].title}</span>
        <span className="overview">{now_playing?.results[0].overview}</span>
    </Title>
    </BackgroundBox>
    <AnimatePresence>
    {isSelecte && id && info ? 
    <DetailInfo key={getSelectedID(selectedIdAtom)}
                layoutId={getSelectedID(selectedIdAtom)} onClick={() => setSelected(false)}
        initial={{opacity:0,zIndex:0}}
        animate={{opacity:1,zIndex:100,y:scrollY.get()-100}}
        exit={{opacity:0,zIndex:0}}
        transition={{
            default:{type:"tween"},
            opacity:{duration: 0.3,delay:0.3}
        }}
    >
        <DetailImg style={{ 
            backgroundImage:`url(${getImageUrl(info.backdrop_path,"w500")})`
            }}>
            <DetailTitle>{info.title}</DetailTitle>
        </DetailImg>
        <DetailOverview>{info.overview}</DetailOverview>
        <DetailBottom>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px" height="20px">
            <path fill="white" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
            </svg>
            <span> {info.vote_average}</span>
            <span> / {info.vote_count}</span>
            </div>
            <span>{info.release_date}</span>
        </DetailBottom>
    </DetailInfo> : null}
    <SliderBox>
        {now_playing ? <Slider data={now_playing} root="movie" type="now_playing"/>: null }
        {upcoming ? <Slider data={upcoming} root="movie" type="upcoming"/>: null}
        {top_rated ? <Slider data={top_rated} root="movie" type="top_rated"/>: null}
        {popular ? <Slider data={popular} root="movie" type="popular"/>: null}
    </SliderBox>
    </AnimatePresence>
    </>
}
</Boxes>
)}