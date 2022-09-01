import { useHistory, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './EtasksList.css'
import { Etask } from '../../../types/task';
import { addCurrentSelectedTaskToGameinSTore, getEtasksFromStore } from '../../../repository/firebase';
import { useEffect, useState } from 'react';
import { deleteEtaskById } from '../../../service/tasks';
import {CSVLink} from 'react-csv';
import { resetGame } from '../../../service/games';


export const EtasksList = () => {

  let { gameId } = useParams<{ gameId: string }>();
  const [etasks, setEtasks] = useState<Etask[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [etasksArray, setEtasksArray]= useState([]);

  let i=0;
  etasks?.forEach(item =>{
    if(item.estimation>-1){
    etasksArray[i]=item;
    i++;
  }
  })


  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const etasks = await getEtasksFromStore(gameId);
      if (etasks) {
        setEtasks(etasks);
        setLoading(false)
      }
    }
    fetchData();
  }, [gameId]);


  const history = useHistory();

  function refreshPage() {
    window.location.reload();
  }

  const DeleteEtask = (gameId:string,taskId:string) =>{
    deleteEtaskById(gameId,taskId);
  }

  const goToGameController = () =>{
    history.push(`/game/${gameId}/`)
  };

           
  
    return (
       
        <div className="center-div">
            <h5 className='text'>Estimated Tasks</h5>
             <Table striped bordered hover style={{maxWidth: 1300,marginTop:20}} className="center-table">
                
                <thead>
                <tr style={{textAlign:'center'}}>
                    <th scope=""  style={{width:120}} >Task id</th>
                    <th scope="" >Tasks details</th>
                    <th scope="" style={{width:137}} >Estimation</th>
                    <th scope="" style={{width:160}} >Re-estimate</th>
                    <th scope="" style={{width:137}} >Delete</th>
                </tr>
                </thead>
               

                {loading ? ( <div>Loading...</div> ) : 
                  (
                    <tbody>
                    {etasks && etasks.map((item:Etask) =>

                    item.estimation>-1 &&
                     
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.body}</td>
                        <td>{item.estimation}</td>
                        <td><button className="btn btn-danger" onClick={()=>{resetGame(gameId);goToGameController();
                        addCurrentSelectedTaskToGameinSTore(gameId,{ 
                          id: item.id,
                          title: item.title,
                          body: item.body,
                          author: item.author,
                          estimation: item.estimation,
                        })}} >Re-estimate Task</button></td>
                        <td><button className="btn btn-dark" onClick={()=> DeleteEtask(gameId,item.id)}>Delete</button></td>
                      </tr>
                     )}
                    
                   </tbody>  
                  )}
                 
                </Table>

                <div style={{marginLeft:100}}>
                  <button className="btn btn-dark" onClick={() => history.push(`/game/${gameId}`)} style={{marginTop:15,width:140}}>Back to game</button> 
                  <CSVLink data={etasksArray} filename="Etasks.csv" className="btn btn-dark" target="_blank" style={{marginTop:15,width:200}}>Download Etasks to CSV</CSVLink>
                 
                </div>     
        </div>
    );
 };

 export default EtasksList;