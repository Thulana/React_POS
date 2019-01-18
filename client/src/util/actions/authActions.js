import { GET_HEADER, CHECK_PWD, AUTH_LOADING } from "./types";
import authHeader from '../authHeader';
import { dispatch } from "rxjs/internal/observable/pairs";
import { userService } from '../userService';

export const getAuthHeader = () => {
    return{
        type : GET_HEADER
    };
};

export const checkPassword = (username,password) => dispatch =>{
    dispatch(authLoading());
    userService.login(username, password).then((data) =>{
        // console.log(data);
        if(data.success === true){
            this.props.history.push('/orders')
        }else{
            alert("login fail. Please try again.");
            this.props.history.push('/login')
        }
    });
    // return{
    //     type : CHECK_PWD,
    //     payload: username,passwod
    // };
};

export const authLoading = () => {
    return{
        type : AUTH_LOADING,
    };
};