import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';
import './GameChat.css'
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { useEffect, useState } from 'react';
import { addMessage, streamMessages } from '../../../service/messages';
import { ulid } from 'ulid';
import { Message } from '../../../types/message';

interface ChatWindowProps {
    game: Game;
    players: Player[];
    currentPlayerId:string;
    visible:Boolean;
  }

export const ChatWindow: React.FC<ChatWindowProps> = ({ game, players,currentPlayerId,visible }) =>{

    //https://github.com/bookercodes/react-chatbox-component Source code

    const [currentPlayerName,SetCurrentPlayerName]=useState("test");
    //currentPlayerName
    //currentPlayerId
    //gameId
    const [messages, setMessages] = useState<Message[] | undefined>(undefined);
    const [loading, setIsLoading] = useState(true);
    
    useEffect(() => {
        for (let player of players) {
             if(player.id === currentPlayerId){
                 SetCurrentPlayerName(player.name);
             }
           }
    },[]);

    useEffect(() => {
        async function fetchData(gameId: string) {
          setIsLoading(true);
          
          streamMessages(gameId).onSnapshot((snapshot) => {
            const messages: Message[] = [];
            snapshot.forEach((snapshot) => {
              messages.push(snapshot.data() as Message);
            });
            setMessages(messages);
            setIsLoading(false);
          });
        }
        fetchData(game.id);
      }, [game.id]);
    


    const user = {
        "uid" : currentPlayerId
    }

    const MessageSubmited = (message:string) =>{
        
        addMessage(game.id,{
            text:message,
            id:ulid(),
            sender:{
                name:currentPlayerName+":",
                uid:currentPlayerId,
            }
        })

    }


    return(
        <div className='transition-5 ChatWindow'
        style={{
            ...{ opacity: visible ? '1' : '0' }
        }}>

        <ChatBox messages={messages} user={user} 
        onSubmit={(message:string)=>{ MessageSubmited(message)}} 
        />
       
        
        </div>

        
    );
};