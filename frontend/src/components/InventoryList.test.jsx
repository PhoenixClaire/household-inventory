import { fireEvent, render, screen } from  "@testing-library/react";
import InventoryList from "./InventoryList";
import exp from "constants";

describe("InventoryList", () => {
    it("renders inventory items", () => {
        const items = [
            {
                _id: "1",
                name: "Eggs",
                quantity: 4,
                unit: "pcs",
                stockStatus: "Low Stock",
            },
            {
                _id: "2",
                name: "Rice",
                quantity: 5,
                unit: "kg",
                stockStatus: "In Stock"
            },
        ];

        render(<InventoryList 
            items={items}
            onDeleteItem={() => {}}
            onEditItem={() => {}} />);

        //verify that the tiems are there
        expect(screen.getByText(/Eggs/i)).toBeInTheDocument(); 
        expect(screen.getByText(/Rice/i)).toBeInTheDocument();

        //verify that the status are there
        expect(screen.getByText(/Low Stock/i)).toBeInTheDocument();
        expect(screen.getByText(/In Stock/i)).toBeInTheDocument();

    });

    it("renders empty state when there are no items", () => {
        render(<InventoryList items={[]} />);

        expect(screen.getByText(/No items found/i)).toBeInTheDocument();
    });

    it("calls onDeleteItem when delete button is clicked", () => {
        const mockDelete = vi.fn();

       const items = [
        {
                _id: "1",
                name: "Eggs",
                quantity: 4,
                unit: "pcs",
                stockStatus: "Low Stock",
            },
       ];

       render(<InventoryList 
        items={items} 
        onDeleteItem={mockDelete}
        onEditItem={() => {}}/>);

       fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

       expect(mockDelete).toHaveBeenCalledTimes(1);
       expect(mockDelete).toHaveBeenCalledWith("1");
    });

    it("calls onEditItem when edit button is clicked", () => {
    const mockEdit = vi.fn();

    const items = [
      {
        _id: "1",
        name: "Eggs",
        quantity: 4,
        unit: "pcs",
        stockStatus: "Low Stock",
      },
    ];

    render(
      <InventoryList
        items={items}
        onDeleteItem={() => {}}
        onEditItem={mockEdit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));

    expect(mockEdit).toHaveBeenCalledWith(items[0]);
  });
});

