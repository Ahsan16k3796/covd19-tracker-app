import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GlobalData from './GlobalData';
import CountrySelector from './CountrySelector';
import Chart from './Chart';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MainGrid() {

  //**************************************************************************//
  async function UpdateGlobalData() {
    const overAllWorldStatusUrl = "https://disease.sh/v2/all";
    const worldHistoricalUrl = "https://disease.sh/v2/historical/all?lastdays=all"

    const globalData = await fetch(overAllWorldStatusUrl);
    const total = await globalData.json();
    const globalHistoricData = await fetch(worldHistoricalUrl);
    const { cases, recovered, deaths } = await globalHistoricData.json();

    setCountryData({
        totalData: { infected: Number(total.cases), active: Number(total.active), recovered: Number(total.recovered), deaths: Number(total.deaths) },
        historicalData: { dates: Object.keys(cases), infected: Object.values(cases), deaths: Object.values(deaths), recovered: Object.values(recovered) }
    })
}

async function updateCountryData(countryCode) {
    const overAllCountryStatusUrl = `https://api.thevirustracker.com/free-api?countryTotal=${countryCode}`;
    const countryHistoricalUrl = `https://api.thevirustracker.com/free-api?countryTimeline=${countryCode}`;

    const response = await fetch(overAllCountryStatusUrl);
    const { countrydata } = await response.json();
    const { total_cases, total_recovered, total_deaths, total_active_cases } = countrydata[0]
    const historicData = await fetch(countryHistoricalUrl);
    const { timelineitems } = await historicData.json();

    setCountryData({
        totalData: { infected: total_cases, active: total_active_cases, recovered: total_recovered, deaths: total_deaths },
        historicalData: {
            dates: Object.keys(timelineitems[0]),
            infected: Object.values(timelineitems[0]).map(item => item.total_cases),
            deaths: Object.values(timelineitems[0]).map(item => item.total_deaths),
            recovered: Object.values(timelineitems[0]).map(item => item.total_recoveries)
        }
    })
}

const handleChangeCountry = (countryCode) => {
    if (countryCode === "global") {
        UpdateGlobalData();
    }
    else {
        updateCountryData(countryCode);
    }
}

const countryInitialData = {
    totalData: { infected: 0, active: 0, recovered: 0, deaths: 0 },
    // historicalData: { dates: "", infected: "", deaths: "", recovered: "" }
}

useEffect( ()=>{
    UpdateGlobalData();
},[]);

const [countryData, setCountryData] = useState(countryInitialData);


  //**************************************************************************//
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Grid container spacing={3}>
        <Grid item xs={4} style={{backgroundColor: 'transparent'}}>
          <Paper className={classes.paper}>
          <GlobalData/>
          </Paper>
        </Grid>
        <Grid item xs={8}>
            <CountrySelector handleChangeCountry={handleChangeCountry} />
            <Chart historicalData={countryData.historicalData} />            
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
}