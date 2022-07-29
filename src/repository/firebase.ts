import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Game } from '../types/game';
import { Message } from '../types/message';
import { Player } from '../types/player';
import { Etask } from '../types/task';

const firebaseConfig = {
  apiKey: "AIzaSyC-bgF_S0mR5FEc63ByNMo0ZV0wjY2r_K4",
  authDomain: "planningpokermaster.firebaseapp.com",
  projectId: "planningpokermaster",
  storageBucket: "planningpokermaster.appspot.com",
  messagingSenderId: "687659502274",
  appId: "1:687659502274:web:4abca01c8bc3219f88c95b",
  measurementId: "G-HXNTMT02B0"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const gamesCollectionName = 'games';
const playersCollectionName = 'players';
const tasksCollectionName = 'tasks';
const messagesCollectionName='messages'
const db = firebase.firestore();

// Games ---------------------------------------------------------------------------------------------------------------------

export const addGameToStore = async (gameId: string, data: any) => {
  await db.collection(gamesCollectionName).doc(gameId).set(data);
  return true;
};

export const getGameFromStore = async (id: string): Promise<Game | undefined> => {
  const response = db.collection(gamesCollectionName).doc(id);
  const result = await response.get();
  let game = undefined;
  if (result.exists) {
    game = result.data();
  }
  return game as Game;
};

export const updateGameDataInStore = async (gameId: string, data: any): Promise<boolean> => {
  const db = firebase.firestore();
  await db.collection(gamesCollectionName).doc(gameId).update(data);
  return true;
};


export const streamData = (id: string) => {
  return db.collection(gamesCollectionName).doc(id);
};

// Players ---------------------------------------------------------------------------------------------------------------

export const getPlayersFromStore = async (gameId: string): Promise<Player[]> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(playersCollectionName);
  const results = await response.get();
  let players: Player[] = [];
  results.forEach((result) => players.push(result.data() as Player));
  return players;
};

export const getPlayerFromStore = async (gameId: string, playerId: string): Promise<Player | undefined> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(playersCollectionName).doc(playerId);
  const result = await response.get();
  let player = undefined;
  if (result.exists) {
    player = result.data();
  }
  return player as Player;
};

export const streamPlayersFromStore = (id: string) => {
  return db.collection(gamesCollectionName).doc(id).collection(playersCollectionName);
};


export const addPlayerToGameInStore = async (gameId: string, player: Player) => {
  await db.collection(gamesCollectionName).doc(gameId).collection(playersCollectionName).doc(player.id).set(player);
  return true;
};

export const updatePlayerInStore = async (gameId: string, player: Player) => {
  await db.collection(gamesCollectionName).doc(gameId).collection(playersCollectionName).doc(player.id).update(player);

  return true;
};

export const deletePlayerFromStore = async (gameId:string,plyaerId:string)=>{
  await db.collection(gamesCollectionName).doc(gameId).collection(playersCollectionName).doc(plyaerId).delete();
}

// Tasks -----------------------------------------------------------------------------------------------------------------

export const addEtaskToGameinSTore = async (gameId:string,etask:Etask) =>{
  await db.collection(gamesCollectionName).doc(gameId).collection(tasksCollectionName).doc(etask.id).set(etask);
  return true;
}

export const getEtasksFromStore = async (gameId: string): Promise<Etask[]> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(tasksCollectionName);
  const results = await response.get();
  let etasks: Etask[] = [];
  results.forEach((result) => etasks.push(result.data() as Etask));
  return etasks;
};

export const getEtaskFromStore = async (gameId: string, etaskId: string): Promise<Etask | undefined> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(tasksCollectionName).doc(etaskId);
  const result = await response.get();
  let etask = undefined;
  if (result.exists) {
    etask = result.data();
  }
  return etask as Etask;
};

export const deleteEtaskFromStore = async (gameId:string,etaskId:string)=>{
  await db.collection(gamesCollectionName).doc(gameId).collection(tasksCollectionName).doc(etaskId).delete();
}

//Chat ------------------------------------------------------------------------------------------------------------------------

export const addMessageToGameinSTore = async (gameId:string,message:Message) =>{
  await db.collection(gamesCollectionName).doc(gameId).collection(messagesCollectionName).doc(message.id).set(message);
  return true;
}

export const streamMessagesFromStore = (gameId: string) => {
  return db.collection(gamesCollectionName).doc(gameId).collection(messagesCollectionName);
};

export const getMessagesFromStore = async (gameId: string): Promise<Message[]> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(messagesCollectionName);
  const results = await response.get();
  let messages: Message[] = [];
  results.forEach((result) => messages.push(result.data() as Message));
  return messages;
};


export const getMessageFromStore = async (gameId: string, messageId: string): Promise<Message | undefined> => {
  const db = firebase.firestore();
  const response = db.collection(gamesCollectionName).doc(gameId).collection(messagesCollectionName).doc(messageId);
  const result = await response.get();
  let message = undefined;
  if (result.exists) {
    message = result.data();
  }
  return message as Message;
};

export const deleteMessageFromStore = async (gameId:string,messageId:string)=>{
  await db.collection(gamesCollectionName).doc(gameId).collection(messagesCollectionName).doc(messageId).delete();
}