import React from "react";
import { Route, Switch} from "react-router-dom";
import HomePage from './Home'
import Login from './Login'
import Register from "./Register"
import PrivateRoutes from './PrivateRoutes'


function Routes() {
    return (
        <React.Fragment>
            <Switch>
                <Route path = "/" exact render = {() => <HomePage  />} />
                <Route path = "/login" render = {() => <Login  />} />
                <Route path = "/register" render = {() => <Register  />} />
                <Route path = "/dashboard" render = {() => <PrivateRoutes />} />
                <Route path = "/ledger" exact render = {() => <PrivateRoutes/>} />
                <Route path = "/profile" exact render = {() => <PrivateRoutes/>} />
                <Route render = {() =><div>Error 404</div> } />
            </Switch>
        </React.Fragment>
    )
}

export { Routes };