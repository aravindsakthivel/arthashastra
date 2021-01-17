import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    LineSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import {getTransactionProcess} from '../../Redux/action'


const useStyles = makeStyles(() => ({
    header: {
        textTransform: "uppercase"
    },
    margin:{
        marginTop:10,
        '& h3': {
            fontSize: "12px",
            fontWeight:600,
        }
    }
}))



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
	},[dispatch,userId])


    console.log(creditChart)

    if(renderChart){
        return (
            <>
                <Paper className = {classes.margin}>
                    <div style = {{color:"#078282FF" }}>
                        <Chart data={creditChart} height = "280">
                            <ArgumentAxis />
                            <ValueAxis/>
                            <LineSeries valueField="value" argumentField="argument" color = '#078282FF'/>
                            <Title position="top" text = "Credit" />
                        </Chart>
                    </div>
                </Paper>
                
                <Paper className = {classes.margin}>
                    <div style = {{color: "#BA0020FF"}}>
                        <Chart data={debitChart} height = "280"> 
                            <ArgumentAxis /> 
                            <ValueAxis interval = {10000} />
                            <LineSeries valueField="value" argumentField="argument" color = '#BA0020FF'/>
                            <Title position="bottom" text = "Debit" />
                        </Chart>
                    </div>
                </Paper>
            </>
        );
    }
    return("")
}
