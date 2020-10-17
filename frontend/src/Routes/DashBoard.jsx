import React from "react";
import { useSelector } from "react-redux";
import DashBoardLayout from '../Components/Dashboard/Layout'

// const stateLine = {
//     labels: ['January', 'February', 'March',
//                 'April', 'May'],
//     datasets: [
//         {
//             fill: false,
//             lineTension: 0.5,
//             backgroundColor: 'rgba(75,192,192,1)',
//             borderColor: 'rgba(0,0,0,1)',
//             borderWidth: 2,
//             data: [65, 59, 80, 81, 56],
//         }
//     ]
// }

// const statePie = {
//     labels: ['Spent', 'Remaining'],
//     datasets: [
//         {
//             backgroundColor: [
//                 '#B21F00',
//                 '#C9DE00',
//             ],
//             hoverBackgroundColor: [
//             '#501800',
//             '#4B5000',
//             ],
//             data: [65, 59]
//         }
//     ]
// }

const Dashboard = () => {
    const isAuth = useSelector((state) => state.authData.isAuth) 
    console.log(isAuth)
    return(
        <DashBoardLayout />
    )

}


export default Dashboard