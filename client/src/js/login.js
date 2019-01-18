import React from 'react'
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import { userService } from '../util/userService';
import { Provider } from 'react-redux';
import store from '../util/store';
import { connect} from 'react-redux';
import { getAuthHeader} from '../util/actions/authActions';


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


    handleSubmit(event) {
        
        event.preventDefault();
    }

    handleSubmit = async e => {
        e.preventDefault();
        userService.login(this.state.username, this.state.password).then((data) =>{
            // console.log(data);
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
            // <Provider store={store}>
            <div className="d-flex justify-content-between">
                <div className="col-md-4 col-lg-offset-4"  >
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="usernameText"
                        //   validationState={this.getValidationState()}
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
                        //   validationState={this.getValidationState()}
                        >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Enter Password"
                                onChange={this.handleChangePassword}
                            />

                        </FormGroup>
                        <Button type="Login">Submit</Button>
                    </form>
                </div>
            </div>
            // </Provider>
        );
    }
}
// const mapStateToProps = (state) => {
//     return{
//         auth: state.auth
//     }
// };
export default Login