import React from "react";
import {Redirect} from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
    const isAuth = useSelector((state) => state.authData.isAuth) 

    if(!isAuth){
        return (
            <Redirect push 
			to={{
				pathname: "/login",
				state: {
					from: "Home page"
				}
			}}
		/>
        )
    }
    return(
        <Redirect push 
			to={{
				pathname: "/dashboard",
				state: {
					from: "Home page"
				}
			}}
		/>
    )
}


export default HomePage