import React from "react";
import { useSelector } from "react-redux";
import SideDrawer from '../SideDrawer'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

const ProfilePageLayout = () => {
    const classes = useStyles();
    const state = useSelector(state => state)
    let user = state.authData.userData
    let keys = Object.keys(user)
    console.log(user, keys)

    return(
        <SideDrawer>
            <Grid container>
                <Grid item xs={2} md={3} />
                <Grid item xs={8} md={6} >
                    <Box>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {user.name}
                                    </Typography>
                                        {keys.filter(x => x !== "id" && x !== "name").map(x => 
                                            <div key={x}>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {x} : {user[x]}
                                                </Typography>
                                            </div>
                                        )}
                                </CardContent>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image="/static/images/cards/live-from-space.jpg"
                                title="Live from space album cover"
                            />
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={2} md={3} />
            </Grid>
        </SideDrawer>
    )
}


export default ProfilePageLayout;