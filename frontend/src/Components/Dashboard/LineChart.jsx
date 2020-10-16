import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Title,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { ValueScale } from '@devexpress/dx-react-chart'; 
import {getTransactionProcess} from '../../Redux/action'
import { Animation } from '@devexpress/dx-react-chart';


const useStyles = makeStyles(() => ({
    header: {
        textTransform: "uppercase"
    },
    margin:{
        marginTop:10,
        '& h3': {
            fontSize: "12px",
            fontWeight:600
        }
    }
}))


const Root = props => (
    <Legend.Root
        {...props}
        className="m-auto flex-column"
    />
);
const Item = props => (
    <Legend.Item
        {...props}
        className="flex-column"
    />
);
const Label = props => (
    <Legend.Label
        {...props}
        className="pt-2"
    />
);



export default function LineChart(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const creditChart = useSelector((state) => state.ledgerData.creditChart)
    const debitChart = useSelector((state) => state.ledgerData.debitChart)
    const renderChart = useSelector((state) => state.ledgerData.renderChart)
    const userId = useSelector((state) => state.authData.userId)


	useEffect(() => {
		let data = {
			"page" : 0,
			"limit" : 70,
			"userId" : userId
        }
        
		dispatch(getTransactionProcess(data))
	},[])

    console.log(debitChart, creditChart)

    if(renderChart){
        return (
            <>
                <Paper className = {classes.margin}>
                    <div style = {{color:"#078282FF" }}>
                        <Chart data={creditChart} height = "180">
                            <LineSeries valueField="value" argumentField="argument" color = '#078282FF'/>
                            <Title position="top" text = "Credit" />
                            <Animation />
                        </Chart>
                    </div>
                </Paper>
                
                <Paper className = {classes.margin}>
                    <div style = {{color: "#BA0020FF"}}>
                        <Chart data={debitChart} height = "180">  
                            <LineSeries valueField="value" argumentField="argument" color = '#BA0020FF'/>
                            <Title position="bottom" text = "Debit" />
                            <Animation />
                        </Chart>
                    </div>
                </Paper>
            </>
        );
    }
    return("")
}
