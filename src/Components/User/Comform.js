import React, { Component } from 'react'
import { TextField, Grid, FormControl, Button, InputLabel, Select, MenuItem } from "@material-ui/core";

import classes from '../AnonymousComp/Complaint.module.css'
import axios from 'axios'
import LoginNav from './LoginNav'

class Complain extends Component {
  state = {
    name: '',
    open: false,
    complaint: '',
    enableFlag: true
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, this.validateHandler);
  };

  validateHandler = () => {
    if (this.state.complaint.length > 10 && this.state.name.length >= 2) {
      this.setState({ enableFlag: false });
    }
    else {
      this.setState({ enableFlag: true });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };


  postComplaintHandler = () => {

    axios
      .post(`https://whispering-fortress-83775.herokuapp.com/api/complain/`, {
        "category_name": this.state.name,
        "complain_details": this.state.complaint,
        "type": 'login',
        "created_by": 'username'
      })
      .then(response => {

        this.setState({
          complaint: '',
          name: '',
          enableFlag: true
        })

      })
      .catch(err => console.log(err));
  }

  render() {
    const { enableFlag } = this.state
    let content = (<React.Fragment>
      {this.state.modal}
      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            Select Category
          </div>
        </Grid>

        <Grid md={6} >
          <FormControl className={classes.slecetCat}>
            <InputLabel>Categories</InputLabel>
            <Select
              className={classes.textField}
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.name}
              onChange={this.handleChange}
              inputProps={{
                name: 'name',
                id: 'demo-controlled-open-select',
              }}>

              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
              <MenuItem value={"Network"}>Network</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            <label htmlFor="outlined-name">Complaint</label>
          </div>
        </Grid>
        <Grid md={6}  >
          <TextField
            required
            multiline="true"
            rows={4}
            rowsMax={8}
            id="outlined-name"
            label="Complaint"
            className={classes.textField}
            placeholder="code"
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            name='complaint'
            value={this.state.complaint}
          />
        </Grid>
      </Grid>
      <Grid direction="row" align="center">
        <Button className={classes.btnn} variant="contained" color="primary" onClick={this.postComplaintHandler} disabled={enableFlag}>
          Submit</Button>
      </Grid>
    </React.Fragment>)

    return (
      <div>
        <LoginNav />
        {content}
      </div >
    )
  }
}

export default Complain