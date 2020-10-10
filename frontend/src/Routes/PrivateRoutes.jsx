import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./DashBoard"
import { useDispatch, useSelector } from "react-redux";

export default function PrivateRoutes(){
    const isAuth = useSelector((state) => state.authData.isAuth)
	if (isAuth) {
        return(
            <Switch>
                <Route path = "/dashboard" exact render = {() => <Dashboard/>} />
                <Route render = {() =><div>Error 404</div> } />
            </Switch>
        )
    }
    return (
        <Redirect to = "/login" />
    )
}
