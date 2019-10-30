import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import LoginNav from './LoginNav'
import Spinner from '../Spinner/Spinner'
import { Redirect } from 'react-router-dom'

import axios from "axios";

import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  divAtag: {
    color: "#2196f3",
    textDecoration: "none",
  },
  add: {
    color: '#2196f3',
    float: 'right'
  }

};


class SimpleTable extends Component {

  state = {
    complainList: [],
    loading: true,
    redirect: false
  };
  componentDidMount() {
    this.validateFromServer()
    this.refreshHandler();
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
  validateFromServer = () => {
    axios.post(`https://evening-dawn-93464.herokuapp.com/api/verify`, {
      "auth_token": sessionStorage.getItem('serverAUTHTOKEN')
    })
      .then(response => {
        if (!response.data.isloggedIn) {
          this.logoutHandler()
        }
      })
      .catch(error => console.log(error)
      )
  }

  refreshHandler = () => {

    const { complainHandler } = this;

    axios
      .post("https://whispering-fortress-83775.herokuapp.com/api/getcomplain",{
        "uuid":sessionStorage.getItem('serverUUID')
      })
      .then(response => {

        complainHandler(response.data.complain);
      })
      .catch(err => console.log(err));
  }

  complainHandler = complainList => {
    this.setState({ complainList, loading: false });
  };

  pendingFlagHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      pendingFlag: true,
      commentFlag: true
    })
  }

  deleteComplaintHandler = (e, cpid) => {
    axios
      .delete(`https://whispering-fortress-83775.herokuapp.com/api/complain/${cpid}`)
      .then(response => {
        this.refreshHandler();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { complainList, loading } = this.state;
    const { deleteComplaintHandler } = this

    let userhome;
    if (loading) {
      userhome = <Spinner />
    }
    else {
      userhome = (<Grid container
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item md={8} xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell >Complain Details</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Comment</TableCell>
                  <TableCell >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complainList.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell>{row.category_name}</TableCell>
                    <TableCell>{row.complain_details}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell >{row.comment}</TableCell>
                    <TableCell onClick={e => deleteComplaintHandler(e, row.complain_id)} >
                      <IconButton aria-label="Delete" >
                        <DeleteIcon fontSize="medium" color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>)
    }

    return (
      <div>
        {this.state.redirect ? <Redirect to="/" /> : null}
        <LoginNav />
        {userhome}
      </div>
    );
  }
}


export default withStyles(styles)(SimpleTable);