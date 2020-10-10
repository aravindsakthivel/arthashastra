import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserProcess } from "../Redux/action";
import {Redirect} from "react-router-dom";
import {FormWrapper} from "../Components/StyledComponents"


const Dashboard = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authData.isAuth) 

    console.log(isAuth)
    if(isAuth){
        return (
            <div>
                Welcome
            </div>
        )
    }
    return(
        <Redirect push 
			to={{
				pathname: "/login",
				state: {
					from: "Login page"
				}
			}}
		/>
    )
}


export default Dashboard