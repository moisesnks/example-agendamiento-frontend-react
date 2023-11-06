import React, { useEffect, useState } from 'react';
import { getAeropuertos } from '../../api';
import BuscaViaje from '../../Components/buscaViaje/BuscaViaje';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom

import './Home.css';

const Home = () => {
    const [aeropuertos, setAeropuertos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación

    useEffect(() => {
        const fetchAeropuertos = async () => {
            try {
                const data = await getAeropuertos();
                setAeropuertos(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAeropuertos();
    }, []);

    const handleBuscarViaje = (respuesta) => {
        console.log(respuesta);
        const dataForNavigate = {
            respuesta,
            aeropuertos
        }
        navigate('/ver-paquetes', { state: dataForNavigate }); // Navega a la página "/ver-paquetes" con el objeto respuesta
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="Home">

            <div className="Contenedor">
                <h1 className="Titulo">¡Busca tu viaje ahora!</h1>
                <BuscaViaje
                    aeropuertos={aeropuertos}
                    onSubmit={handleBuscarViaje}
                />
            </div>
        </div>
    );
};

export default Home;
