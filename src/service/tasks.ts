import { addEtaskToGameinSTore, deleteEtaskFromStore, getGameFromStore } from "../repository/firebase";
import { Etask } from "../types/task";

export const addTask = async (gameId: string, etask: Etask): Promise<boolean> => {
    const game = await getGameFromStore(gameId);
    
    if (game) {
        addEtaskToGameinSTore(gameId, etask);    
    }
    return true;
};



export const deleteEtaskById = async(gameId:string,etaskId:string)=>{
    await deleteEtaskFromStore(gameId,etaskId);
  };



