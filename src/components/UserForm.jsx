import { useState, useEffect } from 'react';
import { createItem, updateItem } from '../services/api';


function UserForm({ user, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [URL, setURL] = useState('');


 
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
        alert('Dua updated successfully!');
      } else {
        // CREATE new user
        await createItem({ name, URL });
        alert('Dua created successfully!');
      }
     
    
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
      console.error('Error saving dua:', error);
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        alert('Cannot connect to backend. Make sure your Express server is running on port 3000!');
      } else if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data?.error || error.response.data?.message || 'Failed to save user'}`);
      } else {
        alert(`Failed to save dua: ${error.message}`);
      }
    }
  };


  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>{user ? 'Edit Dua' : 'Add new Dua'}</h2>
          {onClose && (
            <button onClick={onClose} className="btn-close">×</button>
          )}
        </div>


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label >Dua Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter dua name"
            />
          </div>


          <div className="form-group">
            <label>Dua Link:</label>
            <input
              type="url"
              value={URL}
              onChange={(e) => setURL(e.target.value)}
              required
              placeholder="Enter dua link"
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




