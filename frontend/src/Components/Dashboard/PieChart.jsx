import React from "react";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
    { type : "Credit" , money : 250},
    { type : "Debit" , money : 300}
];


export default function PieChart(){
    return (
        <Paper>
            <Chart data={data} height = "370">
                <PieSeries
                    valueField="money"
                    argumentField="type"
                />
            </Chart>
        </Paper>
    );
}
