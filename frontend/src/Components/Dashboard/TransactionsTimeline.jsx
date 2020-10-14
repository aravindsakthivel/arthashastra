import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'
import {getTopTransactionProcess} from '../../Redux/action'

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px',
	},
	secondaryTail: {	
		backgroundColor: theme.palette.secondary.main,
	},
}));



let data = [
	{
		"id": "7d73683c-2265-4dea-889c-902d8a7bf5aa",
		"user_id": "29073442-822f-47d9-8d30-111b4e059550",
		"category": "Leisure",
		"type": "Debit",
		"amount": 5322.6,
		"timestamp": "1586745092000"
	}, {
		"id": "fa1d7161-ea2f-42d8-bfb8-8451b6ced444",
		"user_id": "29073442-822f-47d9-8d30-111b4e059550",
		"category": "Leisure",
		"type": "Debit",
		"amount": 6401.47,
		"timestamp": "1592881272000"
	}, {
		"id": "8d356732-90a3-4fc3-b626-ec064724e3ad",
		"user_id": "29073442-822f-47d9-8d30-111b4e059550",
		"category": "Transportation",
		"type": "Credit",
		"amount": 6872.03,
		"timestamp": "1582448471000"
	}, {
		"id": "39798904-f554-4048-a082-497e6d7d5d1e",
		"user_id": "29073442-822f-47d9-8d30-111b4e059550",
		"category": "Transportation",
		"type": "Credit",
		"amount": 4530.57,
		"timestamp": "1597738674000"
	}, {
		"id": "8326ae7d-561a-4ca2-adfd-d8b3ce48df6e",
		"user_id": "29073442-822f-47d9-8d30-111b4e059550",
		"category": "Leisure",
		"type": "Debit",
		"amount": 8769.52,
		"timestamp": "1579545726000"
	},
]


export default function CustomizedTimeline() {
	const classes = useStyles();
	const dispatch = useDispatch()
	const topTransactions = useSelector((state) => state.dashBoardData.topTransactions)
	const userId = useSelector((state) => state.authData.userId)
	
	useEffect(() => {
		let data = {
			"user_id" : userId
		}
		dispatch(getTopTransactionProcess(data))
	}, [])

	console.log(topTransactions, userId)
	return (
		<Timeline align="alternate">
			{
				data && data.map((transaction) => (
					<TimelineItem key = {uuidv4()}>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
								{new Date(Number(transaction.timestamp)).toLocaleTimeString()}
							</Typography>
						</TimelineOppositeContent>
						<TimelineSeparator>
							{
								transaction.type === "Debit" ? 
								<FontAwesomeIcon icon={faCircle} size = "sm" style = {{color: "#ff4444"}}/> : 
								<FontAwesomeIcon icon={faCircle} size = "sm" style = {{color: "#00C851"}}/>
							}
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							<Paper elevation={3} className={classes.paper}>
								<Typography variant="h6" component="h1">
									{transaction.category}
								</Typography>
								<Typography>{transaction.amount}</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem>
				))
			}
		</Timeline>
	);
}



// topTransactions && topTransactions