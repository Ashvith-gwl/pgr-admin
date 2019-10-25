import React from 'react';
import Navbar from './AdminNav'
import Table from './AdminTable'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class AdminHome extends React.Component {
    state = {
        redirect: false
    }
    componentDidMount() {
        this.validateFromServer()
        this.verifyFromServer()
    }
    validateFromServer = () => {
        axios.post(`https://evening-dawn-93464.herokuapp.com/api/verify`, {
            "auth_token": sessionStorage.getItem('serverAUTHTOKEN')
        })
            .then(response => {
                if (!response.data.isloggedIn) {
                    this.setState({ redirect: true })
                }
            })
            .catch(error => console.log(error)
            )
    }

    verifyFromServer = () => {
        axios.post(`https://evening-dawn-93464.herokuapp.com/api/validate`, {
            "auth_token": sessionStorage.getItem('serverAUTHTOKEN')
        })
            .then(response => {
                let status = response.data.status
                if (status === 401) {
                    this.setState({ redirect: true })
                }
            })
            .catch(error => console.log(error)
            )
    }
    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to="/" /> : null}
                <Navbar />
                <Table />
            </div>
        );
    }
}

export default AdminHome;