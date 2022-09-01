import { useHistory, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './TasksList.css'
import useAxios from '../../../service/useAxios';
import { Task } from '../../../types/task';
import { addCurrentSelectedTaskToGameinSTore } from '../../../repository/firebase';
import { resetGame } from '../../../service/games';



export const TasksList= () => {
    let { gameId } = useParams<{ gameId: string }>();
    const history = useHistory();

    const { response:Tasks, loading } = useAxios('/Tasks');


    const goToGameController = () =>{
        history.push(`/game/${gameId}/`);
       // history.push(`/game/${gameId}`);
       //<Link to={{pathname: `/game/${gameId}`,state: {id:taskId }}}></Link>
      };

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
                        <td><button className="btn btn-danger" onClick={()=>{resetGame(gameId);goToGameController();     addCurrentSelectedTaskToGameinSTore(gameId,{ 
                                                            id: item.id,
                                                            title: item.title,
                                                            body: item.body,
                                                            author: item.author,
                                                            estimation: -1,
                                                          })} }>Estimate Task</button></td>
                        </tr>
                     )}
                   </tbody>  
                  )}
                </Table>
                <div style={{marginLeft:100}}>
                <button className="btn btn-dark" onClick={() => history.push(`/game/${gameId}`)} style={{marginTop:15,width:140}}>Back to game</button>
                </div>        
        </div>
    );   
 };

 export default TasksList;