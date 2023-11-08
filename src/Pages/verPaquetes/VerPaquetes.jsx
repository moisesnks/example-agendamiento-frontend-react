import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { getPaquetes, getPaquetesMes, agregarVista } from '../../api';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom

import BuscaViaje from '../../Components/buscaViaje/BuscaViaje';
import ListaPaquetes from '../../Components/listaPaquetes/ListaPaquetes';
import BotonOrdener from '../../Components/botonOrdenar/SortBy'

import './VerPaquetes.css';

const VerPaquetes = () => {
    const location = useLocation();
    const data = location.state;
    const respuesta = data.respuesta;
    const aeropuertos = data.aeropuertos;
    const [paquetes, setPaquetes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación

    const placeholder = {
        origen: `Origen: ${respuesta.origen_id}`,
        destino: `Destino: ${respuesta.destino_id}`,
        calendario: respuesta.mes ? `Mes: ${respuesta.mes}` : `${respuesta.fechaInit} - ${respuesta.fechaFin}`,
        pasajeros: `Pasajeros: ${respuesta.personas}`
    };

    const initialValues = {
        origen: respuesta.origen_id,
        destino: respuesta.destino_id,
        fecha: {
            tipo: respuesta.mes ? 'mes' : 'rango',
            fechaInicio: respuesta.mes ? null : respuesta.fechaInit,
            fechaFin: respuesta.mes ? null : respuesta.fechaFin,
            mes: respuesta.mes || null,
        },
        pasajeros: respuesta.personas,
    };

    const handleBuscarViaje = (respuesta) => {
        const dataForNavigate = {
            respuesta,
            aeropuertos
        }
        navigate('/ver-paquetes', { state: dataForNavigate }); // Navega a la página "/ver-paquetes" con el objeto respuesta
    };

    const handleComprar = (paquete) => {
        // Log the package id
        // console.log(paquete.id);

        // Call the agregarVista function with the package id
        agregarVista({ fk_fechaPaquete: paquete.id })
            .then(response => {
                // Handle the response if needed
                // console.log(response);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });

        // Navigate to the '/detalle' route with the package details
        navigate('/detalle', { state: paquete });
    }

    useEffect(() => {
        const fetchPaquetes = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;
                if (respuesta.mes) {
                    data = await getPaquetesMes(respuesta);
                } else {
                    data = await getPaquetes(respuesta);
                }
                setPaquetes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (respuesta) {
            fetchPaquetes();
        }
    }, [respuesta]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="BuscaViajeVerPaquetes">
                <BuscaViaje
                    aeropuertos={aeropuertos}
                    placeholder={placeholder}
                    onSubmit={handleBuscarViaje}
                    initialValues={initialValues}
                    className={'VerPaquetes__Header'}
                />
            </div>
           
            <div className="VerListaPaquetes">
            <div className="col-md-12 mx-5 mr-5 mt-2 pl-5 ">
          <div className="mx-5" >
            <BotonOrdener paquetes={paquetes} setPackages={setPaquetes} />
          </div>
        </div>
                <ListaPaquetes
                    paquetes={paquetes}
                    onBuy={handleComprar}
                />
            </div>
        </>
    );
};

export default VerPaquetes;