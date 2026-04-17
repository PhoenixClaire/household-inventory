function ShoppingList({ items }) {

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section>
      <h2>Shopping List</h2>

      {safeItems.length === 0 ? (
        <p>No items need restocking.</p>
      ) : (
        <ul className="item-list">
          {safeItems.map((item) => (
            <li key={item._id} className="item-card shopping-item">
              <div>
                <strong>{item.name}</strong> - buy at least {" "}
                <strong>
                  {item.quantityToBuy} {item.unit}
                </strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ShoppingList;