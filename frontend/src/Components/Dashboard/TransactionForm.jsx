import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addTransactionProcess} from '../../Redux/action'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {NativeSelect, 
	TextField, 
	Select,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'





const useStyles = makeStyles((theme) => ({
	customSize:{
		width:150,
		// margin: theme.spacing(1),
		marginLeft:theme.spacing(3)
	}
}));


export default function TransactionForm(props) {
	const classes = useStyles();
	const [formValue, setValue] = React.useState({
		type:props.info.type,
		category:"",
		amount:""
	});
	const dispatch = useDispatch()
	const userId = useSelector((state) => state.authData.userId)

	console.log(formValue)
	const handleChange = (e) => {
		setValue({...formValue, [e.target.name]: e.target.value});
		
	};

	// console.log(props.info)

	const handleSubmit = (e) => {
		e.preventDefault()
		let data = {
			"user_id": userId,
			"type": props.info.type,
			"category": formValue.category,
			"amount": formValue.amount
		}
		dispatch(addTransactionProcess(data))
	}

	return (
		<>
			<DialogContentText>
				{props.info.inforamtion}
			</DialogContentText>
			<form onSubmit = {handleSubmit}>
				<TextField
					autoFocus
					margin="dense"
					id="amount"
					type="number"
						label="amount"
						value = {formValue.amount} 
						name = "amount" 
						onChange = {handleChange}
					fullWidth
					required
				/>
				<FormControl className={classes.formControl} fullWidth required>
					<InputLabel id="demo-simple-select-label">Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id = "demo-simple-select-"
						value = {formValue.category}
						onChange = {handleChange}
						name = "category"
						label = "Category"
						margin="dense"
					>
						<MenuItem value = {props.info.category[0]}>{props.info.category[0]}</MenuItem>
						<MenuItem value = {props.info.category[1]}>{props.info.category[1]}</MenuItem>
						<MenuItem value = {props.info.category[2]}>{props.info.category[2]}</MenuItem>
						<MenuItem value = {props.info.category[3]}>{props.info.category[3]}</MenuItem>
					</Select>
				</FormControl>
				<DialogActions>
					<Button type = "submit" color="primary">
						Add
					</Button>
				</DialogActions>
			</form>
		</>
	);
}


