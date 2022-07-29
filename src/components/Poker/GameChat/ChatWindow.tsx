import { styles } from "./styles";

export const ChatWindow = (props) =>{
    return(
        <div className='transition-5 supportWindow'
        style={{
            ...{ opacity: props.visible ? '1' : '0' }
        }}>
            
        </div>
    );
};