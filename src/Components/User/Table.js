import React,{Component} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import LoginNav from './LoginNav'

import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom'

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
  render(){
  const { removeCharacter, characters=[] ,classes} = this.props;

  return (
    <div>
      <LoginNav />

      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={10}>
          <h3>
            <Link to='/user-complaint' className={classes.divAtag}>Register Complaint</Link>
          </h3> </Grid>
      </Grid>

      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item md={8} xs={12}>
          <Paper className={classes.root}>
            <Link to='/user-complaint' >
              <Button className={classes.add}>
                <i className="material-icons">add</i>
              </Button>
            </Link>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell >Complaint</TableCell>
                  <TableCell >Comp ID</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characters.map((row,id) => (
                  <TableRow key={id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell >{row.complaint}</TableCell>
                    <TableCell >{row.compID}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell ><Button onClick={() =>removeCharacter(id)}>Delete</Button></TableCell>
                  </TableRow>
                ) )
              }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
}


export default withStyles(styles)(SimpleTable);