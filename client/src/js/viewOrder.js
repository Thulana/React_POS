import React from 'react'
import { Table } from 'react-bootstrap';
import { authHeader } from '../util/authHeader';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { withRouter } from "react-router";
import { orderService } from "../util/orderService";


class viewOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            order: [],
            items: [],
            itemList: [],
            itemOptions: [],
            total: 0
        }
        this.updateTotal = this.updateTotal.bind(this);

    }
    componentDidMount() {
        if (this.props.location.state.oid !== 'new') {
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
                        this.setState({
                            order: result.order,
                            items: result.items,
                            itemList: result.itemList
                        });
                        let itemOpts = [];
                        itemOpts.push(<option > Select a Item </option>);
                        result.itemList.forEach(element => {
                            itemOpts.push(<option key={element['id']} value={element['id']}> {element['name']} </option>);
                        });
                        this.setState({
                            itemOptions: itemOpts
                        });
                        this.updateTotal();
                    },
                    (error) => {
                        console.log(error);
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )

        } else {
            const requestOptions = {
                method: 'GET',
                headers: authHeader()
            }
            fetch("/api/get_items", requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            itemList: result.items
                        });
                        let itemOpts = [];
                        itemOpts.push(<option > Select a Item </option>);
                        result.items.forEach(element => {
                            itemOpts.push(<option key={element['id']} value={element['id']}> {element['name']} </option>);
                        });
                        this.setState({
                            itemOptions: itemOpts,
                            order: {
                                id: '',
                                customer: '',
                                state: 'open',
                                items: {}
                            }
                        });

                        this.updateTotal();
                        this.addItem();
                    },
                    (error) => {
                        console.log(error);
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )

        }

    }

    saveOrder = () => {
        var data = orderService.save_order(this.state.order);
        console.log("order saved", data);
    }
    changeSubTotal = (e, id) => {
        console.log('e value', e.target.value);
        let order = this.state.order;
        order.items[id] = parseInt(e.target.value);
        this.setState({ order: order });
        this.updateTotal();
        this.saveOrder();
    }

    removeItem = (oid) => {
        let newItems = [];
        this.state.items.forEach(element => {
            if (element['id'] !== oid) {
                newItems.push(element);
            }
        });
        let newOrder = this.state.order;
        for (var key in newOrder.items) {
            if (parseInt(key) === oid) {
                delete newOrder.items[key];
            }
        }
        this.setState({
            items: newItems,
            order: newOrder
        });
        this.updateTotal();
        this.saveOrder();

    }

    selectItemChange = (e, itemNo) => {
        let selectedItemNo = e.target.value;
        let selectedItem = '';
        this.state.itemList.forEach(element => {
            if (parseInt(selectedItemNo) === element['id']) {
                selectedItem = element;
                console.log("hooray");
            }
        });
        let items = this.state.items;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (isNaN(parseInt(selectedItemNo))) {
                return
            }
            console.log(itemNo, element['id'])
            if (selectedItem['id'] === element['id']) {
                alert("This item is already added");
                return
            }

            if (index + 1 === itemNo) {
                items[index] = selectedItem;
            }
        }
        this.setState({
            items: items
        });
        this.updateTotal();
        this.saveOrder();

    }
    addItem = () => {
        let newItem = {};
        let items = this.state.items;
        newItem['id'] = '';
        newItem['name'] = '';
        newItem['price'] = 0;
        newItem['qty'] = 1;
        items.push(newItem);
        this.setState({
            items: items
        });

    }

    updateTotal = () => {
        let tot = 0;
        this.state.items.forEach(element => {
            if (isNaN(this.state.order.items[element['id']]) || isNaN(element['price'])) {
                return;
            }
            tot = tot + (this.state.order.items[element['id']] * element['price']);
        });
        this.setState({
            total: tot
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
        console.log(this.state.items);
        return (
            <div className='col-md-6 col-lg-offset-3'>
                <h2>Order Details</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='col-lg-6 col-lg-offset-3'>
                        <FormGroup
                        >
                            <label >Order ID : </label>
                            <input
                                className="form-control"
                                type="text"
                                id="id_input"
                                value={this.state.order.id}
                                placeholder="Enter orderID"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    let order = this.state.order;
                                    order['id'] = val;
                                    this.setState({
                                        order: order,
                                    });

                                }}
                            />
                        </FormGroup>
                        <FormGroup
                        >
                            <ControlLabel>Customer Name</ControlLabel>
                            <input
                                type="text"
                                id="name_input"
                                className="form-control"
                                defaultValue={this.state.order.customer}
                                placeholder="Enter customer"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    let order = this.state.order;
                                    order['customer'] = val;
                                    this.setState({
                                        order: order,
                                    });
                                }}
                            />

                        </FormGroup>

                    </div>
                    <Table striped bordered condensed hover onChange={e => this.updateTotal(e)}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th data-value="test2">Qty</th>
                                <th>Sub total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                this.state.items.map((item, key) => {
                                    val = val + 1
                                    console.log(item);
                                    if (item.id === '') {
                                        return (
                                            <tr key={key}>
                                                <td>{val}</td>
                                                <td>{item.id}</td>
                                                <td><select className="form-control" onChange={e => this.selectItemChange(e, val)} id={val}>{this.state.itemOptions}</select></td>
                                                <td>{item.price}</td>
                                                <td className='col-md-2'>
                                                    <input
                                                        min="0"
                                                        id={item.name}
                                                        type="number"
                                                        className="form-control"
                                                        value={this.state.order.items[item.id]}
                                                        placeholder="Enter qty"
                                                        onChange={e => this.changeSubTotal(e, item.id)}
                                                    />

                                                </td>
                                                {/* <td>{item.price * this.state.order.items[item.id]}</td> */}
                                                {
                                                    isNaN(item.price * this.state.order.items[item.id]) ? (
                                                        <td>{0}</td>
                                                    ) : (
                                                            <td>{item.price * this.state.order.items[item.id]}</td>
                                                        )
                                                }
                                                <td><Button bsStyle="danger" onClick={() => { this.removeItem(item.id) }}>X</Button></td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={key}>
                                                <td>{val}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td className='col-md-2'>
                                                    <input
                                                        min="0"
                                                        id={item.name}
                                                        type="number"
                                                        className="form-control"
                                                        value={this.state.order.items[item.id]}
                                                        // value = { isNaN(this.state.order.items[item.id]) ? ( console.log("working lol")) : (console.log("working lolol"))}
                                                        placeholder="Enter qty"
                                                        onChange={e => this.changeSubTotal(e, item.id)}
                                                    />

                                                </td>
                                                {
                                                    isNaN(item.price * this.state.order.items[item.id]) ? (
                                                        <td>{0}</td>
                                                    ) : (
                                                            <td>{item.price * this.state.order.items[item.id]}</td>
                                                        )
                                                }
                                                <td><Button bsStyle="danger" onClick={() => { this.removeItem(item.id) }}>X</Button></td>
                                            </tr>
                                        )

                                    }

                                })
                            }

                        </tbody>
                    </Table>





                    <br></br>
                    <Row className="show-grid">
                        <Col md={2}  >
                            <Button className="btn-success" onClick={() => { this.addItem() }}>Add Item</Button>

                        </Col>
                        <Col md={2} mdOffset={4}  >
                            <ControlLabel>Total  :   </ControlLabel>{' '}

                        </Col>
                        <Col md={2}><FormControl type="number" value={this.state.total} ></FormControl></Col>

                        <Col md={2}  >
                            <Button className="btn-success" onClick={() => { this.saveOrder() }}>Save Order</Button>

                        </Col>



                    </Row>


                </form>
            </div>
        );
    }
}

export default withRouter(viewOrder)
