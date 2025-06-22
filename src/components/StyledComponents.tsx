import { motion } from "motion/react";
import styled from "styled-components";

export const Loading = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: ${props => props.theme.white.light};
    background-color: ${props => props.theme.black.dark};
`;
export const DetailInfo = styled(motion.div)`
    position: absolute;
    left: calc(30%);
    top: calc(30%);
    width: 600px;
    height: 600px;
    background-color: ${props => props.theme.black.light};
    color: ${props => props.theme.white.dark};
    display: grid;
    grid-template-rows: 300px auto 40px;
    border-radius: 12px;
`;
export const DetailImg = styled(motion.div)`
    background-size: cover;
    background-position:center center;
    display: flex;
    align-items: end;
    justify-content: center;
    border-radius: 12px;
`;
export const DetailTitle = styled(motion.span)`
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    opacity: 0.6;
    padding: 12px;
    font-size: 32px;
    text-align: center;
`;
export const DetailOverview = styled(motion.span)`
    min-height: 100px;
    margin: 28px;
    font-size: 24px;
    line-height: 1.2;
    overflow: auto;
`;
export const DetailBottom = styled(motion.div)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    border-top: 1px solid ${props => props.theme.white.heavy};
`;