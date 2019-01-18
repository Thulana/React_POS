import React from 'react'
// import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';
// import Auth from '../util/auth';
import { authHeader } from '../util/authHeader'
// import { Redirect } from 'react-router-dom'
// The Header creates links that can be used to navigate
// between routes.

import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';


class viewOrder extends React.Component {
    // initially data is empty in state
    constructor() {
        super()
        this.state = {
            order: [],
            items: []
        }

    }
    componentDidMount() {
        console.log("view order mounted");
        console.log(this.props.location.state.oid);
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({
                oid: this.props.location.state.oid,
            }),
        }
        fetch("/api/view_order", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        order: result.order,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    viewOrder = (oid) => {
        alert(oid);
    }
    render() {

        let user = JSON.parse(localStorage.getItem('user'));
        // alert(user.token);
        if (user && user.token) {
            console.log('Authentication successful');
        } else {
            this.props.history.push('/login')
        }
        // alert();

        // if (logged == {}) {
        //     this.props.history.push('/login')
        // }
        var val = 0;
        console.log(this.state.items);
        return (
            <div className='col-md-6 col-lg-offset-3'>
                <form onSubmit={this.handleSubmit}>
                    <div className='col-lg-6 col-lg-offset-3'>
                        <FormGroup
                            controlId="OrderID"
                        //   validationState={this.getValidationState()}
                        >
                            <ControlLabel>Order ID</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.order.id}
                                placeholder="Enter orderID"
                            // onChange={this.handleChangeUsername}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="cusName"
                        //   validationState={this.getValidationState()}
                        >
                            <ControlLabel>Customer Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.order.customer}
                                placeholder="Enter customer"
                            // onChange={this.handleChangePassword}
                            />

                        </FormGroup>

                    </div>
                    <Table striped bordered condensed hover className=''>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                this.state.items.map((item, key) => {
                                    val = val + 1
                                    return (
                                        <tr key={key}>
                                            <td>{val}</td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.qty}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                    <Button className="btn-success">Edit</Button>

                </form>

            </div>
        );
    }
}

export default viewOrder
