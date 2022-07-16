import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog } from "@material-ui/core";
import {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo,
} from "../services/mySQL/tipos";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modulo.css";

//VISTA
export const Tipos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [tipos, setTipos] = useState([]);
  const [textButton, setTextButton] = useState("Crear tipo de nave");
  const [iconButton, setIconButton] = useState("fab fa-typo3 ");
  const [tituloModulo, setTituloModulo] = useState("TIPOS DE NAVES");
  const [iconModulo, setIconModulo] = useState("fa fa-table");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  //LISTADO TIPOS
  useEffect(() => {
    const fetchTipos = async () => {
      setLoading(true);
      await getTipos(
        (response) => {
          console.log("Respuesta: ", response);
          setTipos(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error("Error: ", error);
          setLoading(false);
        }
      );
    };
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchTipos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
      setTextButton("Crear tipo de nave");
      setIconButton("fab fa-typo3 px-1");
      setTituloModulo("TIPOS DE NAVES");
      setIconModulo("fa fa-table");
    } else {
      setEjecutarConsulta(false);
      setTextButton("Listar tipos de naves");
      setIconButton("fa fa-list px-2");
      setTituloModulo("NUEVO TIPO DE NAVE");
      setIconModulo("fab fa-wpforms");
    }
  }, [mostrarTabla]);

  return (
    <div className="containerModulo">
      <div className="card shadow">
        <div className="card-header">
          <h3 className="m-0 font-weight-bold">
            <i className={iconModulo}></i>{" "}
            <span className="title py-3">{tituloModulo}</span>
          </h3>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => {
                setMostrarTabla(!mostrarTabla);
              }}
            >
              <i className={iconButton}></i>
              {textButton}
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {mostrarTabla ? (
              <TablaRegistros
                loading={loading}
                listaTipos={tipos}
                setEjecutarConsulta={setEjecutarConsulta}
              />
            ) : (
              <FormularioCreacionRegistro
                setMostrarTabla={setMostrarTabla}
                listaTipos={tipos}
                setTipos={setTipos}
              />
            )}
            <ToastContainer position="bottom-center" autoClose={5000} />
          </div>
        </div>
      </div>
    </div>
  );
};

