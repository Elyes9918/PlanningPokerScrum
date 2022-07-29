import { useEffect, useRef, useState } from "react";
import { Game } from "../../../types/game";
import { Player } from "../../../types/player";
import { AvatarChat } from "./AvatarChat";
import { ChatWindow } from "./ChatWindow";
import './GameChat.css';

interface GameChatProps {
    game: Game;
    players: Player[];
    currentPlayerId:string;
  }

  export const GameChat: React.FC<GameChatProps> = ({ game, players,currentPlayerId }) => {


    const [currentPlayerName,SetCurrentPlayerName]=useState("test");
    const [visible,setVisible]=useState(false);
    const wrapperRef  = useRef(null)
    

    useEffect(() => {
        for (let player of players) {
             if(player.id === currentPlayerId){
                 SetCurrentPlayerName(player.name);
             }
           }
    },[]);
    
    const useOutsideAlerter = (ref) => {
      useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                  setVisible(false)
              }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
    } 

    useOutsideAlerter(wrapperRef )

    return (
    <div ref={wrapperRef }>

      <ChatWindow visible={visible} game={game} players={players} currentPlayerId={currentPlayerId}/>

      <AvatarChat style={{
        position: 'fixed',
        bottom: '610px',
        right: '24px',
        }} onClick={()=> setVisible(true)} />

    </div>
    );

  };
  
export default GameChat