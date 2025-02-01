import request from "supertest";
import redisClient from "../src/config/redisClient";
import FAQ from "../src/models/faq";
import { app } from "../src/index";

describe("FAQ API Tests", () => {
    beforeAll(async () => {
        // Clear the database and Redis cache before running tests
        await FAQ.deleteMany({});
        await redisClient.flushall(); // Clear all Redis cache
    });

    afterAll(async () => {
        // Close the Redis connection after all tests are done
        await redisClient.quit();
    });

    let faqId: string;

    // Test case: Create a new FAQ
    it("should create a new FAQ", async () => {
        const res = await request(app)
            .post("/api/faq")
            .send({
                question: "What is TypeScript?",
                answer: "TypeScript is a superset of JavaScript.",
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id");
        faqId = res.body._id; // Save the FAQ ID for later tests
    });

    // Test case: Fetch all FAQs
    it("should fetch all FAQs", async () => {
        const res = await request(app).get("/api/faq");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0); // Ensure at least one FAQ is returned
    });

    // Test case: Fetch FAQs by language
    it("should fetch FAQ by language", async () => {
        const res = await request(app).get("/api/faq?lang=hi");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Test case: Update an FAQ and clear the cache
    it("should update an FAQ and clear cache", async () => {
        const res = await request(app)
            .put(`/api/faq`)
            .send({
                id: faqId,
                question: "Updated Question?",
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("question", "Updated Question?");

        // Check if the cache for the updated FAQ is cleared
        const cached = await redisClient.get("faqs_hi");
        expect(cached).toBeNull(); // Cache should be cleared after update
    });

    // Test case: Delete an FAQ
    it("should delete an FAQ", async () => {
        const res = await request(app).delete(`/api/faq/${faqId}`);
        expect(res.status).toBe(200);

        // Verify the FAQ is deleted
        const deletedFAQ = await FAQ.findById(faqId);
        expect(deletedFAQ).toBeNull();
    });
});