import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addTransactionProcess, removeMessage} from '../../Redux/action'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {TextField, 
	Select,
	DialogActions,
	DialogContentText} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { v4 as uuidv4 } from 'uuid'





const useStyles = makeStyles((theme) => ({
	customSize:{
		width:150,
		// margin: theme.spacing(1),
		marginLeft:theme.spacing(3)
	},
	root: {
		width: '100%',
		'& > * + *': {
		  marginTop: theme.spacing(2),
		},
	  },
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
	const message = useSelector((state) => state.dashBoardData.message)


	const handleChange = (e) => {
		setValue({...formValue, [e.target.name]: e.target.value});
		
	};


	const handleSubmit = async(e) => {
		e.preventDefault()
		let data = {
			"user_id": userId,
			"type": props.info.type,
			"category": formValue.category,
			"amount": formValue.amount
		}
		try{
			await dispatch(addTransactionProcess(data))
			setTimeout(() => {
				dispatch(removeMessage())
			}, 2000)
		}
		catch(error){
			console.log(error)
		}
	}

	return (
		<>
			<DialogContentText>
				{props.info.inforamtion}
			</DialogContentText>
			<div className={classes.root}>
				{message.length > 0 ? <Alert severity="success">{message}</Alert> : ("")}
			</div>
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
				<FormControl className={classes.formControl} fullWidth required style = {{marginTop:"10px"}}>
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
						{
							props.info.category && props.info.category.map((value) => (
								<MenuItem value = {value} key = {uuidv4()}>{value}</MenuItem>
							))
						}
					</Select>
				</FormControl>
				<DialogActions>
					<Button type = "submit" color="primary" variant = "contained">
						Add
					</Button>
				</DialogActions>
			</form>
		</>
	);
}


