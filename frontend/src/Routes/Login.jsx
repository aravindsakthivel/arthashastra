import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { loginUserProcess } from "../Redux/action";
import {Redirect} from "react-router-dom";
import {FormWrapper, CenterContainer} from "../Components/StyledComponents"
import { v4 as uuidv4 } from 'uuid'
import logo from '../Resources/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authData.isAuth)
    const loginIsLoading = useSelector((state) => state.authData.loginIsLoading)
    const loginIsError = useSelector((state) => state.authData.loginIsError)
    const message = useSelector((state) => state.authData.message)
    


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

    console.log(isAuth, loginData.username, loginIsError, loginIsLoading, message)
    if(!isAuth){
        return (
            <FormWrapper className = "container-fluid max-height bg-light">
                <div className = "row justify-content-center">
                    <div className = "col-11 col-sm-12 col-md-6 col-lg-4">
                        <div className = "p-lg-4 p-md-4 mt-3 p-4 mt-lg-4 mt-md-4 border shadow rounded-lg bg-white text-center">
                            <FontAwesomeIcon icon={faChartLine} size = "5x" style = {{color: "#3F729B"}}/>
                            <form onSubmit={handleSubmit} className = "mb-2">
                                <div className = "form-group">
                                    <input type="text" onChange = {handleInput} name = "username" value = {loginData.username} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0"  placeholder = "username" aria-describedby="emailHelp" required />
                                </div>
                                <div className = "form-group">
                                    <input type="password" onChange = {handleInput} name = "password" value = {loginData.password} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0" placeholder = "password" required />
                                </div>
                                <button type="submit" className = "btn btn-primary btn-block rounded-pill border-0">Login</button>
                            </form>
                            {
                                loginIsLoading ? (
                                    <div className = "spinner-grow"  role = "status">
                                        <span className = "sr-only">Loading...</span>
                                    </div>) : loginIsError ? (<div className = "alert alert-danger bg-white px-1 py-2 border-0" style = {{color:"#CC0000"}} role = "alert">{message}</div>) : ("")
                            }
                            <p className = "mt-2">Not one of us yet?{" "} <Link to = "/register" key = {uuidv4()}>Register</Link> </p>
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