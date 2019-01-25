import React from 'react'
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { userService } from '../util/userService';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        userService.login(this.state.username, this.state.password).then((data) =>{
            if(data.success === true){
                this.props.history.push('/orders')
            }else{
                alert("login fail. Please try again.");
                this.props.history.push('/login')
            }
        });
        
    };

    render() {
        return (
            <div className="d-flex justify-content-between">
                <div className="col-md-4 col-lg-offset-4"  >
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="usernameText"
                        >
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.username}
                                placeholder="Enter Username"
                                onChange={this.handleChangeUsername}
                            />

                        </FormGroup>
                        <FormGroup
                            controlId="passwordText"
                        >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Enter Password"
                                onChange={this.handleChangePassword}
                            />

                        </FormGroup>
                        <Button type="submit" className='btn-success'>Login</Button>
                    </form>
                </div>
               
            </div>
        );
    }
}

export default Login