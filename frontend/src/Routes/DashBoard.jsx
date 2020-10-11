import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserProcess } from "../Redux/action";
import {Redirect} from "react-router-dom";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { faSun } from "@fortawesome/free-solid-svg-icons"
import {SideNav, InfoBar, RoundedDiv} from '../Components/StyledComponents'
import {Line, Doughnut} from 'react-chartjs-2';

const stateLine = {
    labels: ['January', 'February', 'March',
                'April', 'May'],
    datasets: [
        {
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56],
        }
    ]
}

const statePie = {
    labels: ['Spent', 'Remaining'],
    datasets: [
        {
            backgroundColor: [
                '#B21F00',
                '#C9DE00',
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            ],
            data: [65, 59]
        }
    ]
}

const Dashboard = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authData.isAuth) 
    console.log(isAuth)
    if(!isAuth){
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <SideNav className = "col-lg-2 border-0 ">
                        <div className = "navbar navbar-expand-lg navbar-light p-2">
                            <button className = "navbar-toggler px-1 border-light" type="button" data-toggle="collapse" data-target="#sideBarSupportContent" aria-controls="sideBarSupportContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className = "navbar-toggler-icon text-dark"></span>
                            </button>
                            <div className = "collapse navbar-collapse" id="sideBarSupportContent">
                                <ul className = "navbar-nav flex-column ml-2">
                                    <li className = "nav-item mt-3">
                                        <div className = "text-white ml-1"><FontAwesomeIcon icon ={faChartBar} className = "text-white mr-2" />Dashboard</div>
                                    </li>
                                    <li className="nav-item mt-3">
                                        <div className = "text-white ml-1"><FontAwesomeIcon icon ={faBook} className = "text-white mr-2" />Ledger</div>
                                    </li>
                                    <li className="nav-item mt-3">
                                        <div className = "text-white ml-1"><FontAwesomeIcon icon ={faUser} className = "text-white mr-2" />Profile</div>
                                    </li>
                                    <li className="nav-item mt-3">
                                        <div className = "text-white ml-1"><FontAwesomeIcon icon ={faSignOutAlt} className = "text-white mr-2" />Signout</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </SideNav>
                    <InfoBar className = "col-lg-10 col-12 offset-lg-2 border pt-3 mt-5 mt-lg-0 mt-md-0 bg-light">
                        <div className = "row">
                            <div className = "col-12 col-lg-3 col-md-4 mb-4">
                                <RoundedDiv className = "card shadow p-4">
                                    <div className = "card-body">
                                        <h5 className = "card-title">Good Morning</h5>
                                        <p className = "card-text">Hai Aravind</p>
                                    </div>
                                </RoundedDiv>
                            </div>
                            <div className = "col-12 col-lg-5 col-md-6 mb-4">
                                <RoundedDiv className = "card shadow d-flex flex-row p-4">
                                    <div className = "card-body">
                                        <h5 className = "card-title text-center"><FontAwesomeIcon icon = {faMoneyBill} className = "text-success"/></h5>
                                        <p className = "card-text text-center text-success">Add income</p>
                                    </div>
                                    <div className = "card-body border-left">
                                        <h5 className = "card-title text-center"><FontAwesomeIcon icon = {faMoneyBill} className = "text-danger" /></h5>
                                        <p className = "card-text text-center text-danger">Add expense</p>
                                    </div>
                                </RoundedDiv>
                            </div>
                            <div className = "col-12 col-lg-4 col-md-4 mb-4">
                                <RoundedDiv className = "card shadow">
                                    <div className = "card-body">
                                        <Doughnut
                                            data={statePie}
                                            options={{
                                                title:{
                                                    display:false,
                                                    text:'Average Rainfall per month',
                                                    fontSize:20
                                                },
                                                legend:{
                                                    display:true,
                                                    position:'bottom'
                                                }
                                            }}
                                        />
                                    </div>
                                </RoundedDiv>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-12 mb-4">
                                <RoundedDiv className = "card shadow p-1 d-flex flex-column flex-lg-row flex-md-row">
                                    <div className = "card-body col-12 col-lg-7">
                                        <Line
                                            data={stateLine}
                                            options={{
                                                title:{
                                                    display:false,
                                                    text:'Average Rainfall per month',
                                                    fontSize:20
                                                },
                                                legend:{
                                                    display:false,
                                                    position:'top'
                                                }
                                            }}
                                        />  
                                    </div>
                                    <div className = "card-body col-12 col-lg-5">
                                        <p className = "card-text text-center "><u>Last 5 transactions</u></p>
                                    </div>
                                </RoundedDiv>
                            </div>
                        </div>
                    </InfoBar>
                </div>
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