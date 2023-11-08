function TarjetaContacto({telefono_hotel, correo_electronico_hotel,sitio_web_hotel}){

    return(
    
    <div>
    <div className="container r" style={{ width: '40vw', height: 'auto', margin: '20px auto', boxShadow: "2px 2px 2px 2px", borderRadius: '10px' }}>
    <h2 className ="text-center" style={{  padding: "10px", textAlign: "center" }}>Contacto del Hotel</h2>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}><strong>Telefono:</strong> {telefono_hotel}</p>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}><strong>Correo Electronico:</strong> {correo_electronico_hotel}</p>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}><strong>Sitio Web:</strong> {sitio_web_hotel}</p>
    </div>
  </div>)
}

export default TarjetaContacto