import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./DashBoard"
import { useDispatch, useSelector } from "react-redux";
import LedgerPage from './Ledger'
import ProfilePage from './ProfilePage'


export default function PrivateRoutes(){
    const isAuth = useSelector((state) => state.authData.isAuth)
	if (isAuth) {
        return(
            <Switch>
                <Route path = "/dashboard" exact render = {() => <Dashboard/>} />
                <Route path = "/ledger" exact render = {() => <LedgerPage/>} />
                <Route path = "/profile" exact render = {() => <ProfilePage/>} />
                <Route render = {() =><div>Error 404</div> } />
            </Switch>
        )
    }
    return (
        <Redirect to = "/login" />
    )
}
