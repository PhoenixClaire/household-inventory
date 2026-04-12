const getStockStatus = require("../src/utils/getStockStatus");

describe('getStockStatus', () => {

    it("should return 'Out of Stock' when quantity is 0", () => {
        expect(getStockStatus(0, 5)).toBe("Out of Stock"); 
    }); 

    it("should return 'Low Stock' when quantity is equal to threshold", () => {
        expect(getStockStatus(5,5)).toBe("Low Stock");
    });

    it("should return 'In Stock' when quantity is greater than threshold", () => {
        expect(getStockStatus(10,5)).toBe("In Stock");
    });
});