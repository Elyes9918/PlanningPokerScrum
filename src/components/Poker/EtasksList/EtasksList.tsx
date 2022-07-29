import { useHistory, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './EtasksList.css'
import { Etask } from '../../../types/task';
import { getEtasksFromStore } from '../../../repository/firebase';
import { useEffect, useState } from 'react';
import { deleteEtaskById } from '../../../service/tasks';
import {CSVLink, CSVDownload} from 'react-csv';




export const EtasksList = () => {
    let { gameId } = useParams<{ gameId: string }>();
    const history = useHistory();

    const [etasks, setEtasks] = useState<Etask[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);

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
  }, []);

  const goToGameController = (taskId:string) =>{
    history.push(`/game/${gameId}/${taskId}`)
  };

  const DownloadEtasks = () => {

  }
           
  
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
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.body}</td>
                        <td>{item.estimation}</td>
                        <td><button className="btn btn-danger" onClick={()=>goToGameController(item.id)} >Re-estimate Task</button></td>
                        <td><button className="btn btn-dark" onClick={()=> deleteEtaskById(gameId,item.id) }>Delete</button></td>
                      </tr>
                     )}
                    
                   </tbody>  
                  )}
                  
              
                </Table>

                <div style={{marginLeft:100}}>
                  <button className="btn btn-dark" onClick={() => history.push(`/game/${gameId}`)} style={{marginTop:15,width:140}}>Back to game</button> 
                  <button className="btn btn-dark" onClick={() => DownloadEtasks() } style={{marginTop:15,marginLeft:30,width:190}}>Download to CSV</button>
                  
                  
                </div>


              
                
        </div>
        
        

    );

    
 };

 export default EtasksList;