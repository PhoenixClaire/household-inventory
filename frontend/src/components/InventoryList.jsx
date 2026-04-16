function InventoryList({ items, onDeleteItem }) {

  const safeItems = Array.isArray(items) ? items : [];

  const getStatusClass = (status) => {
    if(status === "In Stock") return "status in-stock";
    if(status === "Low Stock") return "status low-stock";
    if(status === "Out of Stock") return "status out-of-stock";
  };

  return (
    <section>
      <h2>Inventory Items</h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="item-list">
          {safeItems.map((item) => (
            <li key={item._id} className="item-card">
              <div>
                <strong>{item.name}</strong> - {item.quantity} {item.unit}
                <br/>
                <span className={getStatusClass(item.stockStatus)}>
                  {item.stockStatus}
                </span>
              </div>

              <button onClick={() => onDeleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default InventoryList;