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

