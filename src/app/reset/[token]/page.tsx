"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'



export default function Reset() {
//interface Password { password: string; confirmPassword: string }

  const { token } = useParams();
  const [formData, setFormData] = useState({});
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
  };
  const Reset = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
    
      const response = await fetch(`http://localhost:3000/auth/resetPassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) ,
      });

      if (response.ok) {
        //const data = await response.json();

        alert('mot de passe changé avec succés');
      //  console.log(data);

      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Erreur lors de changement de mot de passe:', err);
      alert('An error occurred while reset password.');
    }
  }
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Reset password</h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Reset password</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Reset password</span></h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form">
              <div id="success" />
              <form onSubmit={Reset} >

                <div className="control-group">
                  <input type="password" className="form-control" id="password" placeholder="Your Password" required data-validation-required-message="Please enter your password" name="password" onChange={handlePasswordChange} 
 />
                  <p className="help-block text-danger" />
                </div>


                <div className="control-group">
                  <input type="password" className="form-control" id="Confirmpassword" placeholder="Your Confirm Password" required data-validation-required-message="Please enter your confirm password" name="Confirmpassword" onChange={handleConfirmPasswordChange}/>
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
