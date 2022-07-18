import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog } from "@material-ui/core";
import { getNaves } from "../services/mySQL/naves";
import {
    getDatosTecnicos,
    createDatoTecnico,
    updateDatoTecnico,
    deleteDatoTecnico,
  } from "../services/mySQL/datosTecnicos";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modulo.css";

//VISTA
export const DatosTecnicos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [naves, setNaves] = useState([]);
  const [datosTecnicos, setDatosTecnicos] = useState([]);
  const [textButton, setTextButton] = useState("Crear dato técnico");
  const [iconButton, setIconButton] = useState("fad fa-server");
  const [tituloModulo, setTituloModulo] = useState("DATOS TÉCNICOS NAVES");
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
    const fetchDatosTecnicos = async () => {
        setLoading(true);
        await getDatosTecnicos(
          (response) => {
            console.log("Respuesta datos técnicos: ", response);
            setDatosTecnicos(response.data);
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
      fetchDatosTecnicos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
      setTextButton("Crear dato técnico");
      setIconButton("fas fa-server px-1");
      setTituloModulo("DATOS TÉCNICOS NAVES");
      setIconModulo("fa fa-table");
    } else {
      setEjecutarConsulta(false);
      setTextButton("Listar datos técnicos");
      setIconButton("fa fa-list px-2");
      setTituloModulo("NUEVO DATO TECNICO");
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
                listaDatosTecnicos={datosTecnicos}
                setEjecutarConsulta={setEjecutarConsulta}
              />
            ) : (
              <FormularioCreacionRegistro
                setMostrarTabla={setMostrarTabla}
                listaNaves={naves}
                listaDatosTecnicos={datosTecnicos}
                setDatosTecnicos={setDatosTecnicos}
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
const TablaRegistros = ({ loading, listaNaves, listaDatosTecnicos ,setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  //const [navesFiltrados, setNavesFiltrados] = useState(listaNaves);
  const [datosTecnicosFiltrados, setDatosTecnicosFiltrados] = useState(listaDatosTecnicos);

  useEffect(() => {
    setDatosTecnicosFiltrados(
      listaDatosTecnicos.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaDatosTecnicos]);

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
                <th className="thTable" style={{ width: "25%" }}>Nave</th>
                <th className="thTable" style={{ width: "25%" }}>Tipo</th>
                <th className="thTable">Dato</th>
                <th className="thTable">Valor</th>
                <th colSpan="3" className="">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {datosTecnicosFiltrados.map((dato) => {
                return (
                  <FilaNave
                    key={nanoid()}
                    datoTecnico={dato}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* Zona lista movil */}
      {datosTecnicosFiltrados.map((el) => {
        return (
          <div className="card d-block d-sm-block d-md-none">
            <img
              className="card-img-top"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17c80916396%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17c80916396%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt={el.datotecnico}
              style={{ height: "100px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{el.naves.nombre} </h5>
              <p className="card-text">
                <span>{el.datotecnico} </span>:{el.valor}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//FILA NAVES
const FilaNave = ({ datoTecnico, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoRegistro, setInfoNuevoRegistro] = useState({
    _id: datoTecnico.codigo,
    naves: datoTecnico.naves,
    datotecnico: datoTecnico.datotecnico,
    valor: datoTecnico.valor,
  });

  const actualizarRegistro = async () => {
    //enviar la info al backend

    await updateDatoTecnico(
        datoTecnico.codigo,
      {
        codigo: datoTecnico.codigo,
        naves: infoNuevoRegistro.naves,
        datotecnico: infoNuevoRegistro.datotecnico,
        valor: infoNuevoRegistro.valor,
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
    await deleteDatoTecnico(
        datoTecnico.codigo,
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
              {/* dato tecnico */}
              <div className="col-md-6">
                <label htmlFor="datotecnico">Dato técnico</label>
                <input
                  id="datotecnico"
                  type="text"
                  style={{ textTransform: "uppercase" }}
                  className="form-control rounded-lg m-2"
                  value={infoNuevoRegistro.datotecnico}
                  onChange={(e) =>
                    setInfoNuevoRegistro({
                      ...infoNuevoRegistro,
                      datotecnico: e.target.value.toString().toUpperCase(),
                    })
                  }
                  required
                />
              </div>
              {/* valor del dato tecnico */}
              <div className="col-md-6">
                <label htmlFor="valor">Valor</label>
                <input
                  id="valor"
                  type="text"
                  className="form-control rounded-lg m-2"
                  value={infoNuevoRegistro.valor}
                  onChange={(e) =>
                    setInfoNuevoRegistro({
                      ...infoNuevoRegistro,
                      valor: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
          </td>
        </>
      ) : (
        // vista fila
        <>
          <td>{datoTecnico.codigo}</td>
          <td>{datoTecnico.naves.nombre}</td>
          <td>{datoTecnico.naves.tipos.nombre}</td>
          <td>{datoTecnico.datotecnico}</td>
          <td>{datoTecnico.valor}</td>
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
                className="btn btn-outline-danger btn-sm buttonTableTrash"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm buttonTable"
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
  setDatosTecnicos,
}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoDatoTecnico = {};
    fd.forEach((value, key) => {
      nuevoDatoTecnico[key] = value;
    });

    await createDatoTecnico(
      {
        naves: { codnave: nuevoDatoTecnico.codnave },
        datotecnico: nuevoDatoTecnico.datotecnico.toString().toUpperCase(),
        valor: nuevoDatoTecnico.valor,
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
      <div className="col-md-12">
        <label htmlFor="codnave" className="form-label">
          Nave
        </label>
        <select
          name="codnave"
          className="form-control"
          defaultValue=""
          required
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          {listaNaves.map((nave) => {
            return <option value={nave.codnave}>{nave.nombre}</option>;
          })}
        </select>
      </div>

      <div className="col-md-6">
        <label htmlFor="datotecnico" className="form-label">
          Dato técnico
        </label>
        <input
          name="datotecnico"
          type="text"
          style={{ textTransform: "uppercase" }}
          className="form-control"
          placeholder="DATO TECNICO"
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="valor" className="form-label">
          Valor del dato técnico
        </label>
        <input
          name="valor"
          type="text"
          className="form-control"
          placeholder="VALOR"
          required
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
