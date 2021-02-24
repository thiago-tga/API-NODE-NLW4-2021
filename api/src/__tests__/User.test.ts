import request from "supertest";
import { app } from "../app";
import createConnection from "../database";


describe('Users', () => {
    beforeAll( async() =>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async()=>{
        const resp = await request(app).post("/users").send({
            name: "User Example",
            email: "example@outlook.com",
        });
        expect(resp.status).toBe(201);
    }); 

    it("Should not be able to create a new user if email already exists", async()=>{
        const resp = await request(app).post("/users").send({
            name: "User Example",
            email: "example@outlook.com",
        });
        expect(resp.status).toBe(400);
    });
});
