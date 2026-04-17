import { render, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

describe("ShoppingList", () => {
    it("renders shopping list items", () => {
        const items = [
            {
                _id: "1",
                name: "Milk",
                quantity: 0,
                unit: "liters",
                stockStatus: "Out of Stock",
                quantityToBuy: 3,
            },
        ];

        render(<ShoppingList items={items}/>)

        expect(screen.getByText(/Milk/i)).toBeInTheDocument();
        expect(screen.getByText(/buy at least/i)).toBeInTheDocument();
        expect(screen.getByText(/3 liters/i)).toBeInTheDocument();
    });

    it("renders empty state when no items need restocking", () => {
        render(<ShoppingList items={[]}/>);

        expect(screen.getByText(/No items need restocking/i)).toBeInTheDocument();
    });
});

