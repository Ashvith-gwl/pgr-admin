import React from 'react';
// import LoginNav from './LoginNav';
import { TextField, Grid, makeStyles, FormControl,Button, InputLabel,Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    width: '300px',
  },
  labelitem: {
    margin: ' 30px 40px'
  },
  slecetCat:{
    marginTop: '13px',
  },
  btnn:{
    margin:'21px',
    width: '12%',
    padding: '10px',
    background: "#2196f3",
  }
}));

function Comform() {

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setAge(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }
  return (
    <div>
      {/* <LoginNav /> */}
      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            <label htmlfor="outlined-name">Name</label>
          </div>
        </Grid>
        <Grid md={6} >
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            placeholder="code"
            // onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>


      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            <div className={classes.button} onClick={handleOpen}>
              Department
      </div>
          </div>
        </Grid>
        <Grid md={6} >
          <FormControl className={[classes.formControl, classes.slecetCat]}>
            <InputLabel htmlFor="demo-controlled-open-select">Department</InputLabel>
            <Select
              open={open}
              className={classes.textField}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              onChange={handleChange}
              inputProps={{
                name: 'age',
                id: 'demo-controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>IT</MenuItem>
              <MenuItem value={20}>ITES</MenuItem>
              <MenuItem value={30}>Network</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            <label htmlfor="outlined-name">Designation</label>
          </div>
        </Grid>
        <Grid md={6} >
          <TextField
            id="outlined-name"
            label="Designation"
            className={classes.textField}
            placeholder="code"
            // onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            <label htmlfor="outlined-name">Role</label>
          </div>
        </Grid>
        <Grid md={6} >
          <TextField
            id="outlined-name"
            label="Role"
            className={classes.textField}
            placeholder="code"
            // onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid container direction="row" >
        <Grid md={6} align="right">
          <div className={classes.labelitem}>
            <label htmlfor="outlined-name">Additional Info</label>
          </div>
        </Grid>
        <Grid md={6}  >
          <TextField
           multiline="true"
           rows={4}
           rowsMax={8}
            id="outlined-name"
            label="Additional info"
            className={classes.textField}
            placeholder="code"
            // onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid direction="row" align="center">
      <Button variant="contained" color="primary" className={[classes.button, classes.btnn]}>
        Submit
      </Button>
      </Grid>

    </div>
  );
}

export default Comform;