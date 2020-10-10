import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { loginUserProcess } from "../Redux/action";
import {Redirect} from "react-router-dom";
import {FormWrapper} from "../Components/StyledComponents"
import { v4 as uuidv4 } from 'uuid'

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authData.isAuth) 

    const handleInput = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userInfo = {
            "username": loginData.username,
            "password": loginData.password
        }
        dispatch(loginUserProcess(userInfo))
    }

    console.log(isAuth, loginData.username)
    if(!isAuth){
        return (
            <FormWrapper className = "container-fluid max-height bg-light">
                <div className = "row justify-content-center">
                    <div className = "col-11 col-sm-12 col-md-6 col-lg-4">
                        <div className = "p-lg-5 p-md-5 mt-3 p-4 mt-lg-4 mt-md-4 border rounded shadow bg-light text-center">
                            <h4 className = "mb-5">Sign in</h4>
                            <form onSubmit={handleSubmit}>
                                <div className = "form-group">
                                    <input type="text" onChange = {handleInput} name = "username" value = {loginData.username} className = "form-control"  placeholder = "username" aria-describedby="emailHelp" />
                                </div>
                                <div className = "form-group">
                                    <input type="password" onChange = {handleInput} name = "password" value = {loginData.password} className = "form-control" placeholder = "password" />
                                </div>
                                <button type="submit" className = "btn btn-primary btn-sm btn-block">Login</button>
                            </form>
                            <p className = "mt-3">Not registered yet?{" "} <Link to = "/register" key = {uuidv4()}>Register</Link> </p>
                        </div>
                    </div>
                </div>
            </FormWrapper>
        )
    }
    return(
        <Redirect push 
			to={{
				pathname: "/",
				state: {
					from: "Login page"
				}
			}}
		/>
    )
}


export default Login