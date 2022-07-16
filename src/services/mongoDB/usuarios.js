import axios from "axios";

const USUARIOS_REST_API_URL = process.env.REACT_APP_API_APIUSER || "http://localhost:5000";

//TRAER TODOS LOS USUARIOS
export const getUsuarios = async (successCallback, errorCallback) => {
  const options = { method: "GET", url: `${USUARIOS_REST_API_URL}/usuarios` };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//CREAR UN NUEVO USUARIO
export const createUsuario = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url:  `${USUARIOS_REST_API_URL}/usuarios/`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//EDITAR USUARIO
export const updateUsuario = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: "PATCH",
    url: `${USUARIOS_REST_API_URL}/usuarios/${id}/`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//ELIMINAR USUARIO
export const deleteUsuario = async (id, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `${USUARIOS_REST_API_URL}/usuarios/${id}/`,
    headers: { "Content-Type": "application/json" },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
