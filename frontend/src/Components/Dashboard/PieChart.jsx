import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';



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

export default function PieChart(){
    const credit = useSelector((state) => state.dashBoardData.creditData)
    const debit = useSelector((state) => state.dashBoardData.debitData)


    const data = [
        { type : "Debit" , money : debit, },
        { type : "Credit" , money : credit, },
    ];
    console.log(credit, debit)
    return (
        <Paper>
            <Chart data={data} height = "370" >
                <PieSeries
                    valueField = "money"
                    argumentField = "type"
                    innerRadius={0.6}
                />
                <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                <Animation />
            </Chart>
        </Paper>
    );
}
