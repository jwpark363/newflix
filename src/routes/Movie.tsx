import styled from "styled-components";
import { getImageUrl, type IMovie, type IMovieData } from "../api";
import { useEffect, useState } from "react";
import { wrap } from "motion";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate, useParams } from "react-router";

const SliderBox = styled.div`
    position: absolute;
    bottom: -600px;
    width: 100vh;
    display: flex;
    flex-direction: column;
`;
const ItemSlider = styled.div`
    width: 100vw;
    height: 260px;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    gap: 1px;
    .button{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button{
        background-color: rgb(0,0,0,0);
        opacity: 0.2;
        border: none;
        color: white;
        font-size: 28px;
        &:hover{
            opacity:0.6;
        }
    }
`;
const ItemBox = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;
    /* display: grid;
    grid-template-columns: repeat(6, 1fr);
    overflow: hidden; */
`;
const Item = styled(motion.div)<{$bgImg: string}>`
    position: absolute;
    height: 200px;
    background-image: url(${props => props.$bgImg ?? ""});
    background-size: cover;
    background-position: center center;
`;
const BoxVariant = {
    initial: (custom: {index: number, pos: number, itemWidth: number}) => ({
        x: (custom.index-custom.pos)*(custom.itemWidth),
        y: 50,
        zIndex:0
    }),
    animate: (custom: {index: number, pos: number, itemWidth: number}) => ({
        x: (custom.index-custom.pos)*(custom.itemWidth),
        transition:{
            type: "tween" as const,
            duration: 1,
        }
    }),
    hover:{
        zIndex: 10,
        scale: 1.2,
        y: 20,
        transition:{
            type:"tween" as const,
            delay: 0.2, 
            duration: 1,
        }
    }
}
interface ISliderItem{
    datas:IMovieData[]
}
export default function Movie({datas}:ISliderItem){
    const IMG_SIZE = 6;
    const navigate = useNavigate();
    const {id} = useParams<string>();
    const itemWidth = Math.floor((window.innerWidth - 100)/IMG_SIZE);
return (
<SliderBox>
{datas.map(data => 
    <ItemSlider>
        <div className="button">
            <button>◁</button>
        </div>
        <ItemBox>
        {data.results.
        map((movie,i) => <Item key={movie.id} layoutId={movie.id+""}
                            style={{width:`${itemWidth-4}px`}}
                            $bgImg={getImageUrl(movie.backdrop_path,"w300")}
                            variants={BoxVariant}
                            initial="initial" animate="animate"
                            whileHover="hover"
                        >
                {movie.title}
            </Item>)}
        </ItemBox>
        <div className="button">
            <button>▷</button>
        </div>
    </ItemSlider>
)}
</SliderBox>
)
}