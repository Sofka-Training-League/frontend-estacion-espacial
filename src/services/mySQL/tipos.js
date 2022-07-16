import axios from "axios";

const TIPOS_REST_API_URL =
  process.env.REACT_APP_API_APIDATA + "/tipos" ||
  "http://localhost:8181/ApiRest/tipos";

export const getTipos = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: TIPOS_REST_API_URL,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//EXTRAER DATO POR ID
export const getTipoByID = async (id, successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${TIPOS_REST_API_URL}/${id}`,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//CREAR UN NUEVO REGISTRO
export const createTipo = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: TIPOS_REST_API_URL,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//EDITAR REGISTRO
export const updateTipo = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: "PUT",
    // url: `${TIPOS_REST_API_URL}/${id}`,
    url: `${TIPOS_REST_API_URL}`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//ELIMINAR REGISTRO
export const deleteTipo = async (id, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `${TIPOS_REST_API_URL}/${id}`,
    headers: { "Content-Type": "application/json" },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
