import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserProcess } from "../Redux/action";
import { Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {FormWrapper, Mlabel} from "../Components/StyledComponents"
import { v4 as uuidv4 } from 'uuid'


const Register = () => {
    const [registerData, setRegisterData] = useState({
        name : "",
        username : "",
        email : "",
        phoneNumber : "",
        gender : "",
        password : "",
    })

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
            "phoneNumber" : registerData.phoneNumber,
            "gender" : registerData.gender
        }
        dispatch(registerUserProcess(userInfo))
    }

    console.log(isAuth, registerData.username, registerData.gender)
    if(!isAuth){
        return (
            <FormWrapper className = "container-fluid max-height bg-light">
                <div className = "row justify-content-center">
                    <div className = "col-11 col-sm-12 col-md-6 col-lg-4">
                        <div className = "p-lg-5 p-md-5 mt-3 p-4 mt-lg-4 mt-md-4 border rounded shadow bg-light">
                            <h4 className = "mb-5 text-center">Register</h4>
                            <form onSubmit={handleSubmit}>
                                <div className = "form-group">
                                    <input type="text" onChange = {handleInput} name = "name" value = {registerData.name} className = "form-control"  placeholder = "name" aria-describedby="emailHelp" />
                                </div>
                                <div className = "form-group">
                                    <input type="text" onChange = {handleInput} name = "username" value = {registerData.username} className = "form-control"  placeholder = "username" aria-describedby="emailHelp" />
                                </div>
                                <div className = "form-group">
                                    <input type="text" onChange = {handleInput} name = "email" value = {registerData.email} className = "form-control"  placeholder = "email" aria-describedby="emailHelp" />
                                </div>
                                <div className = "form-group">
                                    <input type="text" onChange = {handleInput} name = "phoneNumber" value = {registerData.phoneNumber} className = "form-control"  placeholder = "phone number" aria-describedby="emailHelp" />
                                </div>
                                <div className = "mb-2" onChange = {handleInput}> 
                                    <div className = "form-check form-check-inline">
                                        <input className = "form-check-input" type = "radio" name = "gender" id = "inlineRadio1" value = "male" />
                                        <Mlabel className = "form-check-label" htmlFor = "inlineRadio1">Male</Mlabel>
                                    </div>
                                    <div className = "form-check form-check-inline">
                                        <input className = "form-check-input" type = "radio" name = "gender" id = "inlineRadio2" value = "female" />
                                        <Mlabel className = "form-check-label" htmlFor ="inlineRadio2">Female</Mlabel>
                                    </div>
                                    <div className = "form-check form-check-inline">
                                        <input className = "form-check-input" type = "radio" name = "gender" id = "inlineRadio3" value = "others" />
                                        <Mlabel className = "form-check-label" htmlFor  = "inlineRadio3">Other</Mlabel>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <input type="password" onChange = {handleInput} name = "password" value = {registerData.password} className = "form-control" placeholder = "password" />
                                </div>
                                <button type="submit" className = "btn btn-primary btn-sm btn-block">Register</button>
                            </form>
                            <p className = "mt-3 text-center">One of us? {" "}<Link to = "/login" key = {uuidv4()}>Login</Link> </p>
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


export default Register