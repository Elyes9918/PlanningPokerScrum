import { addMessageToGameinSTore, deleteMessageFromStore, getGameFromStore, getMessagesFromStore, streamMessagesFromStore } from "../repository/firebase";
import { Message } from "../types/message";

export const addMessage = async (gameId: string, message: Message): Promise<boolean> => {
    const game = await getGameFromStore(gameId);
    
    if (game) {
        addMessageToGameinSTore(gameId, message);    
    }
    return true;
};

export const streamMessages = (gameId: string) => {
    return streamMessagesFromStore(gameId);
  };

export const deleteEtaskById = async(gameId:string,messageId:string)=>{
    await deleteMessageFromStore(gameId,messageId);
  };



