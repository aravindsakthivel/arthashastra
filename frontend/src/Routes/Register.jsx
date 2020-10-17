import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserProcess } from "../Redux/action";
import { Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {FormWrapper, Mlabel} from "../Components/StyledComponents"
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Components/Navbar'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name : "",
        username : "",
        email : "",
        mob : "",
        gender : "",
        password : "",
    })

    const registerIsLoading = useSelector((state) => state.authData.registerIsLoading)
    const registerIsError = useSelector((state) => state.authData.registerIsError)
    const message = useSelector((state) => state.authData.message)

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authData.isAuth) 

    const handleInput = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userInfo = {
            "name" : registerData.name,
            "username" : registerData.username,
            "email" : registerData.email,
            "password" : registerData.password,
            "mob" : registerData.mob,
            "gender" : registerData.gender
        }
        dispatch(registerUserProcess(userInfo))
    }

    console.log(isAuth, registerData.username, registerData.gender)
    if(!isAuth){
        return (
            <>
                <Navbar />
                <FormWrapper className = "container-fluid max-height bg-light">
                    <div className = "row justify-content-center">
                        <div className = "col-11 col-sm-12 col-md-6 col-lg-4">
                            <div className = "p-lg-4 p-md-4 mt-3 p-4 mt-lg-4 mt-md-4 border shadow rounded-lg bg-white text-center">
                                <FontAwesomeIcon icon={faChartLine} size = "5x" style = {{color: "#3F729B"}}/>
                                <form onSubmit={handleSubmit} className = "mb-2">
                                    <div className = "form-group">
                                        <input type="text" onChange = {handleInput} name = "name" value = {registerData.name} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0"  placeholder = "name" aria-describedby="emailHelp" minLength="4" required />
                                    </div>
                                    <div className = "form-group">
                                        <input type="text" onChange = {handleInput} name = "username" value = {registerData.username} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0"  placeholder = "username" aria-describedby="emailHelp" minLength="4" required />
                                    </div>
                                    <div className = "form-group">
                                        <input type="text" onChange = {handleInput} name = "email" value = {registerData.email} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0"  placeholder = "email" aria-describedby="emailHelp" required />
                                    </div>
                                    <div className = "form-group">
                                        <input type="text" onChange = {handleInput} name = "mob" value = {registerData.mob} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0"  placeholder = "mobile" aria-describedby="emailHelp" minLength = "10"  maxLength = "16"/>
                                    </div>
                                    <p className = "form-check-label float-left mt-1 mr-3" >gender: </p>
                                    <div className = "mb-1 float-left" onChange = {handleInput} id = "genderBar"> 
                                        <div className = "form-check form-check-inline">
                                            <input className = "form-check-input mt-1" type = "radio" name = "gender" id = "inlineRadio1" value = "Male" />
                                            <Mlabel className = "form-check-label mt-1" htmlFor = "inlineRadio1">Male</Mlabel>
                                        </div>
                                        <div className = "form-check form-check-inline">
                                            <input className = "form-check-input" type = "radio" name = "gender" id = "inlineRadio2" value = "Female" />
                                            <Mlabel className = "form-check-label" htmlFor ="inlineRadio2">Female</Mlabel>
                                        </div>
                                        <div className = "form-check form-check-inline">
                                            <input className = "form-check-input" type = "radio" name = "gender" id = "inlineRadio3" value = "Other" />
                                            <Mlabel className = "form-check-label" htmlFor  = "inlineRadio3">Other</Mlabel>
                                        </div>
                                    </div>

                                    <div className = "form-group">
                                        <input type="password" onChange = {handleInput} name = "password" value = {registerData.password} className = "form-control border-right-0 border-top-0 border-left-0 rounded-0" placeholder = "password" minLength="6" required />
                                    </div>
                                    <button type="submit" className = "btn btn-primary btn-block rounded-pill border-0">Register</button>
                                </form>
                                {
                                    registerIsLoading ? (
                                        <div className="spinner-grow"  role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>) : registerIsError ? (<div className = "alert alert-danger bg-white px-1 py-2 border-0" style = {{color:"#CC0000"}}role="alert">{message}</div>) : ("")
                                }
                                <p className = "mt-3 text-center">One of us? {" "}<Link to = "/login" key = {uuidv4()}>Login</Link> </p>
                            </div>
                        </div>
                    </div>
                </FormWrapper>
            </>
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


export default Register