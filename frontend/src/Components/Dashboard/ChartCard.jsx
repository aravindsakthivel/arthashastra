import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Paper,
    Grid 
} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles(() => ({
    header: {
        textTransform: "uppercase"
    },
    chartSize:{
        height:430,
        borderRadius:20,
    }
}));


function CardBar({ title, chart}) {
    const classes = useStyles();
    return (
        <>
            <Card className = {classes.chartSize}>
                <CardContent>
                    <Typography className={classes.header} color="textPrimary">
                        {title}
                    </Typography>
                    {chart}
                </CardContent>
            </Card>
        </>
    );
}

export { CardBar };
