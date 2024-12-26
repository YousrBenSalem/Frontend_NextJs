"use client"
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

export default function Login() {
  interface Client {

    email: string;

    password: string;

  }
  const router = useRouter();

  const [formData, setFormData] = useState<Client>({

    email: '',

    password: '',

  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const SignIn = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        alert('login successfully!');
        console.log(data);
        router.push("/");

      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Signin error:', err);
      alert('An error occurred while login in the account.');
    }
  };
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Login</h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Login</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Login In Your Account</span></h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form">
              <div id="success" />
              <form name="sentMessage" id="contactForm" onSubmit={SignIn} >

                <div className="control-group">
                  <input type="email" className="form-control" id="email" placeholder="Your Email" required data-validation-required-message="Please enter your email" name="email" onChange={handleChange} value={formData.email} />
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group">
                  <input type="password" className="form-control" id="password" placeholder="Password" required data-validation-required-message="Please enter password" name="password" onChange={handleChange} value={formData.password} />

                </div>

                <div>
                  <button className="btn btn-primary py-2 px-4 mt-6" type="submit" id="loginButton">Login
                  </button>

                </div>
                <div>
                  <Link className="py-2 px-4 mt-8" href="/register">Create Account</Link>
                </div>

                <div>
                  <Link className="py-2 px-4 mt-8" href="/forget">Forget Password</Link>
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
