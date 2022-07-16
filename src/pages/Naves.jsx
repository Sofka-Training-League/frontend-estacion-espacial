import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog } from "@material-ui/core";
import {
  getNaves,
  createNave,
  updateNave,
  deleteNave,
} from "../services/mySQL/naves";
import { getTipos } from "../services/mySQL/tipos";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modulo.css";

//VISTA
export const Naves = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [naves, setNaves] = useState([]);
  const [tiposNaves, setTiposNaves] = useState([]);
  const [textButton, setTextButton] = useState("Crear Nave");
  const [iconButton, setIconButton] = useState("fas fa-rocket-launch");
  const [tituloModulo, setTituloModulo] = useState("NAVES");
  const [iconModulo, setIconModulo] = useState("fa fa-table");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  //LISTADO NAVES
  useEffect(() => {
    const fetchNaves = async () => {
      setLoading(true);
      await getNaves(
        (response) => {
          console.log("Respuesta naves: ", response);
          setNaves(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error("Error: ", error);
          setLoading(false);
        }
      );
    };
    //TIPOS
    const fetchTiposNaves = async () => {
      setLoading(true);
      await getTipos(
        (response) => {
          console.log("Respuesta tipos: ", response);
          setTiposNaves(response.data.filter((datos) => datos.estado === 1));
          console.log(tiposNaves);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error("Error: ", error);
          setLoading(false);
        }
      );
    };
    //console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchNaves();
      fetchTiposNaves();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
      setTextButton("Crear nave");
      setIconButton("fas fa-rocket px-1");
      setTituloModulo("NAVES");
      setIconModulo("fa fa-table");
    } else {
      setEjecutarConsulta(false);
      setTextButton("Listar naves");
      setIconButton("fa fa-list px-2");
      setTituloModulo("NUEVA NAVE");
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
                key={nanoid()}
                loading={loading}
                listaNaves={naves}
                listaTipos={tiposNaves}
                setEjecutarConsulta={setEjecutarConsulta}
              />
            ) : (
              <FormularioCreacionRegistro
                setMostrarTabla={setMostrarTabla}
                listaNaves={naves}
                listaTipos={tiposNaves}
                setNaves={setNaves}
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
const TablaRegistros = ({ loading, listaNaves, listaTipos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [navesFiltrados, setNavesFiltrados] = useState(listaNaves);

  useEffect(() => {
    setNavesFiltrados(
      listaNaves.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaNaves]);

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
                <th className="thTable">Nave</th>
                <th className="thTable">Tipo</th>
                <th className="thTable">Origen</th>
                <th className="thTable" style={{ width: "50%" }}>
                  Objetivo
                </th>
                <th className="thTable">Estado</th>
                <th colSpan="3" className="">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {navesFiltrados.map((nave) => {
                return (
                  <FilaNave
                    key={nanoid()}
                    nave={nave}
                    listaTipos={listaTipos}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* Zona lista movil */}
      {navesFiltrados.map((el) => {
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
                <span>{el.objetivo} </span>
                <br />
                <span>{el.estado === 1 ? "Activado" : "Inactivado"} </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//FILA NAVES
const FilaNave = ({ nave, listaTipos, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoRegistro, setInfoNuevoRegistro] = useState({
    _id: nave.codnave,
    tipos: nave.tipos,
    nombre: nave.nombre,
    paisorigen: nave.paisorigen,
    objetivo: nave.objetivo,
    estado: nave.estado,
  });

  const actualizarRegistro = async () => {
    //enviar la info al backend

    await updateNave(
      nave.codnave,
      {
        codnave: nave.codnave,
        tipos: infoNuevoRegistro.tipos,
        nombre: infoNuevoRegistro.nombre,
        paisorigen: infoNuevoRegistro.paisorigen,
        objetivo: infoNuevoRegistro.objetivo,
        estado: infoNuevoRegistro.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success("Registro modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error modificando el registro");
        console.error(error);
      }
    );
  };

  const eliminarRegistro = async () => {
    await deleteNave(
      nave.codnave,
      (response) => {
        console.log(response.data);
        toast.success("Registro eliminado con éxito");
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error eliminando el registro");
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {/* edicion fila */}
      {edit ? (
        <>
          <td colSpan={7}>
            {/* {infoNuevoRegistro.codnave} */}
            <div className="row">
              {/* estado */}
              {/* <div className="col-md-4">
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
              </div> */}
              {/* tipo nave */}
              <div className="col-md-3">
                <label for="tiponave2">Tipo de nave</label>
                <select
                  name="tiponave"
                  className="form-control  rounded-lg m-2"
                  defaultValue={infoNuevoRegistro.tipos.codtiponave}
                  value={infoNuevoRegistro.tipos.codtiponave}
                  onChange={(e) =>
                    setInfoNuevoRegistro({
                      ...infoNuevoRegistro,
                      tipos: { codtiponave: e.target.value },
                    })
                  }
                  required
                >
                  <option disabled value="">
                    Seleccione una opción
                  </option>
                  {listaTipos.map((tipo) => {
                      return <option value={tipo.codtiponave} selected>{tipo.nombre}</option>
                  })}
                </select>
              </div>
              {/* nombre */}
              <div className="col-md-6">
                <label for="nombre">Nave</label>
                <input
                  id="nombre"
                  type="text"
                  style={{ textTransform: "uppercase" }}
                  className="form-control rounded-lg m-2"
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
              {/* pais de origen */}
              <div className="col-md-3">
                <label for="paisorigen">Pais origen</label>
                <input
                  id="paisorigen"
                  type="text"
                  className="form-control rounded-lg m-2"
                  value={infoNuevoRegistro.paisorigen}
                  onChange={(e) =>
                    setInfoNuevoRegistro({
                      ...infoNuevoRegistro,
                      paisorigen: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label for="objetivo">Objetivo</label>
              <textarea
                className="form-control rounded-lg m-2"
                id="objetivo"
                rows="3"
                value={infoNuevoRegistro.objetivo}
                onChange={(e) =>
                  setInfoNuevoRegistro({
                    ...infoNuevoRegistro,
                    objetivo: e.target.value,
                  })
                }
                required
              ></textarea>
            </div>
          </td>
        </>
      ) : (
        // vista fila
        <>
          <td>{nave.codnave}</td>
          <td>{nave.nombre}</td>
          <td>{nave.tipos.nombre}</td>
          <td>{nave.paisorigen}</td>
          <td>{nave.objetivo}</td>
          <td>{nave.estado === 1 ? "Activado" : "Inactivado"}</td>
        </>
      )}
      <td>
        <div className="justify-around">
          {/* botonera edicion fila*/}
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
            // botonera vista fila
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
                title="Editar Nave"
                onClick={() => setEdit(!edit)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
            </>
          )}
        </div>
        {/* dialogo para eliminar fila */}
        <Dialog open={openDialog}>
          <div>
            <h1 className="text-gray font-bold">
              ¿Está seguro de querer eliminar el registro?
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
  listaNaves,
  listaTipos,
  setNaves,
}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoNave = {};
    fd.forEach((value, key) => {
      nuevoNave[key] = value;
    });

    await createNave(
      {
        tipos: { codtiponave: nuevoNave.tiponave },
        nombre: nuevoNave.nombre,
        paisorigen: nuevoNave.paisorigen,
        objetivo: nuevoNave.objetivo,
        estado: nuevoNave.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success("Nuevo registro agregado con éxito");
      },
      (error) => {
        console.error(error);
        toast.error("Error creando registro");
      }
    );

    setMostrarTabla(true);
  };

  return (
    <form ref={form} onSubmit={submitForm} className="row g-3">
      {/* <div className="col-md-4">
        <label htmlFor="estado" className="form-label">
          Estado objetivo
        </label>
        <select
          name="estado"
          className="form-control"
          defaultValue=""
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          <option value={1}>En terreno</option>
          <option value={2}>En exploración</option>
          <option value={3}>Fin exploración</option>
        </select>
      </div> */}

      <div className="col-md-4">
        <label htmlFor="tiponave" className="form-label">
          Tipo de Nave
        </label>
        <select
          name="tiponave"
          className="form-control"
          defaultValue=""
          required
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          {listaTipos.map((tipo) => {
            return <option value={tipo.codtiponave}>{tipo.nombre}</option>;
          })}
        </select>
      </div>

      <div className="col-md-5">
        <label htmlFor="nombre" className="form-label">
          Nombre de la nave
        </label>
        <input
          name="nombre"
          type="text"
          style={{ textTransform: "uppercase" }}
          className="form-control"
          placeholder="Nombre de la nave"
          required
        />
      </div>

      <div className="col-md-3">
        <label htmlFor="paisorigen" className="form-label">
          Pais origen
        </label>
        <input
          name="paisorigen"
          type="text"
          className="form-control"
          placeholder="Pais origen"
          required
        />
      </div>

      <div className="col-12">
        <label htmlFor="objetivo" className="form-label">
          Objetivo
        </label>
        <textarea
          name="objetivo"
          className="form-control"
          rows="5"
          required
        ></textarea>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
