import React, {useEffect,  useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CountUp from "react-countup"; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin:  '2%',
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      color: 'Black',
    },

    active:{
      backgroundColor:  'rgba(237, 199, 152, 0.5)',
    },

    infected : {
      backgroundColor: 'rgba(102, 179, 255, 0.5)',
      border :'10px solid rgba(0, 0, 255, 0.5)'  
    },

    recovered : {
      backgroundColor: 'rgba(191, 242, 202, 0.5)', 
      border : '10px solid rgba(0, 255, 0, 0.5)'
    },

    deaths : {
      backgroundColor: 'rgba(237, 178, 178, 0.5)', 
      border : '10px solid rgba(255, 0, 0, 0.5)'
    },
  });


export default function GlobalData() {
  const classes = useStyles();
  const classesTypo=useStylesTypography();

  const [globalData,setGlobalData]=useState(); 
  const [dataLoading,setDataLoading]=useState(false);
  //for loading data initilly it is false 
  useEffect(()=>{
      async function fetchGlobalData(){
          setDataLoading(true);
          const apiResponse = await fetch('https://api.thevirustracker.com/free-api?global=stats');
          const dataFromAPI= await apiResponse.json();
          setGlobalData(dataFromAPI);
          setDataLoading(false);
      }
      fetchGlobalData();
  },[]);// to get the data from the api in background

  const loading="loading ...";
  if (dataLoading){
      return (
        <div className={classes.root}>
      
      <Paper elevation={3}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'black', fontWeight:'bold'}}>
           {loading}
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'black'}}>
            Latest Global Data 
        </Typography>
        </div>
      </Paper>

      <Paper elevation={3}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'orange'}}>
        {loading}
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'orange'}}>
            Active 
        </Typography>
        </div>
      </Paper>

      <Paper elevation={3}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'green'}}>
        {loading}
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'green'}}>
            Recovered 
        </Typography>
        </div>
      </Paper>
      <Paper elevation={3}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'red'}}>
        {loading}
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'red'}}>
            Fatalities 
        </Typography>
        </div>
      </Paper>
      <Paper elevation={3}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'purple'}}>
        {loading}
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'purple'}}>
            Unresolved 
        </Typography>
        </div>
      </Paper>
    </div>
      )
  }
  return (
    <div className={classes.root}>
      
      <Paper elevation={3} className={classesTypo.infected}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'black', fontWeight:'bold'}}>

            <CountUp
                  start={0}
                  end={globalData && globalData.results && globalData.results[0].total_cases}
                  duration={2}
                  separator=","
                />
       
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'black'}}>
            Latest Global Data Count 
        </Typography>
        </div>
      </Paper>

      <Paper elevation={3} className={classesTypo.active}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'orange'}}>
        
            <CountUp
                  start={0}
                  end={globalData && globalData.results && globalData.results[0].total_active_cases + globalData.results[0].total_unresolved}
                  duration={2}
                  separator=","
                />
        
        </Typography>

        <Typography variant="subtitle2" gutterBottom style={{color : 'orange'}}>
            Active 
        </Typography>
        </div>
      </Paper>

      <Paper elevation={3} className={classesTypo.recovered}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'green'}}>
          
            <CountUp
                  start={0}
                  end={globalData && globalData.results && globalData.results[0].total_recovered}
                  duration={2}
                  separator=","
                />
            

        </Typography>

        <Typography variant="subtitle2" gutterBottom style={{color : 'green'}}>
            Recovered 
        </Typography>
        </div>
      </Paper>

      <Paper elevation={3} className={classesTypo.deaths}>
        <div className={classesTypo.root}>
        <Typography variant="h4" gutterBottom style={{color : 'red'}}>

        
            <CountUp
                  start={0}
                  end={globalData && globalData.results && globalData.results[0].total_deaths}
                  duration={2}
                  separator=","
                />

        
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{color : 'red'}}>
            Fatalities 
        </Typography>
        </div>
      </Paper>

    </div>
  );
}