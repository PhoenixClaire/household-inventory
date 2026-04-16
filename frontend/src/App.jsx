import { useState, useEffect } from 'react'

import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import ShoppingList from "./components/ShoppingList";

import {
  getAllItems,
  createItem,
  getShoppingList,
  deleteItem
} from "./services/itemService";

import "./index.css";

function App(){

  const [items, setItems] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState(""); 

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

  return (
    <div className="app-container">
      <h1>Household Inventory System</h1>

      {error && <p className="error-message">{error}</p>}

      <InventoryForm onAddItem={handleAddItem} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          
          <InventoryList items={items} onDeleteItem={handleDeleteItem}/>
          <ShoppingList items={shoppingItems} />
        </>
      )}
    </div>
  );
}

export default App;

