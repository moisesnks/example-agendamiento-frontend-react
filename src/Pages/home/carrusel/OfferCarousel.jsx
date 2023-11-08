import React, { useState, useEffect } from 'react';
import {  getPaquetesOfertas } from '../../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OfferCarousel.css';
import Carousel from 'react-bootstrap/Carousel';


function OfferCarousel({paquete}) {
  const [cards, setCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);

  console.log(paquete)

  // Convierte las fechas a objetos Date
  const fechaInicio = new Date(fechainit);
  const fechaFin = new Date(fechafin);

  // Calcula la diferencia en milisegundos
  const diferenciaEnMilisegundos = fechaFin - fechaInicio;

  // Calcula la diferencia en días
  const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);


  // Convierte la cadena de imágenes en un arreglo
  const imagesArray = imagenes ? imagenes.substring(1, imagenes.length - 1).split(',') : [];

  // Construye las URLs de las imágenes usando la variable VITE_PATH_IMAGES
  const VITE_PATH_IMAGES = import.meta.env.VITE_PATH_IMAGES;
  const imageUrls = imagesArray.map(image => `${VITE_PATH_IMAGES}${image.trim()}`);


  useEffect(() => {
    const updateCardsToShow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1600) {
        setCardsToShow(4);
      } else if (screenWidth >= 1300) {
        setCardsToShow(3);
      } else if (screenWidth >= 1043) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    window.addEventListener('resize', updateCardsToShow);
    updateCardsToShow();

    return () => {
      window.removeEventListener('resize', updateCardsToShow);
    };
  }, []);

  


  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const chunkedCards = chunkArray(cards, cardsToShow);

  return (
    <div className="offer mt-5">
      <h1>Destacados</h1>
      <div className="container">
        <Carousel interval={null}>
        {chunkedCards.map((cardGroup, groupIndex) => (
  <Carousel.Item key={`carousel-item-${groupIndex}`}>
    <div className="row justify-content-center">
                {cardGroup.map((card) => (
                 <div key={card.id} className={`col-md-${12 / cardsToShow} col-sm-6 mt-2 mb-2`}>
                    <div className="card mb-2" style={{ height: '100%' }}>
                      <img src={Paquete.imageSrc} alt={paqueteaquete.title} className="card-img-top" />
                      <div className="card-body">
                        <div className="Package-info">
                          <div className="d-flex justify-content-between">
                            <div className="bg-secondary text-white rounded p-2 ida">Ida+Vuelta</div>
                            <div className="bg-primary text-white rounded p-2">{Paquete.description}</div>
                          </div>
                        </div>
                        <h2 className="card-title">{Paquete.title}</h2>
                        <div className="Information">
                          <p>Precio</p>
                          <h3>{Paquete.price}</h3>
                          <p style={{ fontSize: '14px' }}>
                            Duración: {Paquete.startDate} - {Paquete.endDate}
                          </p>
                        </div>
                        <button className="btn btn-primary btn-card">Ver Paquete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default OfferCarousel;
