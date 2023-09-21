import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route,useNavigate,Link} from 'react-router-dom';
import UserService from '../service/service';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
        (response) => {
        
            console.log(response.data,"data")
              setContent(response.data);
        },
        (error) => {
          const  content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
          setContent(content);
        }
      );
    }, []);
 
    const setData = (data) => {
        let {id, FirstName, LastName, email,password } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', FirstName);
        localStorage.setItem('Last Name', LastName);
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
 
     }
    const onDelete = (id) => {
        
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  setTimeout(() => {
                    window.location.reload(false);
                 }, 3000);
                 ;
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
         
        axios.delete(`https://6500379e18c34dee0cd48431.mockapi.io/api/Api/${id}`) 
      
          
       }

    

  return (
    <div className="container">
      <header className="jumbotron">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Createdate</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <TableRow
              key={row.FirstName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.FirstName}
              </TableCell>
              <TableCell align="right">{row.LastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
           
              <Link to='/update'>
              <TableCell> 
              <Button variant="contained" onClick={() => setData(row)} >Update</Button>
            </TableCell>
            </Link>
   <TableCell> 
   <Button variant="contained" onClick={() => onDelete(row.id)} >Delete</Button>
   </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        {/* <h3>{content}</h3> */}
      </header>
    </div>
  );
};

export default Home;