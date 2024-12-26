"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { useDispatch } from 'react-redux';

import { clearFavoris, removeFromFavoris } from '@/app/store/favorisSlice';
//import Image from 'next/image';
export default function Favoris() {
    const [idClient , setIdClient] = useState();
  const favoris = useSelector((state: RootState) => state.root.favoris)  
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
    
          console.log("Id de l'utilisateur :", userData.user._id);
          setIdClient(userData.user._id)
    /*       const GroupByEntreprise = cart.items.reduce((item , index)=> {
            if (!item[index.entrepriseId]){
              item[index.entrepriseId] = []
            }else {
                item[index.entrepriseId].push(index)
            }
          }) */
    
        } else {
          console.log("Aucun utilisateur trouvé dans le localStorage");
        }
    
    
      })
  const dispatch = useDispatch();

  return (
  <div>
  {/* Page Header Start */}
  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3"> Favoris</h1>
      <div className="d-inline-flex">
        <p className="m-0"><a href="">Home</a></p>
        <p className="m-0 px-2">-</p>
            <p className="m-0">Favoris</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Cart Start */}
  <div className="container-fluid pt-5">
        {idClient ? (
          <div className="row px-xl-5">
            {favoris?.items?.length > 0 && favoris.items.some(item => item.clientId === idClient) ? (<div className="col-lg-12 table-responsive mb-5">
              <table className="table table-bordered text-center mb-0">
                <thead className="bg-secondary text-dark">
                  <tr>
                    <th>Publication</th>
                    <th>Entreprise</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {favoris.items.map((item , index)=>(
                    <tr key={index}>
                      <td className="align-middle">   
                        {/* <Image
                          src={`http://localhost:3000/file/${item.image[0]}`}
                        alt="Product Image"
                        width={50}
                        height={50}
                        className="rounded" 
                      /> */}{item.titre}</td>
                      <td className="align-middle">{item?.entrepriseId?.name}</td>

                      <td className="align-middle">{item.prix.toFixed(2)} €</td>
                      <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => dispatch(removeFromFavoris(item))}><i className="fa fa-times" /></button></td>
                    </tr>
 
                  ))}
                



                </tbody>
              </table>
              <div className="mt-5 d-flex justify-content-end">
                <button className="btn btn-sm btn-primary" onClick={() => dispatch(clearFavoris())}>
                  <i className="fa fa-times" /> Clear All
                </button>
              </div>

            </div>) : (<div className="text-center py-5">
              <h3 className="text-secondary">Votre favoris est vide</h3>
              <p>Ajoutez des articles.</p>
              <Link href="/" className="btn btn-primary btn-lg">
                <i className="bi bi-arrow-left"></i> Retour à la boutique
              </Link>
            </div>)}
          

        </div>):(
          <div className = "text-center py-5">
          <h3 className = "text-secondary">Votre favoris  404</h3>
      <p>Creer un compte ou bien connecter pour consulter votre panier.</p>
      <Link href="/login" className="btn btn-primary btn-lg">
        <i className="bi bi-arrow-left"></i> Login
      </Link>
    </div>
    )}
  
  </div>
  {/* Cart End */}
</div>

  )
}
