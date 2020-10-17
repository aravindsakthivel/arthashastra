import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoutUser } from '../Redux/action';
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	menuButton: {
		marginRight: theme.spacing(2),
	},

	hide: {
		display: 'none',
	},

	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerHeader: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(5, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},

	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	
	content: {	
		flexGrow: 1,	
		padding: theme.spacing(3),
		marginTop:55,
	},

	nameMargin:{
		marginTop:5
	}
}));


let sideBarList = [
	{name:"Dashboard", icon: <DashboardIcon />}, 
	{name:"Ledger", icon: <BookIcon />}, 
	{name:"Logout", icon: <ExitToAppIcon />}
]

export default function SideDrawer(props) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch()
	const [open, setOpen] = React.useState(false);
	const history = useHistory();

	const handleDrawerOpen = () => {
		setOpen(true);
	}

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const logout = () => {
		dispatch(logoutUser())
	}

	const handleRouteChange = (data) => {
        history.push((data.name).toLowerCase())
    }

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar style = {{backgroundColor : "#3F729B"}}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap >
						Expense Manager
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar} >
					<IconButton onClick={handleDrawerClose} >
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{sideBarList.map(({name, icon}, index) => (
						<React.Fragment key = {uuidv4()}>
							{
								index === 2 ? (
									<ListItem button key={name} type = "button" onClick = {logout}>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText primary={name} />
									</ListItem>
								) : (
									<ListItem button key={name} onClick = {() => handleRouteChange({name})}>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText primary={name} />
									</ListItem>
								)
							}
						</React.Fragment>
					))}
				</List>
			</Drawer>
			<main className={classes.content}>
				{props.children}
			</main>
		</div>
	);
}
