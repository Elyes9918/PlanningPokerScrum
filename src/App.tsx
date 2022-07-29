import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EtasksList from './components/Poker/EtasksList/EtasksList';
import TasksList from './components/Poker/TasksList/TasksList';
import { Toolbar } from './components/Toolbar/Toolbar';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
import { theme } from './service/theme';

function App() {
  return (
    <div className="LightTheme">
    <ThemeProvider theme={theme} >
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Toolbar />
          <Switch>
            <Route exact path='/game/:id' component={GamePage} />
            <Route exact path='/game/:id/:taskId' component={GamePage} />
            <Route exact path='/tasks/:gameId' component={TasksList} />
            <Route exact path='/etasks/:gameId' component={EtasksList} />
            <Route path='/join/:id' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/join' component={HomePage} />
            <Route path="*" component={NotFound}/> 
          </Switch>
        
        </Router>
      </StylesProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
