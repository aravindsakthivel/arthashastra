import React, { useState} from "react";
import {Redirect} from "react-router-dom";
import { Link} from "react-router-dom";
import logo from '../Resources/logo.png'
import {HomeIcon} from './StyledComponents'
import { v4 as uuidv4 } from 'uuid'


const Navbar = () => {
    return (
        <>
			<nav className = "navbar navbar-expand-lg navbar-dark bg-dark shadow py-3">
				<HomeIcon className = "mr-3" src = {logo} alt = "Product logo" />
				<button className = "navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className = "navbar-toggler-icon"></span>
				</button>
				<div className = "collapse navbar-collapse" id="navbarSupportedContent">
					<ul className = "navbar-nav mr-auto">
						<li className = "nav-item active">
							<Link to = "/dashboard" key = {uuidv4()} >Dashboard</Link>
						</li>
					</ul>
					<ul className = "navbar-nav ml-auto">
						<li className = "nav-item mr-2">
							<Link to = "/login" key = {uuidv4()} >Login</Link>
						</li>
						<li className = "nav-item">
							<Link to = "/register" key = {uuidv4()} >Register</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
    )
}


export default Navbar