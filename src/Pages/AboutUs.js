import React from "react";

import { useForm } from "react-hook-form";

import styled from "styled-components";

import * as moment from "moment";
import { Icon } from "@mui/material";

import { TextField } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@material-ui/data-grid";

import Dialog from "./Dialog.js";

toast.configure();

// import saveData from "./some_other_file";

const Styles = styled.div`
 background: lavender;
 padding: 20px;

 h1 {
   border-bottom: 1px solid white;
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: white;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 30px 50px;
 }

 input {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
 }

 label {
   color: #3d3d3d;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }

 .submitButton {
   background-color: #6976d9;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
`;

export const AboutUs = () => {
  const { register, handleSubmit } = useForm();

  console.log("am bout as about");

  return (
    <div className="home">
      <p>GeeksforGeeks About us</p>
    </div>
  );
};

export const OurAim = () => {
  const [products, setProducts] = useState([]);

  //You can put all product information into diaglog
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameProduct: "",
  });

  const idProductRef = useRef();

  const handleDialog = (message, isLoading, nameProduct) => {
    setDialog({
      message,
      isLoading,
      //Update
      nameProduct,
    });
  };

  const handleDelete = (id) => {
    //Update
    const index = record.findIndex((p) => p.id === id);

    handleDialog("Are you sure you want to delete?", true, record[index].order);
    idProductRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      // setProducts(products.filter((p) => p.id !== idProductRef.current));
      deleteRecord(idProductRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const { register, handleSubmit } = useForm();

  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    name: "",
    address: "",
    order: "",
    date: "",
  });

  // On Page load display all records
  const loadEmployeeDetail = async () => {
    var response = fetch("http://localhost:5000/fetchall")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log("all emplyee data", myJson);
        setRecord(myJson);
      });
  };
  useEffect(() => {
    loadEmployeeDetail();
  }, []);

  // Delete Employee Record
  const deleteRecord = (employeeid) => {
    axios
      .delete(`http://localhost:5000/delete`, { params: { id: employeeid } })
      .then((result) => {
        toast.error("Deleted Sucessfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
        });
        loadEmployeeDetail();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  const handleChange = (e) => {
    e.persist();
    e.preventDefault();
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const submitEmployeeRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    user.date = moment(user.date).format("YYYY/MM/DD");

    axios.request({
      method: "post",
      url: "https://login.microsoftonline.com/9362c264-f4cf-45d3-8e60-ef88ceb73603/oauth2/v2.0/token",
      data: "client_id=dc3cba5c-d9f7-4a84-b6f6-f51d07a20480&scope=user.read&grant_type=authorization_code&code=0.AXAAZMJik8_000WOYO-Izrc2A1y6PNz32YRKtvb1HQeiBIBwAEM.AgABAAIAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P8ZQMPAjLG6M74DsZ8TOuox6ntaUBtW2c4mSs1Yoy5N0Mcedgtc_IMvmRqfSnQsi-IliK6fEDaNZzmNVlInZ99e2tlTk_Gl_zNuqMpqiBaBOWO63n65OLq-IoRBEDeQoWTEzVAVFzoon1tzkHfetWLvw4YsE30i-fWQBCWKQ8clsWKPL4ScaRmo9ivPLvTMMdIFAWzSLJuLzM-g9ohYS1SyNssFnS5VFw1nW7OEgp_Idq9rX0One6ySNDH8ZD7Y0K8ioyesD1f2K2OWGQ_21O_ABDr_dtBQkbHlBKSWlR2jW4bMAzGawLXM2spOsuV5D2zb6YvtZgGWmsPy9yKV91qXqcL0Eyti8tUXKiSSQlAtq0UeVTBoi6aloslZMj8U3u9S6TRORa8xHXg6LWYQX3yf3I82RjzJUK3pVR0Ro4Vk9pX7rxDPOgorR7gqFYOrwzpRoY5PBPSNhLYVM7-drcAc6A-1q-kF5OsPqqwjbzTTo2D9K5MgSEAx8FY8XziTqyx05Q9J4fdBfq_rmiXCGD0ju0imMzKrQzYQNAVmxOLQfE_LTKsvv29MOYSHjq0TmhSUioG91u7qf72HcjHEdSfMBLvLbg4k5CERuwM7a6zLejkFVBcG3ri_bF1J-XNCh3q-ofze9-FhPVl860IEoD8n5S9wcNfFdmfX5M37w5wTKnRKf5W-jeHrNUeVeLgMBvy8bBItIMIruwuVp8UdojM_Bfo&redirect_uri=http://localhost:10091/api/redis/employee/getmsteamauthcode",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

      }
    })
      .then((res) => {
        console.log("res", res.data);
      }).catch(function (error) {
        console.log(error);
      });


    await axios.post("http://localhost:5000/register", user);

    toast.success("Saved Sucessfully", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
    });
    loadEmployeeDetail();

    // alert('Data Inserted');
  };

  function Form() {
    return (
      <div>
        <form onSubmit={submitEmployeeRecord}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <label>Order Number</label>
              <input
                type="text"
                name="order"
                value={user.order}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <label>Time</label>
              <input
                type="date"
                name="date"
                value={user.date}
                onChange={handleChange}
              />
            </Grid>

            {/* <Grid item xs={4}>
		<label>File</label>
			<input  type="file" name="order"  />
          </Grid>

		  <Grid item xs={4}>
		<label>Date</label>
		<input type="date" name="date"  />
		 </Grid>

		  <Grid item xs={4}>

		  <label>Time</label>
			<input  type="time" name="order"  />
		</Grid>


		  <Grid item xs={4}>
		  <label>Checkbox</label>
			<input  type="checkbox" name="order"  />
		 </Grid>

		  <Grid item xs={4}>
		  <label>Color</label>
			<input  type="color" name="order"  />
          
		  </Grid>

		  <Grid item xs={4}>

		  <label>DateTime</label>
			<input  type="datetime-local" name="order"  />
		  </Grid> */}
          </Grid>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                type="reset"
                variant="contained"
                name="order"
                color="success"
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                name="order"
                color="success"
              >
                Success
              </Button>
            </Grid>
          </Grid>
        </form>

        <table
          class="table table-hover  table-striped table-bordered ml-4 center "
          style={{ marginTop: `43px`, margin: `0 auto` }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Order</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {record.map((name) => (
              <tr>
                <td>{name.name}</td>
                <td>{name.addresss}</td>
                <td>{name.order}</td>
                <td>{moment(name.time).format("hh:mm A")}</td>
                <td>
                  <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                    <EditIcon />
                  </Link>
                  <DeleteIcon
                    onClick={() => handleDelete(name.id)}
                    style={{
                      marginTop: "10px",
                      background: "red",
                      fontWeight: "bolder",
                      border: "none",
                      padding: "8px",
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  ></DeleteIcon>
                </td>
              </tr>
            ))}

            {dialog.isLoading && (
              <Dialog
                //Update
                nameProduct={dialog.nameProduct}
                onDialog={areUSureDelete}
                message={dialog.message}
              />
            )}
          </tbody>
        </table>
      </div>

      /* 	<label>Address</label>
      <input name="address"  />
      <label>Date</label>
      <input type="date" name="date"  />
      <label>Order Number</label>
      <input name="order"  />

      <label>File</label>
      <input  type="file" name="order"  />


  	

      <label>DateTime</label>
      <input  type="datetime-local" name="order"  />

      <label>Email</label>
      <input  type="email" name="order"  />



      <label>Password</label>
      <input  type="password" name="order"  />

      <label>Number</label>
      <input  type="number" name="order"  />

      <label>Reset</label>
      <input  type="reset" name="order"  />

      <input type="submit" className="submitButton" />  */

      /* 	
	
	
        <label>Hidden</label>
      <input  type="hidden" name="order"  />

      <label>Image</label>
      <input  type="image" name="order"  />

      <label>Month</label>
      <input  type="month" name="order"  /> 
	
  <label>Radio</label>
      <input  type="radio" name="order"  />
  	
      <label>Range</label>
      <input  type="range" name="order"  />
             
       <label>Search</label>
      <input  type="search" name="order"  />

      <label>Tel</label>
      <input  type="tel" name="order"  />

      <label>Url</label>
      <input  type="url" name="order"  />

      <label>Week</label>
      <input  type="week" name="order"  />  */
    );
  }

  /* const { register, handleSubmit } = useForm(); */
  console.log("am bout as Aim");
  return (
    <Styles>
      <Form />
    </Styles>
  );
};

const columns = [
  { field: "id", headerName: "Id" },
  { field: "jobTitle", headerName: "JobTitle", width: 200 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "addresss", headerName: "Address", width: 200 },
  { field: "order", headerName: "Order", width: 200 },
];

export const OurVision = () => {
  console.log("am bout as Vision ");

  const [table, setTable] = useState([]);

  const loadEmployeeDetail = async () => {
    var response = fetch("http://localhost:5000/fetchall")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log("all emplyee data", myJson);
        setTable(myJson);
      });
  };
  useEffect(() => {
    loadEmployeeDetail();
  }, []);

  return (
    <div style={{ height: 700, width: "100%" }} className="contact">
      <DataGrid
        rows={table}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
};
