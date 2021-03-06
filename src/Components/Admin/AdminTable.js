import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Grid from '@material-ui/core/Grid';
import Spinner from '../Spinner/Spinner'
import axios from "axios";

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
    comment: '',
    pendingFlag: true,
    loading: true,
    tempUUID: ''
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

  pendingFlagHandler = (e, complain_id) => {
    this.setState({
      [e.target.name]: e.target.value,
      tempcomplain_id: complain_id
    })
  }

  submitCommentHandler = (e, complain_id) => {
    axios
      .put(`https://whispering-fortress-83775.herokuapp.com/api/complain/${complain_id}`, {
        "comment": this.state.comment,
        "updated_by": "XXXXXXXXX"
      })
      .then(response => {

        this.refreshHandler();


      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { complainList, comment, tempcomplain_id, loading } = this.state;
    const { pendingFlagHandler, submitCommentHandler } = this
    let admintable;
    if (loading) {
      admintable = <Spinner />
    }
    else {
      admintable = <Grid container
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
                  <TableCell >Picture</TableCell>
                  <TableCell >Username</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Type</TableCell>
                  <TableCell >Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complainList.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell>{row.category_name}</TableCell>
                    <TableCell style={{ padding: '5px 5px', wordBreak: 'break-word', width: '200px' }}>{row.complain_details}</TableCell>
                    <TableCell >{row.picture}</TableCell>
                    <TableCell >{row.user_id}</TableCell>
                    <TableCell >{row.status} {row.status === 'Pending' ? <Button color="primary" disabled={row.complain_id === tempcomplain_id && comment.length > 10 ? false : true} onClick={e => submitCommentHandler(e, row.complain_id)}><CheckCircleRoundedIcon /> </Button> : null}</TableCell>
                    <TableCell >{row.type}</TableCell>
                    <TableCell >{row.comment} {row.comment === null ?
                      <TextField
                        required
                        id="outlined-required"
                        label="Comment"

                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        name="comment"
                        onChange={e => pendingFlagHandler(e, row.complain_id)}
                      />
                      : null}
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    }

    return (
      <div>
        {admintable}
      </div>
    );
  }
}


export default withStyles(styles)(SimpleTable);