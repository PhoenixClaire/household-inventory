//npm install --save-dev mongodb-memory-server for testing so we don't mess with local db

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const Item = require("../src/models/Item");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
});

afterEach(async () => {
    await Item.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

//add item
describe("POST /api/items", () => {
    it("should create a new item successfully", async () => {
        const response = await request(app).post("/api/items").send({
            name: "eggs",
            quantity: 4,
            unit: "pcs",
            threshold: 6,       
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Item created successfully");
        expect(response.body.item.name).toBe("eggs");
        expect(response.body.item.stockStatus).toBe("Low Stock");
    });

    it("should return 400 if required fields are missing", async () => {
            const response = await request(app).post("/api/items").send({
                quantity: 4,
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Failed to create item");
        });
    
});

//get all items
describe ("GET /api/items", () => {
    it("should return all items with stock status", async () => {
        await Item.create({
            name:"milk",
            normalizedName: "milk",
            quantity: 1,
            unit: "liter",
            threshold: 2,
        });

        const response = await request(app).get("/api/items");

        expect(response.statusCode).toBe(200);
        expect(response.body.items.length).toBe(1); //since there's only 1 item in the list
        expect(response.body.items[0].name).toBe("milk"); //first item on the list 
        expect(response.body.items[0].stockStatus).toBe("Low Stock"); //first item on the list
    });
});

//get shopping list
describe("GET /api/items/shopping-list", () => {
    it("should return only low stock or out of stock items", async () => {
        await Item.create([
            {
                name: "Rice",
                normalizedName: "rice",
                quantity: 5,
                unit: "kg",
                threshold: 2,
            },
            {
                name: "Eggs",
                normalizedName: "eggs",
                quantity: 4,
                unit: "pcs",
                threshold: 6,
            },
            {
                name: "Milk",
                normalizedName: "milk",
                quantity: 0,
                unit: "liter",
                threshold: 1,
            },
        ]);

        const response = await request(app).get("/api/items/shopping-list");

        //2 items in the shopping list
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Shopping list fetched successfully");
        expect(response.body.items.length).toBe(2);

        //verify rice is not in the list
        const itemNames = response.body.items.map((item) => item.name);
        expect(itemNames).toContain("Eggs");
        expect(itemNames).toContain("Milk");
        expect(itemNames).not.toContain("Rice");
    });
})

//update
describe("PUT /api/items/:id", () => {
    it("should update an item successfully", async () => {
        const item = await Item.create({
            name: "Eggs",
            normalizedName: "eggs",
            quantity: 4,
            unit: "pcs",
            threshold: 6,
        }); 

        const response = await request(app)
            .put(`/api/items/${item._id}`)
            .send({
                name: "Eggs",
                normalizedName: "eggs",
                quantity: 10,
                unit: "pcs",
                threshold: 6,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Item updated successfully");
        expect(response.body.item.quantity).toBe(10);
        expect(response.body.item.stockStatus).toBe("In Stock");
    });

    it("should return 404 when updating a non-existent item", async () => {
        const fakeId = "507f1f77bcf86cd799439011";

        const response = await request(app)
            .put(`/api/items/${fakeId}`)
            .send({
                name: "Eggs",
                normalizedName: "eggs",
                quantity: 10,
                unit: "pcs",
                threshold: 6,
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Item not found");
    });

});

//delete 
describe("DELETE /api/items/:id", () => {
    it("should delete an item successfully", async () => {

        //create the item
        const item = await Item.create({
            name: "Milk",
            normalizedName: "milk",
            quantity: 1,
            unit: "liter",
            threshold: 2,
        });

        const response = await request(app).delete(`/api/items/${item._id}`); //delete the created item

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Item deleted successfully");

        const deletedItem = await Item.findById(item._id); //search for the deleted item
        expect(deletedItem).toBeNull(); //verify that it no longer exists

    });    

    it("should return 404 when deleting a non-existent item", async () => {
        const fakeId = "507f1f77bbf86cd799439011";

        const response = await request(app).delete(`/api/items/${fakeId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Item not found"); 
    });
});
