import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="divPadre">
      <div className="divForm">
      <h3 className="logo">Sign in to Estespa</h3>
      <form className="formulario row g-3">
        <div className="col-md-12">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping-user">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Correo electronico"
              aria-label="Username"
              aria-describedby="addon-wrapping-user"
              value="admin@example.com"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping-pass">
              <i className="fas fa-key"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Contraseña"
              aria-label="Passwprd"
              aria-describedby="addon-wrapping-pass"
              value="admin"
            />
          </div>
        </div>
        <div className="col-md-12">
        <div className="input-group">
           <button className="btn btn-primary" type="submit">
          <Link to="/admin/naves" className="btnlink">
            Iniciar sesión
          </Link>
        </button>
        </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
