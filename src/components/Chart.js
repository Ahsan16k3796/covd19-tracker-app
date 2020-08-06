import React from 'react';
import { Line } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({

  mainGrid: {
    justifyContent: 'center',
    margin: '20px auto',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: '20px',
    padding: '5px'
  }
}))

export default function Chart ({ historicalData }) {

  const classes = useStyle();
  if (!historicalData) {
    return (
      <div><h3>Loading.....</h3></div>
    )
  }

  return (
    <Grid className={classes.mainGrid} xs={12} sm={11} md={9} container item>
      <h2>Statistics</h2>
      <Line className data={{
        labels: historicalData.dates,
        datasets: [
          {
            data: historicalData.infected,
            label: 'Infected',
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 250, 0.2)',
            fill: true,
          },
          {
            data: historicalData.recovered,
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 250, 0, 0.3)',
            fill: true,
          },
          {
            data: historicalData.deaths,
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
        ]
      }} />
    </Grid>
  );
};