import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// GET all users 
export const getAllItems = async () => {
  try {
    const response = await api.get('/users'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// GET single user by ID 
export const getItemById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// CREATE new user 
export const createItem = async (userData) => {
  try {
    const response = await api.post('/users', userData); 
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// UPDATE user 
export const updateItem = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData); 
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// DELETE user 
export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default api;

