import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHub from '@material-ui/icons/GitHub';
import LinkedIn from '@material-ui/icons/LinkedIn';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <h1>Covid-19 Tracker</h1> 
          </Typography>
          <IconButton color="inherit" aria-label="github-link" className={classes.gitHub}
                    href="https://github.com/Ahsan16k3796/covd19-tracker-app.git" target='_blank'>
                    <GitHub />
                </IconButton>
          <IconButton color="inherit" aria-label="github-link" className={classes.gitHub}
                    href="https://www.linkedin.com/in/ahsan-ali-851621176/" target='_blank'>
                    <LinkedIn />
                </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}