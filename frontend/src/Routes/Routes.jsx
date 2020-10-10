import React from "react";
import { Route, Switch} from "react-router-dom";
import Navbar from "../Components/Navbar";
import HomePage from './Home'
import Login from './Login'
import Register from "./Register"
import PrivateRoutes from './PrivateRoutes'

function Routes() {
    return (
        <React.Fragment>
            <Route path="/" render = {() => <Navbar />} />
            <Switch>
                <Route path = "/" exact render = {() => <HomePage  />} />
                <Route path = "/login" render = {() => <Login  />} />
                <Route path = "/register" render = {() => <Register  />} />
                <Route path = "/dashboard" render = {() => <PrivateRoutes />} />
            </Switch>
        </React.Fragment>
    )
}

export { Routes };