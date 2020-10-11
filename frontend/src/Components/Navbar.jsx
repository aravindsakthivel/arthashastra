import React, { useState} from "react";
import {Redirect} from "react-router-dom";
import { Link} from "react-router-dom";
import logo from '../Resources/logo.png'
import {HomeIcon, CustomNavBar} from './StyledComponents'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <>
			<CustomNavBar className = "navbar navbar-expand-md navbar-dark fixed-top shadow py-lg-0 py-md-0">
				<FontAwesomeIcon icon={faChartLine} size = "lg" className = "mr-2 text-light"/>
				<button className = "navbar-toggler px-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className = "navbar-toggler-icon text-dark"></span>
				</button>
				<div className = "collapse navbar-collapse" id="navbarSupportedContent">
					<ul className = "navbar-nav mr-auto my-2">
						<li className = "nav-item">
							<Link to = "/dashboard" key = {uuidv4()} >Dashboard</Link>
						</li>
					</ul>
					<ul className = "navbar-nav ml-auto ">
						<li className = "nav-item mr-3 my-2">
							<Link to = "/login" key = {uuidv4()} >Login</Link>
						</li>
						<li className = "nav-item mr-2 my-2">
							<Link to = "/register" key = {uuidv4()} >Register</Link>
						</li>
					</ul>
				</div>
			</CustomNavBar>
		</>
    )
}


export default Navbar