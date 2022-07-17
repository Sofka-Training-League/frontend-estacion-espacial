import React, { useState, useEffect } from "react";
import "../styles/home.css";
import computer from "../assets/image/undraw_Code_thinking_re_gka2.png";
//import imgObjeto from "../assets/image/logoObjeto.png";
import imgObjeto from "../assets/image/cohete.png";
import { getNaves } from "../services/mySQL/naves";

export const Home = () => {
  const [naves, setNaves] = useState([]);
  //LISTADO NAVES
  useEffect(() => {
    const fetchNaves = async () => {
      await getNaves(
        (response) => {
          console.log("Respuesta naves: ", response);
          setNaves(response.data);
        },
        (error) => {
          console.error("Error: ", error);
        }
      );
    };
    //console.log("consulta", ejecutarConsulta);
    fetchNaves();
  }, []);

  return (
    <div className="container ">
      <div className="row divRow">
        <div className="col-md-6 col-sm col-lg-6">
          <h1 className="coverH1">BUILD A </h1>
          <h2 className="coverH2">ROCKET STORY</h2>
          <p className="coverP">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            molestias cumque at, impedit eum corrupti libero ipsam placeat,
            nulla, maiores totam qui ea distinctio. Velit, distinctio. Iste
            iusto deserunt esse?
          </p>
          <input
            className="coverInput"
            type="button"
            value="Get Started"
          ></input>
        </div>
        <div className="col-md-6 col-sm col-lg-6">
          <img className="img" src={computer} alt=""></img>
        </div>
      </div>
      <div className="row">
        {naves &&
          naves.map((nave) => {
            return (
              <>
                <div className="col-md-4">
                  <div className="card mb-3">
                    <img className="card-img-top" src={imgObjeto} alt="ima" />
                    <div className="card-body">
                      <h5 className="card-title">{nave.nombre}</h5>
                      <p className="card-text">
                        <b>
                          <span className="text-primary">Tipo nave: </span>{" "}
                        </b>
                        {nave.tipos.nombre}
                        <br />
                        <b>
                          <span className="text-primary">Origen: </span>{" "}
                        </b>
                        {nave.paisorigen}
                        <br />
                        <b>
                          <span className="text-primary">Mision: </span>{" "}
                        </b>
                        {nave.objetivo}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          <b>
                            <span className="text-success">
                              Inicio de mision:{" "}
                            </span>{" "}
                          </b>
                          {nave.inexploracion
                            ? nave.inexploracion
                            : "Sin iniciar"}
                        </small>
                        <br />
                        <small className="text-muted">
                          <b>
                            <span className="text-danger">Fin de mision: </span>{" "}
                          </b>
                          {nave.endexploracion
                            ? nave.endexploracion
                            : nave.inexploracion
                            ? "Activa"
                            : "Sin iniciar"}
                        </small>
                      </p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        <span>
                          {nave.estados.codigo === 1
                            ? "En terreno"
                            : nave.estados.codigo === 2
                            ? "En exploración"
                            : "Exploración finalizada"}{" "}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};
