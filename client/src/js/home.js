import React from 'react'
// import { Link } from 'react-router-dom'
// import { Table } from 'react-bootstrap';
// import Auth from '../util/auth';
// import { Redirect } from 'react-router-dom'
// The Header creates links that can be used to navigate
// between routes.

// import { Button } from 'react-bootstrap';
// import { FormGroup } from 'react-bootstrap';
// import { ControlLabel } from 'react-bootstrap';
// import { FormControl } from 'react-bootstrap';


class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { username: '', password: '' };

        // this.handleChangeUsername = this.handleChangeUsername.bind(this);
        // this.handleChangePassword = this.handleChangePassword.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChangeUsername(event) {
    //     this.setState({ username: event.target.value });
    // }

    // handleChangePassword(event) {
    //     this.setState({ password: event.target.value });
    // }


    // handleSubmit(event) {

    //     event.preventDefault();
    // }

    // handleSubmit = async e => {
    //     e.preventDefault();
    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    //     });
    //     const body = await response.text();
    //     // this.setState({ responseToPost: body });
    //     if (body == 'ok') {
    //         // alert("login ok.");
    //         sessionStorage.setItem('loggedIn', true);
    //         this.props.history.push('/orders')
    //     } else if (body == 'fail') {
    //         sessionStorage.setItem('loggedIn', false);
    //         alert("login fail. Please try again.");
    //         this.props.history.push('/login')

    //     }

    // };
    render() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            console.log('Authentication successful');
         }else{
            this.props.history.push('/login')
         }
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home
