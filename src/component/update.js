import React, { useState, useRef,useEffect } from "react";
 
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
 
import { isEmail } from "validator";
import axios from "axios";
 
import '../style/common.css'
import Swal from 'sweetalert2'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
 


const Updateform = () => {
   

  


  const navigate = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState(null);
  

  

  const onChangeFirstName = (e) => {
    const  FirstName = e.target.value;
    setFirstName(FirstName);
  };
  const onChangeLastName = (e) => {
    const LastName = e.target.value;
    setLastName(LastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

 

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setEmail(localStorage.getItem('email'))
    setPassword(localStorage.getItem('password'))
}, []);


const updatevalue = ( ) => {
   axios.put(`https://6500379e18c34dee0cd48431.mockapi.io/api/Api/${id}`,{
      FirstName,
      LastName,
      email,
      password,
      
  },
  
  );

  Swal.fire(
    'Update Successfully',
    'User profile update succussfully',
    'question'
  ) 
  setTimeout(() => {
    navigate("/home")
    window.location.reload(false);
 }, 2000);
 ;

};
  return (
    <div className="col-md-12">
        <h2  style={{ textAlign:"center"}}>Update User </h2>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form >
          
            <div>
                  <div className="form-group">
                <label htmlFor="FirstName">FirstName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="FirstName"
                  value={FirstName}
                  onChange={onChangeFirstName}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="LastName">LastName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="LastName"
                  value={LastName}
                  onChange={onChangeLastName}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button onClick={updatevalue} className="btn btn-primary mx-auto d-block btn-block">Update</button>
              </div>
            </div>
       

         
        </Form>
      </div>
    </div>
  );
};

export default Updateform;