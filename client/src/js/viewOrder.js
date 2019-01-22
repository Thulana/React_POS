import React from 'react'
import { Table } from 'react-bootstrap';
import { authHeader } from '../util/authHeader';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Label } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { createBrowserHistory } from 'history';



class viewOrder extends React.Component {
    // initially data is empty in state
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
    history = createBrowserHistory();
    componentDidMount() {
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
            this.props.history.listen((location, action) => {
                console.log(
                    `The current URL is ${location.pathname}${location.search}${location.hash}`
                );
                console.log(`The last navigation action was ${action}`);
            });
        console.log("component mounted.");
    }

    // componentWillUnmount() {
    //     console.log("time to save =++++++++++++++++++++++++++++=");
    // }
    // routerWillLeave(nextLoc) {
    //     this.saveOrder();
    // }

    onRouteChanged() {
        console.log("route changed");
        this.saveOrder();
    }

    saveOrder = () => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ order: this.state.order })
        };
        fetch("/api/save_order", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {

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
    changeSubTotal = (e, id) => {
        console.log('e value', e.currentTarget.innerText);
        let order = this.state.order;
        if (e.currentTarget.innerText === '') {
            order.items[id] = 0;
        } else {
            order.items[id] = parseInt(e.currentTarget.innerText);
        }
        this.setState({ order: order });
        this.updateTotal();
    }

    removeItem = (oid) => {
        let newItems = [];
        this.state.items.forEach(element => {
            if (element['id'] != oid) {
                newItems.push(element);
            }
        });
        let newOrder = this.state.order;
        let newItemList = {};
        for (var key in newOrder.items) {
            if (parseInt(key) === oid) {
                // console.log("found to remove");
                delete newOrder.items[key];
            }
        }
        this.setState({
            items: newItems,
            order: newOrder
        });

    }

    selectItemChange = (e, itemNo) => {
        // console.log(e.target.value);
        let selectedItemNo = e.target.value;
        let selectedItem = '';
        this.state.itemList.forEach(element => {
            if (parseInt(selectedItemNo) === element['id']) {
                selectedItem = element;
                console.log("hooray");
            }
        });
        let items = this.state.items;
        // console.log(selectedItem);
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (isNaN(parseInt(selectedItemNo))) {
                return
            }
            console.log(itemNo, element['id'])
            if (selectedItem['id'] === element['id']) {
                alert("this item is already added");
                return
                //     return (<Alert bsStyle="warning">
                //         <strong>This item is already added</strong>
                //         good.
                //   </Alert>);
            }

            if (index + 1 === itemNo) {
                items[index] = selectedItem;
                console.log('hoorey');
            }
        }
        this.setState({
            items: items
        });
        this.updateTotal();

    }
    addItem = () => {
        let newItem = {};
        let items = this.state.items;
        newItem['id'] = '';
        newItem['name'] = '';
        newItem['price'] = 0;
        newItem['qty'] = '';
        items.push(newItem);
        this.setState({
            items: items
        });
        console.log(isNaN(this.state.order.items[newItem.id]));

    }

    updateTotal = () => {
        // console.log("=++++++++++++++++++++ updating");
        let tot = 0;
        this.state.items.forEach(element => {
            if (isNaN(this.state.order.items[element['id']]) || isNaN(element['price'])) {
                return;
            }
            // console.log(this.state.order.items[element['id']], element['price']);
            tot = tot + (this.state.order.items[element['id']] * element['price']);
        });
        // console.log('total',tot);
        this.setState({
            total: tot
        });

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
                                        // console.log(this.state.itemList);
                                        return (
                                            <tr key={key}>
                                                <td>{val}</td>
                                                <td>{item.id}</td>
                                                <td><select onChange={e => this.selectItemChange(e, val)} id={val}>{this.state.itemOptions}</select></td>
                                                <td>{item.price}</td>
                                                <td contentEditable='true' onInput={e => this.changeSubTotal(e, val)}>{this.state.order.items[item.id]}</td>
                                                <td>{item.price * this.state.order.items[item.id]}</td>
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
                                                <td contentEditable='true' onInput={e => this.changeSubTotal(e, item.id)}>{this.state.order.items[item.id]}</td>
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
                    <Form inline>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>Total  :   </ControlLabel>{' '}
                            <FormControl type="number" value={this.state.total} ></FormControl>
                        </FormGroup>{' '}
                        {/* <Button className="btn-success" onClick={() => { this.addItem() }}>Add Item</Button>
                        <Button className="btn-success" onClick={() => { }}>Save Order</Button> */}
                    </Form>
                    <br></br>
                    <Row className="show-grid">
                        <Col md={2}  >
                            <Button className="btn-success" onClick={() => { this.addItem() }}>Add Item</Button>

                        </Col>
                        <Col md={2} mdOffset={8}  >
                            <Button className="btn-success" onClick={() => { this.saveOrder() }}>Save Order</Button>
                        </Col>



                    </Row>


                </form>
            </div>
        );
    }
}

export default viewOrder
