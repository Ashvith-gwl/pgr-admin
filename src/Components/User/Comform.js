import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LoginNav from './LoginNav';
import { TextField, Grid, FormControl,Button, InputLabel,Select, MenuItem } from "@material-ui/core";
// import { TextField, Grid, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'

const styles = theme => ({
  textField: {
    width: '300px',
  },
  labelitem: {
    margin: ' 30px 40px'
  },
  slecetCat: {
    marginTop: '13px',
    width: '300px'
  },
  btnn: {
    margin: '21px',
    width: '12%',
    padding: '10px',
    background: "#2196f3",
  },
  divAtag: {
    color: "#2196f3",
    textDecoration: "none",
  },
});

class Comform extends Component {

  constructor(props) {
    super(props)

    this.initialState = {
      name:'Loreum Ipsum',
      category: '',
      complaint: '',
      compID:'GWL0025',
      status:'pending'
    }

    this.state = this.initialState
  }

  state = {
    category: '',
    open: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value,
    })
  }

  submitForm = () => {
    // this.props.handleSubmit(this.state)
    // this.setState(this.initialState)
  }

 

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    // const classes = useStyles();
    const {complaint,category } = this.state;
    // const { name,complaint,category } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <LoginNav />

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item md={10}>
            <h3>
              <Link to='/user-home' className={classes.divAtag}>Complaint List</Link>
            </h3>
          </Grid>
        </Grid>

        {/* <Grid container direction="row" >
          <Grid item md={6} align="right">
            <div className={classes.labelitem}>
              <label htmlFor="outlined-name">Verification Code</label>
            </div>
          </Grid>
          <Grid md={6} >
            <TextField
              id="outlined-name"
              label="name"
              className={classes.textField}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="code"
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid> */}

        <Grid container direction="row" >
          <Grid item md={6} align="right">
            <div className={classes.labelitem}>
              <div className={classes.button} onClick={this.handleOpen} >
                Select Category
              </div>
            </div>
          </Grid>
          <Grid item md={6} >
            <FormControl className={[classes.formControl, classes.slecetCat]}>
              <InputLabel htmlFor="demo-controlled-open-select">Category</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                name="category"
                value={category}
                onChange={this.handleChange}
                inputProps={{
                  name: 'category',
                  id: 'demo-controlled-open-select',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'IT'}>IT</MenuItem>
                <MenuItem value={'ITES'}>ITES</MenuItem>
                <MenuItem value={'Network'}>Network</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container direction="row" >
          <Grid item md={6} align="right">
            <div className={classes.labelitem}>
              <label htmlFor="outlined-name">Complaint</label>
            </div>
          </Grid>
          <Grid md={6}  >
            <TextField
              multiline="true"
              rows={4}
              rowsMax={8}
              id="outlined-name"
              label="complaint"
              className={classes.textField}
              placeholder="code"
              name="complaint"
              value={complaint}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid direction="row" align="center">
          <Button variant="contained" color="primary" className={[classes.button, classes.btnn]} onClick={this.submitForm}>
            Submit
      </Button>
        </Grid>

      </div>
    );
  }
}

Comform.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default Comform;

export default withStyles(styles)(Comform);