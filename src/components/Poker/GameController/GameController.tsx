import { Card, CardContent, CardHeader, Divider, Grow, IconButton, Snackbar, Typography } from '@material-ui/core';
import { blue, green, orange,purple,brown,grey } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Autorenew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DesktopMac from '@material-ui/icons/DesktopMac';
import Dock from '@material-ui/icons/Dock'
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { finishGame, resetGame } from '../../../service/games';
import { Game, GameType } from '../../../types/game';
import Table from 'react-bootstrap/Table';

import './GameController.css';
import useAxios from '../../../service/useAxios';


interface GameControllerProps {
  game: Game;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({ game, currentPlayerId }) => {
  const history = useHistory();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  let { taskId } = useParams<{ taskId: string }>();

  const { response:TaskById } = useAxios('/Tasks/'+taskId);
  
  const copyInviteLink = () => {
    const dummy = document.createElement('input');
    const url = `${window.location.origin}/join/${game.id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    setShowCopiedMessage(true);
  };

  const leaveGame = () => {
    history.push(`/home`);
  };

  const goToTasks = () =>{
    history.push(`/tasks/${game.id}`)
  };

  const goToEtasks = () =>{
    history.push(`/etasks/${game.id}`)
  };

  const isModerator = (moderatorId: string, currentPlayerId: string) => {
    return moderatorId === currentPlayerId;
  };


  return (
    <div>
    <Grow in={true} timeout={1000}>
      <div className='GameController'>
        <Card variant='outlined' className='GameControllerCard' style={{width:700}}>
          <CardHeader
            title={game.name}
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <div className='GameControllerCardHeaderAverageContainer'>
                <Typography variant='subtitle1'>   {game.gameStatus}</Typography>
                <Divider className='GameControllerDivider' orientation='vertical' flexItem />
                <Typography variant='subtitle1'>Task id : {taskId} </Typography>
                
                {game.gameType !== GameType.TShirt && (
                  <>
                    <Divider className='GameControllerDivider' orientation='vertical' flexItem />
                    <Typography variant='subtitle1'>Average:</Typography>
                    <Typography variant='subtitle1' className='GameControllerCardHeaderAverageValue'>
                      {game.average || 0}
                    </Typography>
                  </>
                )}
              </div>
            }
            className='GameControllerCardTitle'
          ></CardHeader>
          <CardContent className='GameControllerCardContentArea'>
            {isModerator(game.createdById, currentPlayerId) && (
              <>
                <div className='GameControllerButtonContainer'>
                  <div className='GameControllerButton'>
                    <IconButton onClick={() => finishGame(game.id,{ 
                                                            id: TaskById.id,
                                                            title: TaskById.title,
                                                            body: TaskById.body,
                                                            author: TaskById.author,
                                                            estimation: game.average
                                                          })} 
                      data-testid='reveal-button' color='primary'>
                      <VisibilityIcon fontSize='large' style={{ color: grey[800] }} />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Reveal</Typography>
                </div>

                <div className='GameControllerButtonContainer'>
                  <div className='GameControllerButton'>
                    <IconButton data-testid={'restart-button'} onClick={() => resetGame(game.id)}>
                      <RefreshIcon fontSize='large' style={{ color: grey[800] }} />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Restart</Typography>
                </div>

              <div className='GameControllerButtonContainer'>
                <div className='GameControllerButton'>
                  <IconButton data-testid='tasks-button' onClick={() => goToTasks()}>
                    <Dock fontSize='large' style={{ color: grey[800] }} />
                  </IconButton>
                </div>
                <Typography variant='caption'>Tasks</Typography>
              </div>

              <div className='GameControllerButtonContainer'>
                <div className='GameControllerButton'>
                  <IconButton data-testid='tasks-button' onClick={() => goToEtasks()}>
                    <DesktopMac fontSize='large' style={{ color: grey[800] }} />
                  </IconButton>
                </div>
                <Typography variant='caption'>E-Tasks</Typography>
              </div>
              </>
            )}
           
            <div title='Copy invite link' className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton data-testid='invite-button' onClick={() => copyInviteLink()}>
                  <LinkIcon fontSize='large' style={{ color: grey[800] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Invite</Typography>
            </div>
            <div className='GameControllerButtonContainer'>
              <div className='GameControllerButton'>
                <IconButton data-testid='exit-button' onClick={() => leaveGame()}>
                  <ExitToApp fontSize='large' color='error' />
                </IconButton>
              </div>
              <Typography variant='caption'>Exit</Typography>
            </div>
          </CardContent>
        </Card>

          {/* Copy Link */}
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          open={showCopiedMessage}
          autoHideDuration={5000}
          onClose={() => setShowCopiedMessage(false)}>
          <Alert severity='success'>Invite Link copied to clipboard!</Alert>
        </Snackbar>

        

            

      </div>
    </Grow>

      <Table striped bordered hover style={{maxWidth: 1300,marginTop:20}} className="center-table">
                      
      <thead>
        <tr>
          <th className='text-center'>Task to Estimate</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          {TaskById ? (<td>{TaskById.body}</td>) : (<td>No task selected</td>)}
          
          
        </tr>

      </tbody>

                    
      </Table>

</div>
  );
};
