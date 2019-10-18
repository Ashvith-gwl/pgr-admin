import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

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
  nav:{
    backgroundColor: '#2196f3',
  },
  divAtag:{
    color:"#fff",
    textDecoration:"none",
  }
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.nav}>
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            PGR
          </Typography>
          <Button color="inherit"><Link to='/' className={classes.divAtag}>Logout</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
