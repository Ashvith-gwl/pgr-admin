import React, { Component } from 'react'
import { TextField, Grid, FormControl, Button, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Link } from 'react-router-dom'
import classes from './Complaint.module.css'
import axios from 'axios'

class Complain extends Component {
    state = {
        name: '',
        open: false,
        publicKey: '',
        enableFlag: true
    };

    componentDidMount() {
        axios.get(`https://whispering-fortress-83775.herokuapp.com/api/public_key`)
            .then(response => {
                this.setState({ publicKey: response.data.public_key[0].uuid })
            })
            .catch(error => console.log(error)
            )
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }, this.checkPublicKeyHandler);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    checkPublicKeyHandler = () => {
        if (this.state.verification === this.state.publicKey) {
            this.setState({
                enableFlag: false
            })
        } else {
            this.setState({
                enableFlag: true
            })
        }
    }

    postComplaintHandler = () => {
        axios
            .post(`https://whispering-fortress-83775.herokuapp.com/api/complain/`, {
                "category_name": this.state.name,
                "complain_details": this.state.complaint,
                "user_id": "Anonymous",
                "type": 'Anonymous Login',
                "created_by": 'Anonymous'
            })
            .then(response => {
                alert('Success')

                this.setState({
                    verification: '',
                    complaint: '',
                    name: '',
                    enableFlag: true
                })

            })
            .catch(err => console.log(err));
    }

    render() {
        const { enableFlag } = this.state

        return (
            <div>
                <Link to="/" className={classes.divAtag}>Back</Link>
                <Grid container direction="row" >
                    <Grid md={6} align="right">
                        <div className={classes.labelitem}>
                            <label htmlFor="outlined-name">Verification Code</label>
                        </div>
                    </Grid>
                    <Grid md={6} align="left">
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            name="verification"
                            value={this.state.verification}
                        />
                    </Grid>

                </Grid>
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
                                onChange={this.handleChange}
                                disabled={enableFlag}
                                value={this.state.name}
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
                                <MenuItem value={"POSCH"}>POSCH</MenuItem>
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
                            disabled={enableFlag}
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
                    <Button className={classes.btnn} disabled={enableFlag} variant="contained" color="primary" onClick={this.postComplaintHandler}>
                        Submit</Button>
                </Grid>
            </div>
        )
    }
}

export default Complain