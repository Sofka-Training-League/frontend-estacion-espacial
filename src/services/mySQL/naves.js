import axios from "axios";

const TIPOS_REST_API_URL =
  process.env.REACT_APP_API_APIDATA + "/naves" ||
  "http://localhost:8181/ApiRest/naves";

export const getNaves = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: TIPOS_REST_API_URL,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//EXTRAER DATO POR ID
export const getNaveByID = async (id, successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${TIPOS_REST_API_URL}/${id}`,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//CREAR UN NUEVO REGISTRO
export const createNave = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: TIPOS_REST_API_URL,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//EDITAR REGISTRO
export const updateNave = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: "PUT",
    // url: `${TIPOS_REST_API_URL}/${id}`,
    url: `${TIPOS_REST_API_URL}`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//INICIO MISION, ALTERA LA FECHA IN
export const inLautchNave = async (
  id,
  data,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "PATCH",
    url: `${TIPOS_REST_API_URL}/iniciarmision/${id}`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//FIN MISION, ALTERA LA FECHA OUT
export const endLautchNave = async (
  id,
  data,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "PATCH",
    url: `${TIPOS_REST_API_URL}/finalizarmision/${id}`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//ELIMINAR REGISTRO
export const deleteNave = async (id, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `${TIPOS_REST_API_URL}/${id}`,
    headers: { "Content-Type": "application/json" },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
