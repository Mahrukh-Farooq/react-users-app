import { useState, useEffect } from 'react';
import { getAllItems, deleteItem } from '../services/api';
import ItemForm from './ItemForm';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // READ - Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        alert('Cannot connect to backend. Make sure your Express server is running on port 3000!');
      } else {
        alert(`Failed to load items: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // DELETE - Remove an item
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        fetchItems(); // Refresh the list
      } catch (error) {
        console.error('Error deleting item:', error);
        if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          alert('Cannot connect to backend. Make sure your Express server is running!');
        } else {
          alert(`Failed to delete item: ${error.message}`);
        }
      }
    }
  };

  // Handle edit - open form with item data
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Handle form close and refresh
  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchItems(); // Refresh list after create/update
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-list-container">
      <div className="item-list-header">
        <h2>Users List</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          + Add New Dua
        </button>
      </div>

      {showForm && (
        <ItemForm
          item={editingItem}
          onClose={handleFormClose}
        />
      )}

      {items.length === 0 ? (
        <p>No users found. Create your first user!</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name || `User ${item.id}`}</h3>
              <p>URL: {item.URL || item.url || 'No URL'}</p>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;

