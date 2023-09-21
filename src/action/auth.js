import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./type";
  
  import AuthService from "../service/service";

  export const register =(FirstName,LastName,email,password)=>(dispatch)=>{
    return AuthService.register(FirstName,LastName, email, password).then(
        (response) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: "Success",
          });
    
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          dispatch({
            type: REGISTER_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
        }
      );
    };
    
    export const login = (email, password) => (dispatch) => {
      return AuthService.login(email, password).then(
        (data) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
          });
    
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          dispatch({
            type: LOGIN_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
        }
      );
    };
    
    export const logout = () => (dispatch) => {
      AuthService.logout();
    
      dispatch({
        type: LOGOUT,
      });
    };

    