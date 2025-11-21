 import { useState, useEffect } from 'react';
import { createItem, updateItem } from '../services/api';

function UserForm({ user, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [URL, setURL] = useState('');

  // If editing, populate form with user data 
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setURL(user.URL || user.url || '');
    }
  }, [user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (user) {
        // UPDATE existing user
        await updateItem(user.id, { name, URL });
        alert('User updated successfully!');
      } else {
        // CREATE new user
        await createItem({ name, URL });
        alert('User created successfully!');
      }
      
      // Call the onSubmit callback if provided (for parent component)
      if (onSubmit) {
        onSubmit({ name, URL });
      }
      
      // Reset form
      setName('');
      setURL('');
      
      // Close form
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving user:', error);
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        alert('Cannot connect to backend. Make sure your Express server is running on port 3000!');
      } else if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data?.error || error.response.data?.message || 'Failed to save user'}`);
      } else {
        alert(`Failed to save user: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>{user ? 'Edit User' : 'Create New User'}</h2>
          {onClose && (
            <button onClick={onClose} className="btn-close">×</button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="linkName">Name:</label>
            <input
              type="text"
              id="linkName"
              name="linkName"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Enter user name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkURL">URL:</label>
            <input
              type="url"
              id="linkURL"
              name="linkURL"
              value={URL}
              onChange={handleURLChange}
              required
              placeholder="Enter URL"
            />
          </div>

          <div className="form-actions">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn btn-cancel"
              >
                Cancel
              </button>
            )}
            <input 
              type="submit" 
              value={user ? 'Update' : 'Submit'} 
              className="btn btn-submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;

