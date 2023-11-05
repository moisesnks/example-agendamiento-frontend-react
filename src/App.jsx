import React, { useState } from 'react';

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

  return (
    <div className="App">
      <h1>Envío de paquetes</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="origen_id" value={formData.origen_id} onChange={handleChange} />
        <input type="number" name="destino_id" value={formData.destino_id} onChange={handleChange} />
        <input type="date" name="fechaInit" value={formData.fechaInit} onChange={handleChange} />
        <input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} />
        <input type="number" name="personas" value={formData.personas} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
      <div>
        <h3>Respuesta:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
