'use client';

import { useEffect, useState } from "react";

import Link from "next/link";
import { useDispatch } from 'react-redux';
import { addToCart } from "./store/cartSlice";
import { addToFavoris } from "./store/favorisSlice";



export default function Home() {
  const [publications, setPublications] = useState<Publication[]>([]); 
  const dispatch = useDispatch()
    const [id, setId] = useState("")
  useEffect(() => {
    const storedUser = localStorage.getItem("user");


    if (storedUser) {
      const userData = JSON.parse(storedUser);

      console.log("id de l'utilisateur :", userData.user._id);
      setId(userData.user._id)

    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  })
  interface Publication {
    _id:number ,
    titre: string;
    description: string;
    date: string;
    image: string[];
    prix: number;
    promotion: number;
    entreprise:string;

  }


  
  const fetchPublications = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/publication");
      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("data",data) 
      setPublications(data.publicationData); 
    } catch (error) {
      console.error("Erreur lors de la récupération des publications:", error);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);
  const AddCart = (pub: Publication )=> {
    try {
      const cartData ={
        publicationId: pub._id, 
        titre:pub.titre,
        prix: pub.prix,
        quantite :1 ,
        entrepriseId: pub.entreprise,
        clientId:id ,

      }
      dispatch(addToCart(cartData));

    } catch (err) {
        console.error("Erreur lors de l'add to cart :", err);
      
    }  
}
  const AddFavoris = (pub: Publication) => {
    try {
      const cartData = {
        publicationId: pub._id,
        titre:pub.titre,
        prix: pub.prix,
        entrepriseId: pub.entreprise,
        clientId: id,

      }
      dispatch(addToFavoris(cartData));

    } catch (err) {
      console.error("Erreur lors de l'add to favoris :", err);

    }
  }

  return (
<div>
  {/* Topbar Start */}
  {/* Topbar End */}
  {/* Navbar Start */}
  {/* Navbar End */}
  {/* Featured Start */}
  <div className="container-fluid pt-5">
    <div className="row px-xl-5 pb-3">
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fa fa-check text-primary m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
          <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="d-flex align-items-center border mb-4" style={{padding: 30}}>
          <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
        </div>
      </div>
    </div>
  </div>
  {/* Featured End */}


  {/* Products Start */}
  <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">Trandy Products</span></h2>
    </div>
    <div className="row px-xl-5 pb-3">
          {publications.map((publication) => (
            <div key={publication._id} className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img className="img-fluid w-100" src={`http://localhost:3000/file/${publication.image[0]}` } alt="" />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{publication.titre}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>${publication.prix}</h6><h6 className="text-muted ml-2"><del>${publication.promotion}</del></h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link href={`/publication/${publication._id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</Link>
                  <button onClick={() => AddCart(publication)}  className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1" />Add To Cart</button>
                  <button onClick={() => AddFavoris(publication)} className="btn btn-sm text-dark p-0"><i className="fas fa-heart text-primary mr-1" />Add To Favoris</button>
                </div>
              </div>
            </div>
          ))}



    </div>
  </div>
  {/* Products End */}


  {/* Vendor Start */}
  <div className="container-fluid py-5">
    <div className="row px-xl-5">
      <div className="col">
        <div className="owl-carousel vendor-carousel">
          <div className="vendor-item border p-4">
            <img src="img/vendor-1.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-2.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-3.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-4.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-5.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-6.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-7.jpg" alt="" />
          </div>
          <div className="vendor-item border p-4">
            <img src="img/vendor-8.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Vendor End */}
  {/* Footer Start */}
  {/* Footer End */}
  {/* Back to Top */}
  <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up" /></a>
</div>

  );
}
