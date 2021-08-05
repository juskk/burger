import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = (reqTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, reqTime * 1000 )
    }
} 

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEe-CgCenKyncBilBEf4-XJBbpUxgtNSg';
        if (!isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEe-CgCenKyncBilBEf4-XJBbpUxgtNSg'
        axios.post(url, authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId'); 
                dispatch(authSuccess(token, userId));
                dispatch(   checkAuthTimeout(     ( expirationDate.getTime() - new Date().getTime() ) / 1000)    )
            } else {
                dispatch(logout())
            }
            
        }

    }
}