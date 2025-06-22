import { atom } from "jotai";

export const selectedAtom = atom(false);

interface ISelectdID{
    root:string,
    type:string,
    id:number,
}
export const selectedIDAtom = atom<ISelectdID | undefined>();
export const getSelectedID = (selectedId:ISelectdID | undefined) => {
    if(selectedId){
        const {root,type,id} = selectedId;
        return `${root}-${type}-${id}`
    }
    return "undefined";
}