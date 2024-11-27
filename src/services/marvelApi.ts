import axios from "axios";
import md5 from "crypto-js/md5"; 

// URL base de la API de Marvel
const API_BASE_URL = "https://gateway.marvel.com/v1/public";
const PUBLIC_KEY = "fec1f2722d9936d14150a3376d496ec0"; 
const PRIVATE_KEY = "018c6b004b8ffc1d0fcd7e07d2194b08fd381ae8"; 

export const getComics = async () => {
  const timestamp = Date.now(); 
  const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).toString(); 

  try {
    const response = await axios.get(`${API_BASE_URL}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash: hash,
      },
    });
    return response.data.data.results; 
  } catch (error) {
    console.error("Error al obtener los cómics:", error);
    throw new Error("No se pudieron obtener los cómics."); 
  }
};

export const getComicDetails = async (comicId: string) => {
  const timestamp = Date.now(); 
  const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).toString(); 

  try {
    const response = await axios.get(`${API_BASE_URL}/comics/${comicId}`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash: hash,
      },
    });
    return response.data.data.results[0]; 
  } catch (error) {
    console.error("Error al obtener los detalles del cómic:", error);
    throw new Error("No se pudieron obtener los detalles del cómic."); 
  }
};