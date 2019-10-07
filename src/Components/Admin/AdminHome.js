import React from 'react';
import Navbar from './AdminNav'
import Form from './AdminForm'
import Table from './AdminTable'

const AdminHome = () => {
    return (
        <div>
            <Navbar />
            <Form />
            <Table />
        </div>
    );
}

export default AdminHome;