//TABLA REGISTROS
const TablaRegistros = ({ loading, listaTipos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [tiposFiltrados, setTiposFiltrados] = useState(listaTipos);

  useEffect(() => {
    setTiposFiltrados(
      listaTipos.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaTipos]);

  return (
    <div className="container">
      {/* Zona de Titulos y busqueda */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="span input-group-prepend input-group-text">
              {" "}
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      {/* Zona lista pantallas grandes */}
      <div className="table-responsive d-none d-sm-none d-md-block">
        {loading ? (
          <ReactLoading type="bars" color="#0D6EFD" height={667} width={375} />
        ) : (
          <table
            data-toggle="table"
            className="table table-striped table-hover "
            data-toolbar="#toolbar"
            data-filter-control="true"
            data-filter-control-container="#filter"
          >
            <thead className="tableStyle">
              <tr>
                <th className="thTableId">#</th>
                <th className="thTable">Tipo nave</th>
                <th className="thTable" style={{ width: "50%" }}>
                  Descripcion
                </th>
                <th className="thTable">Estado</th>
                <th colSpan="3" className="">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {tiposFiltrados.map((tipo) => {
                return (
                  <FilaTipo
                    key={nanoid()}
                    tipo={tipo}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* Zona lista movil */}
      {tiposFiltrados.map((el) => {
        return (
          <div className="card d-block d-sm-block d-md-none">
            <img
              className="card-img-top"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17c80916396%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17c80916396%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt={el.nombre}
              style={{ height: "100px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{el.nombre} </h5>
              <p className="card-text">
                <span>{el.descripcion} </span>
                <br />
                <span>{el.estado===1 ? "Activado": "Inactivado"} </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//FILA TIPOS
const FilaTipo = ({ tipo, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoRegistro, setInfoNuevoRegistro] = useState({
    _id: tipo.codtiponave,
    nombre: tipo.nombre,
    descripcion: tipo.descripcion,
    estado: tipo.estado,
  });

  const actualizarRegistro = async () => {
    //enviar la info al backend

    await updateTipo(
      tipo.codtiponave,
      {
        codtiponave:tipo.codtiponave,
        nombre: infoNuevoRegistro.nombre,
        descripcion: infoNuevoRegistro.descripcion,
        estado: infoNuevoRegistro.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success("Tipo modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error modificando el tipo");
        console.error(error);
      }
    );
  };

  const eliminarRegistro = async () => {
    await deleteTipo(
      tipo.codtiponave,
      (response) => {
        console.log(response.data);
        toast.success("Tipo eliminado con éxito");
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error eliminando el tipo");
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td colSpan={4}>
            {/* {infoNuevoRegistro.codtiponave} */}
              <div className="row">
                <div className="col">
                  <label for="nombre">Tipo de nave</label>
                  <input
                    id="nombre"
                    style={{ textTransform: "uppercase" }}
                    className="form-control rounded-lg m-2"
                    type="text"
                    value={infoNuevoRegistro.nombre}
                    onChange={(e) =>
                      setInfoNuevoRegistro({
                        ...infoNuevoRegistro,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col">
                  {/* <input type="text" className="form-control" placeholder="First name" /> */}
                  <label for="estado">Estado</label>
                  <select
                    id="estado"
                    className="form-control rounded-lg m-2"
                    value={infoNuevoRegistro.estado}
                    onChange={(e) =>
                      setInfoNuevoRegistro({
                        ...infoNuevoRegistro,
                        estado: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Seleccione opción</option>
                    <option value={1}>Activado</option>
                    <option value={0}>Inactivado</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label for="descripcion">Notas</label>
                <textarea
                  className="form-control rounded-lg m-2"
                  id="descripcion"
                  rows="3"
                  value={infoNuevoRegistro.descripcion}
                  onChange={(e) =>
                    setInfoNuevoRegistro({
                      ...infoNuevoRegistro,
                      descripcion: e.target.value,
                    })
                  }
                ></textarea>
              </div>
          </td>
        </>
      ) : (
        <>
          <td>{tipo.codtiponave}</td>
          <td>{tipo.nombre}</td>
          <td>{tipo.descripcion}</td>
          <td>{tipo.estado===1 ? "Activado": "Inactivado"}</td>
        </>
      )}
      <td>
        <div className="justify-around">
          {edit ? (
            <>
              <button
                type="button"
                className="btn btn-success buttonTable"
                title="Confirmar Edición"
                onClick={() => actualizarRegistro()}
              >
                <i className="fas fa-check "></i>
              </button>
              <button
                type="button"
                className="btn btn-danger buttonTable"
                title="Cancelar edición"
                onClick={() => setEdit(!edit)}
              >
                <i className="fas fa-ban"></i>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setOpenDialog(true)}
                className="btn btn-danger buttonTableTrash"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button
                type="button"
                className="btn btn-primary buttonTable"
                title="Editar Tipo"
                onClick={() => setEdit(!edit)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div>
            <h1 className="text-gray font-bold">
              ¿Está seguro de querer eliminar el tipo?
            </h1>
            <div className="justify-center my-4">
              <button
                onClick={() => eliminarRegistro()}
                className="mx-2 px-4 py-2 btn btn-success text-white rounded-md shadow-md"
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className="mx-2 px-4 py-2 btn btn-danger text-white rounded-md shadow-md"
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

//FORMULARIO
const FormularioCreacionRegistro = ({
  setMostrarTabla,
  listaTipos,
  setTipos,
}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoTipo = {};
    fd.forEach((value, key) => {
      nuevoTipo[key] = value;
    });

    await createTipo(
      {
        nombre: nuevoTipo.nombre,
        descripcion: nuevoTipo.descripcion,       
        estado: nuevoTipo.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success("Tipo agregado con éxito");
      },
      (error) => {
        console.error(error);
        toast.error("Error creando tipo");
      }
    );

    setMostrarTabla(true);
  };

  return (
    <form ref={form} onSubmit={submitForm} className="row g-3">
      <div className="col-md-8">
        <label htmlFor="nombre" className="form-label">
        Nombre del tipo de nave
        </label>
        <input
          name="nombre"
          type="text"
          style={{ textTransform: "uppercase" }}
          className="form-control"
          placeholder="Nombre del tipo de nave"
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="estado" className="form-label">
          Estado del tipo
        </label>
        <select
          name="estado"
          className="form-control"
          defaultValue=""
          required
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          <option value={1}>Activado</option>
          <option value={0}>Inactivado</option>
        </select>
      </div>
           
      <div className="col-12">
          <label htmlFor="descripcion" className="form-label">Notas</label>
          <textarea name="descripcion" className="form-control" rows="5"></textarea>
        </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
