function ShoppingList({ items }) {
  return (
    <section>
      <h2>Shopping List</h2>

      {items.length === 0 ? (
        <p>No items need restocking.</p>
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

export default ShoppingList;