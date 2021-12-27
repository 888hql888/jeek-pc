import './App.css';
import { BrowserRouter as Router,Switch,Redirect,Route} from 'react-router-dom'
import Login from './pages/Login';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
function App() {
  return (
    <div className="App">
       <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/layout" component={Layout}/>
            <Redirect from='/' to='/login' exact></Redirect>
            <Route path="" component={NotFound}/>
          </Switch>
       </Router>
    </div>
  );
}

export default App;

