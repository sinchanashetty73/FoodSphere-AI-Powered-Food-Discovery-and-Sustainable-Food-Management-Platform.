import axios from "axios";

const API_URL = "http://localhost:5194/api/restaurants";

export const getRestaurants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};