import { useState, useEffect } from 'react'

import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import ShoppingList from "./components/ShoppingList";

import {
  getAllItems,
  createItem,
  getShoppingList,
  deleteItem, 
  updateItem,
} from "./services/itemService";

import "./index.css";

function App(){

  const [items, setItems] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data.items);
    } catch (err) {
      setError("Failed to fetch items");
    }
  };

  const fetchShoppingList = async () => {
    try {
      const data = await getShoppingList();
      setShoppingItems(data.items);
    } catch (err) {
      setError("Failed to fetch shopping list");
    }
  };

  const loadData = async () => {

    try {
      setLoading(true);
      setError("");
      await fetchItems();
      await fetchShoppingList();
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {

      setError("");

      const normalizedName = newItem.name.trim().toLowerCase();
      const alreadyExists = items.some(
        (item) => item.name.trim().toLowerCase() === normalizedName
      );

      if(alreadyExists) {
        setError("Item already exists in inventory.");
        return;
      }

      await createItem(newItem);
      await loadData();
    } catch (err) {
      setError("Failed to add item");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      setError("");
      await deleteItem(id);
      await loadData();
    } catch (err) {
      console.error("Delete item error:", err);
      setError(err.response?.data?.message || "Failed to delete item.");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = async (updatedData) => {
    try {
      setError("");

      if(!editingItem) return;

      await updateItem(editingItem._id, updatedData);
      setEditingItem(null);
      await loadData();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update item.");
      return false; 
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="app-container">
      <h1>Household Inventory System</h1>

      {error && <p className="error-message">{error}</p>}

      <InventoryForm 
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        editingItem={editingItem}
        onCancelEdit={handleCancelEdit} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          
          <InventoryList 
            items={items} 
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}/>
          <ShoppingList items={shoppingItems} />
        </>
      )}
    </div>
  );
}

export default App;

