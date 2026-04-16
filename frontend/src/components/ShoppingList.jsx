function ShoppingList({ items }) {

  const safeItems = Array.isArray(items) ? items : [];

  const getStatusClass = (status) => {
    if(status === "In Stock") return "status in-stock";
    if(status === "Low Stock") return "status low-stock";
    if(status === "Out of Stock") return "status out-of-stock";
  };

  return (
    <section>
      <h2>Shopping List</h2>

      {safeItems.length === 0 ? (
        <p>No items need restocking.</p>
      ) : (
        <ul className="item-list">
          {safeItems.map((item) => (
            <li key={item._id} className="item-card">
              <div>
                <strong>{item.name}</strong> - {item.quantity} {item.unit}
                <br/>
                <span className={getStatusClass(item.stockStatus)}>{item.stockStatus}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ShoppingList;