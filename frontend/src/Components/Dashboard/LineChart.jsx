import React from "react";
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { ValueScale } from '@devexpress/dx-react-chart';


const dataIncome = [
    { argument: 1, value: 100},
    { argument: 2, value: 80},
    { argument: 3, value: 150},
];


const dataExpense = [
    { argument: 1, value: 100},
    { argument: 2, value: 80},
    { argument: 3, value: 150},
]

const useStyles = makeStyles(() => ({
    header: {
        textTransform: "uppercase"
    },
    margin:{
        marginTop:10
    }
}));

export default function LineChart(){
    const classes = useStyles();
    return (
        <>
            <Paper>
                <Chart data={dataIncome} height = "180">
                    <LineSeries valueField="value" argumentField="argument" color = 'green'/>
                </Chart>
            </Paper>
            
            <Paper className = {classes.margin}>
                <Chart data={dataExpense} height = "180">  
                    <LineSeries valueField="value" argumentField="argument" color = 'red'/>
                </Chart>
            </Paper>
        </>
    );
}
