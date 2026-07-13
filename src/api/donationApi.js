import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

// =====================
// OLD DONATION API
// =====================

export const createDonation = async (donationData) => {
const response = await axios.post(
`${API_URL}/Donation`,
donationData
);

return response.data;
};

export const getDonations = async () => {
const response = await axios.get(
`${API_URL}/Donation`
);

return response.data;
};

// =====================
// INDIVIDUAL DONATIONS
// =====================

export const createIndividualDonation = async (data) => {
const response = await axios.post(
`${API_URL}/IndividualDonations`,
data
);

return response.data;
};

export const getIndividualDonations = async () => {
const response = await axios.get(
`${API_URL}/IndividualDonations`
);

return response.data;
};

// =====================
// RESTAURANT DONATIONS
// =====================

export const createRestaurantDonation = async (data) => {
const response = await axios.post(
`${API_URL}/RestaurantDonations`,
data
);

return response.data;
};

export const getRestaurantDonations = async () => {
const response = await axios.get(
`${API_URL}/RestaurantDonations`
);

return response.data;
};

// =====================
// EVENT DONATIONS
// =====================

export const createEventDonation = async (data) => {
const response = await axios.post(
`${API_URL}/EventDonations`,
data
);

return response.data;
};

export const getEventDonations = async () => {
const response = await axios.get(
`${API_URL}/EventDonations`
);

return response.data;
};

// =====================
// GROCERY DONATIONS
// =====================

export const createGroceryDonation = async (data) => {
const response = await axios.post(
`${API_URL}/GroceryDonations`,
data
);

return response.data;
};

export const getGroceryDonations = async () => {
const response = await axios.get(
`${API_URL}/GroceryDonations`
);

return response.data;
};
