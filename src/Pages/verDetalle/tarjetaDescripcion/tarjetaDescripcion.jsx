import 'bootstrap/dist/css/bootstrap.min.css';
import "./tarjetaDescripcion.css"

function tarjetaDescripcion({descripcion}) {


  return (
    <div style={{display: 'flex',justifyContent:'center', alignItems:' center', margin: '0'}}>
      <div>
        <div className="container" style={{ width: '11rem', height: '3rem', margin: '0', borderRadius: '10px', fill: "#F8F9FA" }}>
          <h3>Descripción</h3>
        </div>
        <div className="container" style={{ width: '80vw', height: 'auto', margin: '20px auto', boxShadow: "2px 2px 2px 2px", borderRadius: '10px' }}>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: "",padding: "1rem" }}> {descripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default tarjetaDescripcion;
