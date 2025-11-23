import axios from 'axios';

// Base URL for your Node.js API backend
// Change this to match your backend URL (e.g., http://localhost:3000 or http://localhost:5000)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example CRUD operations - adjust these to match your backend endpoints

// GET all users (matches your getUsers backend function)
export const getAllItems = async () => {
  try {
    const response = await api.get('/users'); // Matches your backend route
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// GET single user by ID (matches your getUserById backend function)
export const getItemById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// CREATE new user (matches your createUser backend function)
export const createItem = async (userData) => {
  try {
    const response = await api.post('/users', userData); // Matches your backend route
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// UPDATE user (matches your updateUser backend function)
export const updateItem = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData); // Matches your backend route
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// DELETE user (matches your deleteUser backend function)
export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`); // Matches your backend route
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default api;

