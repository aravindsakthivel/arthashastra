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
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import {deleteTransaction, editTransaction,  getTransactionProcess} from '../../Redux/action'
import {v4 as uuid} from 'uuid'
import FormDialog from './FormDialog'

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
		minWidth: 100,
		align: 'right',
	},
	{
		id: 'edit',
		label: 'Edit',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'delete',
		label: 'Delete',
		minWidth: 130,
		align: 'center',
	},
];


const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
	editColor:{
		background:"#3F729B"
	}
});

export default function Transactions() {
	const classes = useStyles();
	const transactions = useSelector(state => state.ledgerData.transactions)
	const userId = useSelector((state) => state.authData.userId)
	const totalCount = useSelector((state) => state.ledgerData.totalCount)
	// const limit = useSelector((state) => state.ledgerData.limit)
	// const page = useSelector((state) => state.ledgerData.page)
	const filter_type = useSelector((state) => state.ledgerData.filter_type)
	const filter_category = useSelector((state) => state.ledgerData.filter_category)
	const sortOpt = useSelector((state) => state.ledgerData.sortOpt)
	const [statePage, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const dispatch = useDispatch()
	const [modalOpen, setModalOpen] = useState(false);
	const [editD, setEditD] = useState(null);


	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		let data = {
			"page" : newPage,
			"limit" : rowsPerPage,
			"userId" : userId
		}
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
		dispatch(getTransactionProcess(data))
	};

	const filterTypeLogic = (data) => {
		if(filter_type === ""){
			return data
		}
		else if(filter_type === "credit"){
			return data.type === "Credit"
		}
		else if(filter_type === "debit"){
			return data.type === "Debit"
		}
	}

	const filterCategoryLogic = (data) => {
		if(filter_category === ""){
			return data
		}
		else if(filter_category === "salary"){
			return data.category === "Salary"
		}
		else if(filter_category === "borrowed"){
			return data.category === "Borrowed"
		}
		else if(filter_category === "miscellaneous"){
			return data.category === "Miscellaneous"
		}
		else if(filter_category === "food"){
			return data.category === "Food"
		}
		else if(filter_category === "health"){
			return data.category === "Health"
		}
		else if(filter_category === "leisure"){
			return data.category === "Leisure"
		}
		else if(filter_category === "rent"){
			return data.category === "Rent"
		}
		else if(filter_category === "transportation"){
			return data.category === "Transportation"
		}
	}

	const sortLogic = (a,b) => {
		if(sortOpt === ""){
			return true
		}
		else if(sortOpt === "lowtohigh"){
			return a.amount - b.amount
		}
		else if(sortOpt === "hightolow"){
			return b.amount - a.amount
		}
	}

	const editVals = (data) => {
		setEditD(data)
		setModalOpen(true)
	}

	const deleteVals = (id) => {
		dispatch(deleteTransaction(id))
	}

  
	const handleClose = () => {
		setModalOpen(false);
	};

	const editT = () => {
		let temp = {...editD}
		delete temp['timestamp']
		delete temp['_id']
		setModalOpen(false)
		dispatch(editTransaction(temp))
	}
	
	
	useEffect(() => {
		let data = {
			"page" : statePage,
			"limit" : rowsPerPage,
			"userId" : userId
		}
		dispatch(getTransactionProcess(data))
	},[])

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
				{transactions && transactions.filter(filterTypeLogic).filter(filterCategoryLogic).sort(sortLogic).map((row) => {
					return (
						<TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
							{columns.map((column) => {
								const value = row[column.id];
								const id = row.id
								if(column.id === "edit" || column.id === "delete"){
									return (
										<TableCell key={column.id} align={column.align}>
											<Button className = {column.id === "edit" ? classes.editColor : ""}
												variant="contained" 
												color={column.id === "edit" ? "primary" : "secondary"} 
												onClick={() => column.id === "edit" ? editVals(row) : deleteVals(id)}>{column.id.toUpperCase()}</Button>
										</TableCell>
									);
								}
								else{
									return (
										<TableCell key={column.id} align={column.align}>
											{column.format && typeof value === 'string' ? column.format(value) : value}
										</TableCell>
									);
								}
							})}
						</TableRow>
					);
				})}
			</TableBody>
			</Table>
			<FormDialog open={modalOpen} handleClose={handleClose} editT={editT} details={editD} editDetails={setEditD} />
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
