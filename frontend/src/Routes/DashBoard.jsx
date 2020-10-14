import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserProcess } from "../Redux/action";
import {Redirect} from "react-router-dom";
import DashBoardLayout from '../Components/Dashboard/Layout'
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
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
    if(isAuth){
        return(
            <DashBoardLayout />
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