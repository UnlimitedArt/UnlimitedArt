import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OfferCard from "./offercard.jsx"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:"50px",
    marginBottom:"50px",
    marginLeft:"50px",
    marginRight:"50px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
  {props.jobs.map((elem,index)=>{
return <Grid item xs={6} sm={3}>
            <OfferCard data={elem}/>
        </Grid>
    })}

      </Grid>
    </div>
  );
}