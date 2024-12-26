"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../store/store";

const Topbar = () => {
  const cart = useSelector((state: RootState) => state.root.cart)
  const favoris = useSelector((state: RootState) => state.root.favoris)   
  const favorisCount = useSelector((state: RootState) => state.root.favoris.items.length);

  const quantityTotal = cart.items.reduce((sum, item) => sum + item.quantite, 0)
  const [nom, setNom] = useState("")
  const [id, setId] = useState("")
  console.log("quantityTotal", quantityTotal)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");


    if (storedUser) {
      const userData = JSON.parse(storedUser);

      console.log("Nom de l'utilisateur :", userData.user.name);
      setNom(userData.user.name);
      setId(userData.user._id)

    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  })

  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark" href="">FAQs</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="">Help</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="">Support</a>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark px-2" href="">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="text-dark px-2" href="">
              <i className="fab fa-twitter" />
            </a>
            <a className="text-dark px-2" href="">
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="text-dark px-2" href="">
              <i className="fab fa-instagram" />
            </a>
            <a className="text-dark pl-2" href="">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a href="" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
          </a>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for products" />
              <div className="input-group-append">
                <span className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <a href="/publication/favoris" className="btn border">
            <i className="fas fa-heart text-primary" />
            <span style={{ color: "black" }} className="badge">{id && favoris.items.some(item => item.clientId === id) ? favorisCount :0}</span>
          </a>
          <a href="/publication/panier" className="btn border">
            <i className="fas fa-shopping-cart text-primary" />
            <span style={{ color: "black" }} className="badge  ">{id && cart.items.some(item => item.clientId === id)  ? quantityTotal : 0}</span>
          </a>
          <Link href={`/profil/${id}`} className="btn border">
            <i className="fas fa-user text-primary" />
            <span style={{ color: "black" }}  className="badge">{nom || ""} </span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Topbar
