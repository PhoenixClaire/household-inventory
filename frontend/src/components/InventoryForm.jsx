import { useState } from "react";

function InventoryForm({ onAddItem }) {
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "",
        threshold: ""
    }); 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "quantity" || name === "threshold" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onAddItem({
            ...formData,
            unit: formData.unit || "pcs",
        }); 

        setFormData({
            name: "",
            quantity: "",
            unit: "",
            threshold: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Item</h2>

            <input
                type="text"
                name="name"
                placeholder="Item name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
            />

            <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={formData.unit}
                onChange={handleChange}
            />

            <input
                type="text"
                name="threshold"
                placeholder="Threshold"
                value={formData.threshold}
                onChange={handleChange}
                required
                min="0"
            />

            <button type="submit">Add Item</button>
        </form>
    );
}

export default InventoryForm; 