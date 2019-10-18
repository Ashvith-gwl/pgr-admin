import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import LoginNav from './LoginNav'
import Spinner from '../Spinner/Spinner'

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
    loading: true
  };
  componentDidMount() {
    this.refreshHandler();
  }

  refreshHandler = () => {

    const { complainHandler } = this;

    axios
      .get("https://whispering-fortress-83775.herokuapp.com/api/complain")
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

  deleteComplaintHandler = (e, uuid) => {


    axios
      .delete(`https://whispering-fortress-83775.herokuapp.com/api/complain/${uuid}`)
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
                    <TableCell onClick={e => deleteComplaintHandler(e, row.uuid)} >
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
        <LoginNav />
        {userhome}
      </div>
    );
  }
}


export default withStyles(styles)(SimpleTable);