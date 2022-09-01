import { addEtaskToGameinSTore, deleteEtaskFromStore, getEtaskFromStore, getGameFromStore } from "../repository/firebase";
import { Etask } from "../types/task";

export const addTask = async (gameId: string, etask: Etask): Promise<boolean> => {
    const game = await getGameFromStore(gameId);
    
    if (game) {
        addEtaskToGameinSTore(gameId, etask);    
    }
    return true;
};

export const getTaskById = async (gameId:string,taskId:string):Promise<Etask> =>{

    const etask = await getEtaskFromStore(gameId,taskId);

    return etask as Etask
};


export const deleteEtaskById = async(gameId:string,etaskId:string)=>{
    await deleteEtaskFromStore(gameId,etaskId);
  };



