

function InventoryList({ items, onDeleteItem,  onEditItem}) {

  const safeItems = Array.isArray(items) ? items : [];

  const getStatusClass = (status) => {
    if(status === "In Stock") return "status in-stock";
    if(status === "Low Stock") return "status low-stock";
    if(status === "Out of Stock") return "status out-of-stock";
    return status;
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

              <div className="item-actions">
                <button onClick={() => onEditItem(item)}>Edit</button>
                <button onClick={() => onDeleteItem(item._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default InventoryList;