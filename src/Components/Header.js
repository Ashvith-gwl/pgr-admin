import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from './Login'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({ typography: { useNextVariants: true } });

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  div1: {
    backgroundColor: '#2196f3',
  },
  divsec1: {
    textAlign: 'center',
    fontSize: '25px',
    padding: '15px',
    color: '#ffffff',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '350px',
    cursor: 'pointer',
    marginTop: '37%',
  },
  "divsec1:hover": {
    border: '1px solid #333',
  },
  MuiGridcontainer: {
    height: '-webkit-fill-available'
  },
  divAtag:{
    color:"#ffffff",
    textDecoration:"none",
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container style={styles.MuiGridcontainer}>
        <Grid item md={6} xs={12} style={styles.div1} >
          <div style={styles.divsec1}>
          <Link to="/complaint" style={styles.divAtag}>Anonymous Complaint</Link>
          </div>
        </Grid>
        <Grid item md={6} xs={12}  >
          <ThemeProvider theme={theme}>
            <Login />
          </ThemeProvider>

        </Grid>
      </Grid>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
