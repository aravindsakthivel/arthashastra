import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {getTransactionProcess} from '../../Redux/action'
import {v4 as uuid} from 'uuid'

const columns = [
	{ 	
		id: 'timestamp', 
		label: 'Date', 
		minWidth: 130,
		format: (value) => 	new Date(value).toLocaleDateString()
	},
	{ 
		id: 'type', 
		label: 'Type', 
		minWidth: 130 },
	{
		id: 'category',
		label: 'Category',
		minWidth: 130,
		align: 'right',
	},
	{
		id: 'amount',
		label: 'Amount',
		minWidth: 130,
		align: 'right',
	},
];

function createData(date, type, category, amount) {
	return { date, type, category, amount};
}

const rows = [];


const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
});

export default function Transactions() {
	const classes = useStyles();
	const transactions = useSelector(state => state.ledgerData.transactions)
	const userId = useSelector((state) => state.authData.userId)
	const totalCount = useSelector((state) => state.ledgerData.totalCount)
	const limit = useSelector((state) => state.ledgerData.limit)
	const page = useSelector((state) => state.ledgerData.page)
	const filterOpt = useSelector((state) => state.ledgerData.filterOpt)
	const sortOpt = useSelector((state) => state.ledgerData.sortOpt)
	const [statePage, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const dispatch = useDispatch()


	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		let data = {
			"page" : newPage,
			"limit" : rowsPerPage,
			"userId" : userId
		}
		console.log(data)
		dispatch(getTransactionProcess(data))
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
		let data = {
			"page" : 0,
			"limit" : +event.target.value,
			"userId" : userId
		}
		console.log(data)
		dispatch(getTransactionProcess(data))
	};

	const filterLogic = (data) => {
		console.log(filterOpt)
		if(filterOpt === ""){
			return data
		}
		else if(filterOpt === "credit"){
			return data.type === "Credit"
		}
		else if(filterOpt === "debit"){
			return data.type === "Debit"
		}
	}

	const sortLogic = (a,b) => {
		if(sortOpt === ""){
			return a ,b
		}
		else if(sortOpt === "lowtohigh"){
			return a.amount - b.amount
		}
		else if(sortOpt === "hightolow"){
			return b.amount - a.amount
		}
	}
	
	
	useEffect(() => {
		let data = {
			"page" : statePage,
			"limit" : rowsPerPage,
			"userId" : userId
		}
		console.log(data)
		dispatch(getTransactionProcess(data))
	},[])

	console.log(transactions, totalCount, limit, page)
	return (
		<Paper className={classes.root}>
		<TableContainer className={classes.container}>
			<Table stickyHeader aria-label="sticky table">
			<TableHead>
				<TableRow>
				{columns.map((column) => (
					<TableCell
					key={column.id}
					align={column.align}
					style={{ minWidth: column.minWidth }}
					>
					{column.label}
					</TableCell>
				))}
				</TableRow>
			</TableHead>
			<TableBody>
				{transactions && transactions.filter(filterLogic).sort(sortLogic).map((row) => {
					return (
						<TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
							{columns.map((column) => {
								const value = row[column.id];
								return (
									<TableCell key={column.id} align={column.align}>
										{column.format && typeof value === 'string' ? column.format(value) : value}
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
			</TableBody>
			</Table>
		</TableContainer>
		<TablePagination
			rowsPerPageOptions={[5, 10, 20, 50 , 100]}
			component="div"
			count={totalCount}
			rowsPerPage={rowsPerPage}
			page={statePage}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
		</Paper>
	);
}
