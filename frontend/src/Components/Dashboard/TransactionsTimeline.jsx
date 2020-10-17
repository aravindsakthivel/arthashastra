import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
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
	}
}));



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

	return (
		<Timeline align="alternate">
			{
				topTransactions && topTransactions.map((transaction) => (
					<TimelineItem key = {uuidv4()}>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
								{new Date((transaction.timestamp)).toLocaleDateString()}
								{"  "}
								{new Date((transaction.timestamp)).toLocaleTimeString()}
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
								<Typography>₹ {" "}{transaction.amount}</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem>
				))
			}
		</Timeline>
	);
}



// topTransactions && topTransactions