export interface Task {
    id: string;
    title: string;
    body: string;
    author:string;
}

export class Etask {
    id: string;
    title: string;
    body: string;
    author:string;
    estimation:number;
}