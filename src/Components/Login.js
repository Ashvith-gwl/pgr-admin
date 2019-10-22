import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'

import { FormErrors } from './FormErrors';
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
    padding: '0px'
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
  },
  divAtag: {
    color: "#ffffff",
    textDecoration: "none",
    padding: '10px 30px'
  },
});


class TextFields extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: '',
  //     password: '',
  //     formErrors: { username: '', password: '' },
  //     usernameValid: false,
  //     passwordValid: false,
  //     formValid: false
  //   }
  // }

  // handleUserInput = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   this.setState({ [name]: value },
  //     () => { this.validateField(name, value) });
  // }

  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.formErrors;
  //   let usernameValid = this.state.usernameValid;
  //   let passwordValid = this.state.passwordValid;

  //   switch (fieldName) {
  //     case 'username':
  //       usernameValid = value.length > 4
  //       fieldValidationErrors.username = usernameValid ? '' : ' is Invalid';
  //       break;
  //     case 'password':
  //       passwordValid = value.length >= 4;
  //       fieldValidationErrors.password = passwordValid ? '' : ' is Too Short';
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState({
  //     formErrors: fieldValidationErrors,
  //     usernameValid: usernameValid,
  //     passwordValid: passwordValid
  //   }, this.validateForm);
  // }

  // validateForm() {
  //   this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
  // }

  // errorClass(error) {
  //   return (error.length === 0 ? '' : 'has-error');
  // }

  state = {
    username: '',
    password: '',
    serverDetails: ''
  }

  handleUserInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginHandler = () => {
    const { username, password } = this.state
    console.log(username, password);

    axios.post(`https://evening-dawn-93464.herokuapp.com/api/login`, {
      "username": username,
      "password": password
    })
      .then(response => {
        this.setState({ serverDetails: response.data.all[0] })
        console.log(response);

      })
      .catch(error => console.log(error)
      )
  }

  render() {
    const { classes } = this.props;
    const { loginHandler } = this  

    return (
      <div>
        <form autoComplete="off" className={classes.froms}>
          <Grid container direction="row" justify="center" alignitems="center">
            <div className={classes.login}>
              <span className={classes.text}>Login</span>
              {/* <FormErrors formErrors={this.state.formErrors} /> */}
              {/* className={`form-group ${this.errorClass(this.state.formErrors.username)}`} */}
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
              {/* className={`form-group ${this.errorClass(this.state.formErrors.password)}`} */}

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

                {/* <Button className={classes.btn} variant="contained" disabled={!this.state.formValid}>
                  <Link to="/user-complaint" className={classes.divAtag}>Login</Link>
                </Button> */}

                <Button className={classes.btn} variant="contained" onClick={loginHandler}>Login
                </Button>

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