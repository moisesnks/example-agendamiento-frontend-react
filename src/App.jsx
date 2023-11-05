import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    origen_id: 1,
    destino_id: 2,
    fechaInit: '2023-11-05',
    fechaFin: '2023-11-10',
    personas: 2
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/paquetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="number" name="origen_id" value={formData.origen_id} onChange={handleChange} />
      <input type="number" name="destino_id" value={formData.destino_id} onChange={handleChange} />
      <input type="date" name="fechaInit" value={formData.fechaInit} onChange={handleChange} />
      <input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} />
      <input type="number" name="personas" value={formData.personas} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );

  const renderTable = () => {
    if (!response) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Total Personas</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Ciudad Origen</th>
            <th>Ciudad Destino</th>
            <th>Descripción</th>
            <th>Detalles</th>
            {/* Add other headers if needed, but omit row_number */}
          </tr>
        </thead>
        <tbody>
          {response.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.total_personas}</td>
              <td>{item.fechainit}</td>
              <td>{item.fechafin}</td>
              <td>{item.nombre_ciudad_origen}</td>
              <td>{item.nombre_ciudad_destino}</td>
              <td>{item.descripcion}</td>
              <td>{item.detalles}</td>
              {/* Map other data fields as needed, but omit row_number */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <h1>Envío de paquetes</h1>
      {renderForm()}
      <div className="response-container">
        <div className="json-response">
          <h3>Respuesta:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
        {renderTable()}
      </div>
    </div>
  );

};

export default App;
