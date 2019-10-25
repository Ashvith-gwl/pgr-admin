import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import axios from 'axios';




const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300
  },
  btn: {
    backgroundColor: '#2196f3',
    color: '#fff',
    margin: '16px',
    padding: '10px 30px'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  froms: {
    textAlign: 'center',
    transform: 'translate(0%, 50%)',
    position: 'relative',
  },
  login: {
    padding: ' 30px',
    border: ' 1px solid #dadce0',
    borderRadius: '8px',
  },
  text: {
    color: ' #2196f3',
    fontSize: '25px',
    fontWeight: 500,
  }
});


class TextFields extends Component {

  state = {
    username: '',
    password: '',
    serverDetails: {},
    redirect: false,
    serverErrorFlag: false
  }

  handleUserInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setHandler = (details, flag, auth) => {

    sessionStorage.setItem('serverUUID', details.uuid);
    sessionStorage.setItem('serverUSERNAME', details.user_name);
    sessionStorage.setItem('serverAUTHTOKEN', auth);
    this.setState({ serverDetails: details, redirect: flag, auth_token: auth })
  }

  loginHandler = () => {
    const { username, password } = this.state

    axios.post(`https://evening-dawn-93464.herokuapp.com/api/login`, {
      "user_name": username,
      "password": password
    })
      .then(response => {
        if (response.data.login_message === 'Invalid User/ Password') {
          this.setState({ serverError: response.data.login_message, serverErrorFlag: true })
        }
        else {
          this.setHandler(response.data.all[0], true, response.data.auth_token)
        }
      })
      .catch(error => console.log(error)
      )
  }

  render() {
    const { classes } = this.props;
    const { loginHandler } = this;
    const { serverError, serverErrorFlag } = this.state

    return (
      <div>
        {this.state.redirect ? <Redirect to="/user-complaint" /> : null}
        <form autoComplete="off" className={classes.froms}>
          <Grid container direction="row" justify="center" alignitems="center">
            <div className={classes.login}>
              <span className={classes.text}>Login</span>

              <div >
                <Grid item md={6}  >
                  <TextField
                    id="outlined-username-input"
                    label="Username"
                    className={classes.textField}
                    type="text"
                    name="username"
                    autoComplete="username"
                    margin="normal"
                    variant="outlined"
                    value={this.state.username}
                    onChange={this.handleUserInput}
                  />

                </Grid>
              </div>

              <div >
                <Grid item md={6}>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleUserInput}
                  />
                </Grid>
              </div>

              <Grid item md={12} >
                <Button className={classes.btn} variant="contained" onClick={loginHandler}>Login
                </Button>
                {serverErrorFlag ? <p style={{ color: 'red', margin: '0', padding: '0' }}>{serverError}</p> : null}
              </Grid>
            </div>
          </Grid>
        </form>

      </div>
    );
  }
}


TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);