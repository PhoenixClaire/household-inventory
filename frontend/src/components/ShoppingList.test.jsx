import { render, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

describe("ShoppingList", () => {
    it("renders shopping list items", () => {
        const items = [
            {
                _id: "1",
                name: "Milk",
                quantity: 0,
                unit: "liter",
                stockStatus: "Out of Stock",
            },
        ];

        render(<ShoppingList items={items}/>)

        expect(screen.getByText(/Milk/i)).toBeInTheDocument();
        expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
    });

    it("renders empty state when no items need restocking", () => {
        render(<ShoppingList items={[]}/>);

        expect(screen.getByText(/No items need restocking/i)).toBeInTheDocument();
    });
});

