import { GET_HEADER, CHECK_PWD, AUTH_LOADING } from "../actions/types";
import authHeader from '../authHeader';

const initialState = {
    user: '',
    password: '',
    token: '',
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HEADER:
        return {
            ...state,
            token: authHeader()
        }
        case CHECK_PWD:

            return {
                
            }
        case AUTH_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return {
                ...state
            }
    }
}