import React from 'react';
// import LoginNav from './LoginNav';
import { TextField, Grid, makeStyles, FormControl, Button, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    textField: {
        width: '300px',
    },
    labelitem: {
        margin: ' 30px 40px'
    },
    slecetCat: {
        marginTop: '13px',
    },
    btnn: {
        margin: '21px',
        width: '12%',
        padding: '10px'
    },
    divAtag: {
        color: "#2196f3",
        textDecoration: "none",
      },
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
            <Link to="/" className={classes.divAtag}>
                Back
            </Link>
            {/* <LoginNav /> */}
            <Grid container direction="row" >
                <Grid item md={6} align="right">
                    <div className={classes.labelitem}>
                        <label htmlFor="outlined-name">Verification Code</label>
                    </div>
                </Grid>
                <Grid md={6} >
                    <TextField
                        id="outlined-name"
                        label="Code"
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
                            Select Category
      </div>
                    </div>
                </Grid>
                <Grid md={6} >
                    <FormControl className={[classes.formControl, classes.slecetCat]}>
                        <InputLabel htmlFor="demo-controlled-open-select">Category</InputLabel>
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                        multiline="true"
                        rows={4}
                        rowsMax={8}
                        id="outlined-name"
                        label="complaint"
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