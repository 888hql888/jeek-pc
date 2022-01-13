import './App.css';
// 使用Router 和 自定义的history 实现 无组件也可以使用 history
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import history from './utils/history';
function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login} />
                    {/* <Route path="/home" component={Layout}/> */}
                    <PrivateRoute path="/home">
                        <Layout></Layout>
                    </PrivateRoute>
                    <Redirect from="/" to="/login" exact></Redirect>
                    <Route path="" component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
