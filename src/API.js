import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const fetchSelected = async () => {
  try {
    const response = await axios.get(`${apiUrl}/plant/options`);
    return response.data.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const fetchPlant = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/plant?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const fetchPlantData = async (id, startDate, endDate) => {
    try {
      const params = {
        id: id,
        startDate: startDate,
        endDate: endDate,
      };
      const response = await axios.get(`${apiUrl}/plant/record`, { params });
      return response.data; 
    } catch (error) {
      console.error("Error:", error);
      throw error; 
    }
  };
