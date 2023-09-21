import axios from "axios";

const API_URL = "https://6500379e18c34dee0cd48431.mockapi.io/api/Api";


const register = (FirstName,LastName, email, password) => {
    return axios.post(API_URL, {
        FirstName,
        LastName,
        email,
        password,
    });
  };
 

  const login = (email, password) => {
    return axios
      .post(API_URL  , {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const getPublicContent = () => {
    return axios.get(API_URL);
  };
  const logout = () => {
    localStorage.removeItem("user");
  };

  export default {
    register,
    getPublicContent,
    login,
    logout,
   
  };