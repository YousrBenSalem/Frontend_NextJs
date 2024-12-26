"use client"
import React, { useState } from 'react'

export default function Forget() {
  interface Client {
    email: string;
  }
  const [formData, setFormData] = useState<Client>({
    email: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const forgot = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
      
        alert('check your email !');
        console.log(data);

      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Forgot error:', err);
      alert('An error occurred while forgot.');
    }
  }
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Forget Password</h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Forget Password</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Forget Password</span></h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form">
              <div id="success" />
              <form name="sentMessage" id="contactForm" onSubmit={forgot} >

                <div className="control-group">
                  <input type="email" className="form-control" id="email" placeholder="Your Email" required data-validation-required-message="Please enter your email" name="email" onChange={handleChange} value={formData.email} />
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
