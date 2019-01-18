import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';
// import Auth from '../util/auth';
import { authHeader } from '../util/authHeader'
import { Redirect } from 'react-router-dom'
// The Header creates links that can be used to navigate
// between routes.

import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Home from './home';


class Orders extends React.Component {
    // initially data is empty in state
    constructor() {
        super()
        this.state = {
            data: [],
            showItem: false,

        }

    }
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch("/api/view_orders", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result.orders
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    viewOrder = (oid) => {
       this.setState({showItem: true, itemId:oid});

        // alert(oid);
    }
    render() {

        let user = JSON.parse(localStorage.getItem('user'));
        // alert(user.token);
        if (user && user.token) {
            console.log('Authentication successful');
        } else {
            this.props.history.push('/login')
        }
        // if (logged == {}) {
        //     this.props.history.push('/login')
        // }
        var val = 0;
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            this.state.data.map((item, key) => {
                                val = val + 1
                                return (
                                    <tr key={key}>
                                        <td>{val}</td>
                                        <td>{item.id}</td>
                                        <td>{item.customer}</td>
                                        <td><Button type="submit" onClick={() => { this.viewOrder(item.id) }}>Edit</Button>
                                            {this.state.showItem ? <Redirect to={{
                                                pathname: '/order',
                                                state: { oid: this.state.itemId }
                                            }}
                                            /> : null}
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Orders
