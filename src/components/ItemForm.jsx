import { useState, useEffect } from 'react';
import { createItem, updateItem } from '../services/api';

function ItemForm({ item, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // If editing, populate form with user data
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        email: item.email || '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item) {
        // UPDATE
        await updateItem(item.id, formData);
        alert('Item updated successfully!');
      } else {
        // CREATE
        await createItem(formData);
        alert('Item created successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error saving item:', error);
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        alert('Cannot connect to backend. Make sure your Express server is running on port 3000!');
      } else if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data?.error || error.response.data?.message || 'Failed to save item'}`);
      } else {
        alert(`Failed to save item: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>{item ? 'Edit User' : 'Create New User'}</h2>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter user name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;

