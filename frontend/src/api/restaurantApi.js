import axios from "axios";

const API_URL = "https://foodsphere-api.onrender.com/api";

export const getRestaurants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};