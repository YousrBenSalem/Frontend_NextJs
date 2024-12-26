'use client';

import ResponsiveCarousel from '@/app/components/carousel'
import { addToCart } from '@/app/store/cartSlice';
import { addToFavoris } from '@/app/store/favorisSlice';
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export default function Details (){
  const {id} = useParams();
  const [publication, setPublication] =useState<Publication>(); 
  const dispatch = useDispatch()
  const [idClient, setIdClient] = useState("")


    interface Publication {
    _id:number ,
    titre: string;
    description: string;
    date: string;
    image: string[];
    prix: number;
    promotion: number;
    entreprise: string;



  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user");


    if (storedUser) {
      const userData = JSON.parse(storedUser);

      console.log("id de l'utilisateur :", userData.user._id);
      setIdClient(userData.user._id)

    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  })
  const fetchPublicationById = async(): Promise<void> =>{
    try{
      const response = await fetch(`http://localhost:3000/publication/${id}`);
          if (!response.ok) {
        throw new Error(`Erreur: ${response.status} ${response.statusText}`);
      }
const data = await response.json();
      console.log("data",data) 
      setPublication(data.existingPublication);
    }catch(error){
      console.error("Erreur lors de la récupération des publications:", error);
    }

  }
    useEffect(() => {
    fetchPublicationById();
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const AddFavoris = (pub: Publication) => {
    try {
      const cartData = {
        publicationId: pub._id,
        titre:pub.titre,

        prix: pub.prix,
        entrepriseId: pub.entreprise,
        clientId: idClient,

      }
      dispatch(addToFavoris(cartData));

    } catch (err) {
      console.error("Erreur lors de l'add to favoris :", err);

    }
  }
  const AddCart = (pub: Publication) => {
    try {
      const cartData = {
        publicationId: pub._id,
        titre:pub.titre,
        prix: pub.prix,
        quantite: quantity,
        entrepriseId: pub.entreprise,
        clientId: idClient ,


      }
      dispatch(addToCart(cartData));

    } catch (err) {
      console.error("Erreur lors de l'add to cart :", err);

    }
  }
  return (
<div>
    <div className="container-fluid bg-secondary mb-5">
  <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
    <h1 className="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
    <div className="d-inline-flex">
      <p className="m-0"><a href ="">Home</a></p>
      <p className="m-0 px-2">-</p>
      <p className="m-0">Shop Detail</p>
    </div>
  </div>
</div>

      <div className="container-fluid py-5">
        {publication ? (
          <div key={publication._id}>
            <div className="row px-xl-5">

              <div className="col-lg-5 pb-5">

                <Card>
                  <Card.Header>
                    <ResponsiveCarousel files={publication.image} />
                  </Card.Header>
                </Card>
              </div>
              <div className="col-lg-7 pb-5">

                <h3 className="font-weight-semi-bold">{publication.titre}</h3>
                <div className="d-flex mb-3">
                  <div className="text-primary mr-2">
                    <small className="fas fa-star" />
                    <small className="fas fa-star" />
                    <small className="fas fa-star" />
                    <small className="fas fa-star-half-alt" />
                    <small className="far fa-star" />
                  </div>
                  <small className="pt-1">({publication.promotion} Promotion)</small>
                </div>
                <h3 className="font-weight-semi-bold mb-4">${publication.prix}</h3>
                <p className="mb-4">{publication.description}</p>
                <div className="d-flex mb-3">

                </div>
                <div className="d-flex align-items-center mb-4 pt-2">
                  <div className="input-group quantity mr-3" style={{ width: 130 }}>
                    <div className="input-group-btn">
                      <button className="btn btn-primary btn-minus" onClick={handleDecrement}>
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input type="text" className="form-control bg-secondary text-center" value={quantity}
                      readOnly />
                    <div className="input-group-btn">
                      <button className="btn btn-primary btn-plus" onClick={handleIncrement}>
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <div className="d-flex space-x-5 ">
                    <button onClick={() => AddCart(publication)} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1" /> Add To Cart</button>
                    <button onClick={() => AddFavoris(publication)} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1" /> Add To Favoris</button>

                  </div>
                
                  
                </div>
                <div className="d-flex pt-2">
                  <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                  <div className="d-inline-flex">
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
                      <i className="fab fa-pinterest" />
                    </a>
                  </div>
                </div>
              </div>

            </div>


          </div>

        ) : (<div>
          Loading ...
        </div>)}
        <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up" /></a>

      </div>
</div>

















    
  )
}

