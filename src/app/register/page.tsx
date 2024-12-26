"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";




export default function Register() {
  interface Client {
    name: string;
    username: string;
    email: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    classement: string;
    numeroTel: string;
    password: string;
    item:"client"
  }
  const [formData, setFormData] = useState<Client>({
    name: '',
    username: '',
    email: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    classement: '',
    numeroTel: '',
    password: '',
    item: "client"
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const SignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:3000/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Account created successfully!');
        console.log(data);
        router.push("/login");


      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('An error occurred while creating the account.');
    }
  };
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Register</h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Register</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">Create Your Account</span></h2>
        </div>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form">
              <div id="success" />
              <form onSubmit={SignUp} >

                <div className="control-group">
                  <input type="text" className="form-control" id="name" placeholder="Your Name" required data-validation-required-message="Please enter your name" name="name" onChange={handleChange} value={formData.name}

/>
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group">
                  <input type="text" className="form-control" id="username" placeholder="Username" required data-validation-required-message="Please enter username" name="username" onChange={handleChange} value={formData.username}

 />
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group">
                  <input type="text" className="form-control" id="email" placeholder="Email" required data-validation-required-message="Please enter email" name="email" onChange={handleChange} value={formData.email}

/>
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group">
                  <input type="text" className="form-control" id="prenom" placeholder="Prenom" required data-validation-required-message="Please enter prenom" name="prenom" onChange={handleChange} value={formData.prenom}

/>
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group">
                  <input type="date" className="form-control" id="dateNaissance" placeholder="Date de Naissance" required data-validation-required-message="Please enter birthday" name="dateNaissance" onChange={handleChange} value={formData.dateNaissance}

/>
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group">
                  <input type="text" className="form-control" id="adresse" placeholder="Address" required data-validation-required-message="Please enter address" name="adresse" onChange={handleChange} value={formData.adresse}
 />
                  <p className="help-block text-danger"
 />
                </div>
                <div className="control-group">
                  <input type="text" className="form-control" id="classement" placeholder="Classement" required data-validation-required-message="Please enter classement" name="classement" onChange={handleChange} value={formData.classement}

/>
                  <p className="help-block text-danger" />
                </div>
                  <div className="control-group">
                  <input type="text" className="form-control" id="numeroTel" placeholder="numero Tel" required data-validation-required-message="Please enter numero Tel" name="numeroTel" onChange={handleChange} value={formData.numeroTel} 

 />
                  <p className="help-block text-danger" />
                </div>
                

                <div className="control-group">
                  <input type="password" className="form-control" id="password" placeholder="Password" required defaultValue='azerty' name="password" onChange={handleChange} value={formData.password}
 />
                
                </div>

                <div>
                  <button className="btn btn-primary py-2 px-4 mt-6" type="submit" id="loginButton">Sign up
                  </button>

                </div>
                <div>
                  <Link className="py-2 px-4 mt-8" href="/login">Already have an account</Link>
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
