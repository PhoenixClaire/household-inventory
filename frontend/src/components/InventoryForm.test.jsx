import { render, screen, fireEvent } from "@testing-library/react";
import InventoryForm from "./InventoryForm";

describe("InventoryForm", () => {
  it("submits form data correctly", async () => {
    const mockOnAddItem = vi.fn();

    render(<InventoryForm onAddItem={mockOnAddItem} />);

    fireEvent.change(screen.getByPlaceholderText(/Item name/i), {
      target: { value: "Eggs" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Quantity/i), {
      target: { value: "4" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Unit/i), {
      target: { value: "pcs" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Threshold/i), {
      target: { value: "6" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Item/i }));

    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    expect(mockOnAddItem).toHaveBeenCalledWith({
      name: "Eggs",
      quantity: 4,
      unit: "pcs",
      threshold: 6,
    });
  });
});