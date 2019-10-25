import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
  nav: {
    backgroundColor: '#2196f3',
  },
  divAtag: {
    color: "#fff",
    textDecoration: "none",
  }
};

class Navbar extends React.Component {
  state = {
    redirect: false
  }

  logoutHandler = () => {
    axios.put(`https://evening-dawn-93464.herokuapp.com/api/logout`, {
      "auth_token": sessionStorage.getItem('serverAUTHTOKEN')
    })
      .then(response => {
        sessionStorage.clear()
        if (!response.data.isloggedIn) {
          this.setState({ redirect: true })
        }
      })
      .catch(error => console.log(error)
      )

  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.redirect ? <Redirect to="/" /> : null}
        <AppBar position="relative" className={classes.nav}>
          <Toolbar>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              PGR
          </Typography>
            <Button color="inherit"><Link to='user-complaint' className={classes.divAtag}>Home</Link></Button>
            <Button color="inherit"><Link to='user-home' className={classes.divAtag}>Dashboard</Link></Button>
            <Button color="inherit" className={classes.divAtag} onClick={this.logoutHandler}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
