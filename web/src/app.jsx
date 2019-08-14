import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Home from './components/Home';
import Signup from './components/Signup';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
}));

const App = () => {
  const classes = useStyles();

  const fadeTime = 100;

  const [display, setDisplay] = useState('home');

  const goToSignup = () => {
    if (display !== 'signup') {
      setDisplay('transition');
      setTimeout(() => setDisplay('signup'), fadeTime)
    }
  };

  const goToHome = () => {
    if (display !== 'home') {
      setDisplay('transition');
      setTimeout(() => setDisplay('home'), fadeTime)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={goToHome}>
            CityTeller
          </Typography>
          <Button color="inherit" onClick={goToSignup}>Signup</Button>
        </Toolbar>
      </AppBar>
      <Home display={display} />
      <Signup display={display} />
    </div>
  );
}

export default App;

ReactDOM.render(<App/>, document.getElementById('app'));