import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { 
	Card, 
	CardContent, 
	Typography, 
	Divider, 
	Grid, 
	Modal, 
	Backdrop, 
	Fade, 
	Input, 
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button, 
	TextField, 
	FormControl, 
	Select, 
	MenuItem, 
	InputLabel} from "@material-ui/core";
import SideDrawer from './SideDrawer'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { CardBar } from "./ChartCard";
import LineChart from './LineChart'
import TransactionTimeline from './TransactionsTimeline'
import PieChart from "./PieChart"
import ModalForm from './Modal'
import TransactionForm from './TransactionForm'

const incomeFormData = {
	inforamtion:"Use the below form to add income details use the select box for income, loan, inheritance, others (Click outside to close)",
	category:['Salary', 'Loan', 'Inheritance', 'Others'],
	type:"Credit"
}

const expenseFormData = {
	inforamtion:"Use the below form to add expense details use the select box for Food, Shopping, Rent, others (Click outside to close)",
	category:['Food', 'Shopping', 'Rent', 'others'],
	type:"Debit"
}

const useStyles = makeStyles((theme) => ({
	gridDirection:{
		display:"flex",
		direction:"row"
	},
	cardRadius:{
		borderRadius:20,
	},
	inputFormCard:{
		display:"flex",
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	iconModify:{
		width:80,
		height:80,
		padding:5,
	},
	incomeCard:{
		backgroundColor:"#00C851",
		borderRadius:20,
	},
	expenseCard:{
		backgroundColor:"#ff4444",
		borderRadius:20,
	},
	transactionsPaper:{
		borderRadius:20,
		height:430
	},
	modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export default function DashBoardLayout() {
	const classes = useStyles();
	const [openIncome, setOpenIncome] = React.useState(false);
	const [openExpense, setOpenExpense] = React.useState(false);
	const dispatch = useDispatch()
    const userData = useSelector((state) => state.authData.userData)


    const handleOpenIncome = () => {
        setOpenIncome(true);
    };

    const handleCloseIncome = () => {
        setOpenIncome(false);
	};
	
	const handleOpenExpense = () => {
        setOpenExpense(true);
    };

    const handleCloseExpense = () => {
        setOpenExpense(false);
	};
	
	return(
		<SideDrawer>
			<Grid>
				<Grid container spacing = {3}>
					<Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
						<Card className = {classes.cardRadius}>
							<CardContent>
								<Typography gutterBottom variant = "h4">
									Good morning
								</Typography>
								<Typography gutterBottom >
									Welcome {userData.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
						<Card className = {classes.incomeCard} type="button" onClick={handleOpenIncome}>
							<CardContent className = {classes.inputFormCard}>
								<Typography gutterBottom variant="h5">
									Add Income
								</Typography>
								<TrendingUpIcon className = {classes.iconModify}/>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
						<Card className = {classes.expenseCard} type="button" onClick={handleOpenExpense}>
							<CardContent className = {classes.inputFormCard}>
								<Typography gutterBottom variant = "h5">
									Add Expense
								</Typography>
								<TrendingDownIcon className = {classes.iconModify} />
							</CardContent>
						</Card>
					</Grid>
					<Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
						<Box className = {classes.transactionsPaper} component="div"  overflow="auto" bgcolor="background.paper" width = "100%" boxShadow={2} >
							<TransactionTimeline />
						</Box>
					</Grid>
					<Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
						<CardBar title="Current info" chart={<PieChart />}/>
					</Grid>
					<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
						<CardBar title="Money flow" chart={<LineChart />}/>
					</Grid>
				</Grid>
			</Grid>
			<div>
				<Dialog open={openIncome} onClose={handleCloseIncome} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Add Income</DialogTitle>
					<DialogContent>
						<TransactionForm info = {incomeFormData} />
					</DialogContent>
				</Dialog>
			</div>
			<div>
				<Dialog open={openExpense} onClose={handleCloseExpense} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
					<DialogContent>
						<TransactionForm info = {expenseFormData} />
					</DialogContent>
				</Dialog>
			</div>
		</SideDrawer>
	)
}
