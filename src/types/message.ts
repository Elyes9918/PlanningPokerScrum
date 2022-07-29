export interface Message {
    text: string;
    id: string;
    sender : {
        name:string;
        uid:string;
    }
}