import { useHistory, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './TasksList.css'
import useAxios from '../../../service/useAxios';
import { Task } from '../../../types/task';



export const TasksList = () => {
    let { gameId } = useParams<{ gameId: string }>();
    const history = useHistory();

    const goToGameController = (taskId:string) =>{
        history.push(`/game/${gameId}/${taskId}`)
      };

    const { response:Tasks, loading } = useAxios('/Tasks');

    return (
       
        <div className="center-div">
            <h5 className='text'>Please select a task to estimate</h5>
             <Table striped bordered hover style={{maxWidth: 1300,marginTop:20}} className="center-table">
                
                <thead>
                <tr style={{textAlign:'center'}}>
                    <th>Task id</th>
                    <th scope="" >Tasks details</th>
                    <th scope="" style={{width:137}} >Estimation</th>
                </tr>
                </thead>
               
                  {loading ? ( <div>Loading...</div> ) : 
                  (
                    <tbody>
                    {Tasks && Tasks.map((item:Task) => 
                    <tr >
                        <td>{item.id}</td>
                        <td>{item.body}</td>
                        <td><button className="btn btn-danger" onClick={()=>goToGameController(item.id)}>Estimate Task</button></td>
                        
                        </tr>
                     )}
                    
                   </tbody>  
                  )}
                
                <button className="btn btn-dark" onClick={() => history.push(`/game/${gameId}`)} style={{marginTop:15,width:140}}>Back to game</button>
                </Table>
                
        </div>
        
        

    );

    
 };

 export default TasksList;