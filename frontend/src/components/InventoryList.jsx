function InventoryList({ items }) {
  return (
    <section>
      <h2>Inventory Items</h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> - {item.quantity} {item.unit} -{" "}
              {item.stockStatus}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default InventoryList;