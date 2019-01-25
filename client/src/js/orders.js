import React from 'react'
import { Table } from 'react-bootstrap';
import { authHeader } from '../util/authHeader'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { orderService } from '../util/orderService';



class Orders extends React.Component {
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

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    viewOrder = (oid) => {
        this.setState({ showItem: true, itemId: oid });

    }
    saveOrder = (order) => {
        orderService.save_order(order);
    }
    removeItem = (id) => {
        let ordersTemp = [];
        for (let key in this.state.data) {
            let order = this.state.data[key];
            if (order['id'] !== id) {
                ordersTemp.push(order);
            } else {
                let edited = order;
                edited['state'] = "closed";
                this.saveOrder(edited);
            }
        }
        this.setState({
            data: ordersTemp
        });
    }
    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            console.log('Authentication successful');
        } else {
            this.props.history.push('/login')
        }
        var val = 0;
        return (
            <div>
                <h2>Order List</h2>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Edit</th>
                            <th>Complete</th>
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
                                        <td><Button bsStyle="success" type="submit" onClick={() => { this.viewOrder(item.id) }}>Edit</Button>
                                            {this.state.showItem ? <Redirect to={{
                                                pathname: '/order',
                                                state: { oid: this.state.itemId }
                                            }}
                                            /> : null}
                                        </td>
                                        <td><Button bsStyle="danger" onClick={() => { this.removeItem(item.id) }}>Pay</Button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
                <Button bsStyle="primary" onClick={() => { this.props.history.push({ pathname: '/order', state: { oid: 'new' } }) }}>Add New Order</Button>
            </div>
        );
    }
}

export default Orders
