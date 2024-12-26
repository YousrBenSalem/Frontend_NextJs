"use client"

import React, { useEffect} from 'react'
import { useState } from 'react';

export default function UpdatePassword() {
  const [Data, setData] = useState({})
  const [id, setId] = useState("")

  const OnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }
  useEffect(()=>{
      const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setId(userData?.user?._id)  
    }   else {
          console.error("L'utilisateur n'a pas d'ID valide.");
        }

  


  },[])
  const UpdatePass = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),


      });

      if (response.ok) {
      
      console.log("Mot de passe mis à jour avec succès"); 
        alert("mot de passe changé avec succés");
  
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('update password error:', err);
      alert('An error occurred while update the password.');
    }
  };
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Update password</h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Update password</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Update password</span></h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form">
              <div id="success" />
              <form onSubmit={UpdatePass}>

                <div className="control-group">
                  <input type="password" className="form-control" id="Oldpassword" placeholder="Old Password" required data-validation-required-message="Please enter your old password" name="oldPassword" 
                    onChange={OnchangeHandler}
                  />
                  <p className="help-block text-danger" />
                </div>


                <div className="control-group">
                  <input type="password" className="form-control" id="Newpassword" placeholder="Your  New Password" required data-validation-required-message="Please enter your New password" name="newPassword" onChange={OnchangeHandler}  />
                  <p className="help-block text-danger" />
                </div>


                <div>
                  <button className="btn btn-primary py-2 px-4 mt-6" type="submit" id="loginButton">Submit
                  </button>

                </div>


              </form>
            </div>
          </div>

        </div>
      </div>
      {/* Contact End */}
    </div>
  )
}
