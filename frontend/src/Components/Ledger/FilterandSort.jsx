import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import SimplePaper from './FunctionHolder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { filterTransactionsType, filterTransactionsCategory, sortTransactions } from '../../Redux/action'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent:"space-between",
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function FilterandSort() {
    const dispatch = useDispatch()


    const filterType = (option) => {
        dispatch(filterTransactionsType(option))
    }

    const filterCategory = (option) => {
        dispatch(filterTransactionsCategory(option))
    }

    const sortData = (option) => {
        dispatch(sortTransactions(option))
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SimplePaper>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                    <Button size="small" onClick = {() => filterType("debit")}>Debit</Button>
                    <Button size="small" onClick = {() => filterType("credit")}>Credit</Button>
                    <Button size="small" onClick = {() => filterType("")}>All</Button>
                </ButtonGroup>
            </SimplePaper>
            <SimplePaper>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                    <Button size="small" onClick = {() => filterCategory("salary")}>salary</Button>
                    <Button size="small" onClick = {() => filterCategory("borrowed")}>borrowed</Button>
                    <Button size="small" onClick = {() => filterCategory("miscellaneous")}>miscellaneous</Button>
                    <Button size="small" onClick = {() => filterCategory("food")}>food</Button>
                    <Button size="small" onClick = {() => filterCategory("health")}>health</Button>
                    <Button size="small" onClick = {() => filterCategory("leisure")}>leisure</Button>
                    <Button size="small" onClick = {() => filterCategory("rent")}>rent</Button>
                    <Button size="small" onClick = {() => filterCategory("transportation")}>transportation</Button>
                    <Button size="small" onClick = {() => filterCategory("")}>All</Button>
                </ButtonGroup>
            </SimplePaper>
            <SimplePaper>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                    <Button size="small" onClick = {() => sortData("lowtohigh")}><FontAwesomeIcon icon = {faSortNumericDown} size = "lg" /></Button>
                    <Button size="small" onClick = {() => sortData("hightolow")}><FontAwesomeIcon icon = {faSortNumericUpAlt} size = "lg" /></Button>
                    <Button size="small" onClick = {() => sortData("")}><FontAwesomeIcon icon = {faCircle} size = "lg" /></Button>
                </ButtonGroup>
            </SimplePaper>
        </div>
    );
}
