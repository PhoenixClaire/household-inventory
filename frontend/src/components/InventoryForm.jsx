import { useEffect, useState } from "react";

function InventoryForm({ 
    onAddItem,
    onUpdateItem,
    editingItem,
    onCancelEdit,
 }) {
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "",
        threshold: ""
    }); 

    useEffect(() => {
        if (editingItem){
            setFormData ({
                name: editingItem.name || "",
                quantity: editingItem.quantity ?? "",
                unit: editingItem.unit || "",
                threshold: editingItem.threshold ?? "",
            });
        } else{
            setFormData({
                name: "",
                quantity: "",
                unit: "",
                threshold: "",
            });
        }
    }, [editingItem]); 


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

        const payload = {
            ...formData,
            unit: formData.unit || "pcs",
        };

        if (editingItem){
            await onUpdateItem(payload);
        } else {
            await onAddItem(payload);
        }

        setFormData({
            name: "",
            quantity: "",
            unit: "",
            threshold: ""
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingItem ? "Edit Item" : "Add Item" }</h2>

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
                type="number"
                name="threshold"
                placeholder="Threshold"
                value={formData.threshold}
                onChange={handleChange}
                required
                min="0"
            />

            <div className="form-actions">
                <button type="submit">
                    {editingItem ? "Update Item" : "Add Item"}
                </button>

                {editingItem && (
                    <button type="button" onClick={onCancelEdit}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default InventoryForm; 