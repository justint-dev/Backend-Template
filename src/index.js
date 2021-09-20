import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter as Router, Switch} from 'react-router-dom';
import { LoginPage } from './sites/login';
import { DashboardPage } from './sites/dashboard';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/dashboard" component={DashboardPage} />
                </Switch>
            </Router>
        );
    }
}

/*------------------------------------------------------------*/
ReactDOM.render(
    <App />,
    document.getElementById("root")
);