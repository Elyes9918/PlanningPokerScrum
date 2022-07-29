import { useState } from "react";
import { styles } from "./styles";

export const AvatarChat = (props) =>{
    const [hovered, setHovered] = useState(false)

    return (
        <div style={props.style}>
           
            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3 chatWithMeButton'
                style={{
                    ...{ border: hovered ? '1px solid #f9f0ff' : '1px solid #7a39e0' }
                }}
            />
        </div>
    );

};