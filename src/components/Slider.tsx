import styled from "styled-components";
import { getImageUrl, type IMovieData } from "../api";
import { useState } from "react";
import { wrap } from "motion";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";
import { getSelectedID, selectedAtom, selectedIDAtom } from "../atom";

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
interface IImg{
    $bgImg: string
}
const Item = styled(motion.div)<IImg>`
    position: absolute;
    height: 200px;
    background-image: url(${props => props.$bgImg ?? ""});
    background-size: cover;
    background-position: center center;
    display: flex;
    align-items: end;
`;
const ItemInfo = styled(motion.div)`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.black.dark};
    color: ${props => props.theme.white.dark};
    font-size: 16px;
`;
const InfoVariant = {
    initial:{opacity:0},
    hover:{
        opacity:1,
        transition:{
            delay:0.5,
            type:"tween" as const
        }
    },
}
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
    data:IMovieData,
    root:"movie"|"tv",
    type:string
}
export default function Slider({data,root,type}:ISliderItem){
    const IMG_SIZE = 6;
    const navigate = useNavigate();
    const [isSelected, setSelect] = useAtom(selectedAtom);
    const setSelectedIdAtom = useSetAtom(selectedIDAtom);
    const [pos, setPos] = useState(0);
    const [_, setStep] = useState<0|1|-1>(-1);
    const handleMovie = (movieId:number) => {
        navigate(`/${root}/${movieId}`);
    }
    const handlePos = (step:-1|1) => {
        if(isSelected) return;
        if(!data) return;
        if(step === -1 && (pos+IMG_SIZE) === (data.results.length)) return;
        if(step === 1 && pos == 0) return;
        setStep(step);
        setPos(prev => wrap(0, data.results.length ?? 0, prev + step*-1))
    }
    const onSelect = (id:number) => {
        if(isSelected) return;
        handleMovie(id);
        setSelect(true);
        setSelectedIdAtom({root:root,type:type,id:id});
    }
    const itemWidth = Math.floor((window.innerWidth - 100)/IMG_SIZE);
return (<ItemSlider>
        <div className="button">
            <button onClick={() => handlePos(1)}
                style={{zIndex:1}}>◁</button>
        </div>
        <ItemBox>
        {data.results.
        map((movie,i) => <Item key={getSelectedID({root,type,id:movie.id})}
                            layoutId={getSelectedID({root,type,id:movie.id})}
            onClick={() => onSelect(movie.id)}
            variants={BoxVariant}
            custom={{index:i,pos:pos,itemWidth:itemWidth}}
            initial="initial" animate="animate"
            whileHover="hover"
            $bgImg={getImageUrl(movie.backdrop_path,"w300")}
            style={{width:`${itemWidth-4}px`}}
        >
            <ItemInfo variants={InfoVariant}>
                {root === "movie" ? movie.title : null}
                {root === "tv" ? movie.name : null}
            </ItemInfo>
        </Item>)}
        </ItemBox>
        <div className="button">
            <button onClick={() => handlePos(-1)}
                style={{zIndex:1}}>▷</button>
        </div>
    </ItemSlider>)
}