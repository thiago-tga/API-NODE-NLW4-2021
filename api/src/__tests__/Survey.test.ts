import request from "supertest";
import { app } from "../app";
import createConnection from "../database";


describe('Surveys', () => {
    beforeAll( async() =>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async()=>{
        const resp = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description example",
        });
        expect(resp.status).toBe(201);
        expect(resp.body).toHaveProperty("id");
    }); 

    it("Should be able to get all surveys", async()=>{
        await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Description example2",
        });
        const resp = await request(app).get("/surveys");

        expect(resp.body.length).toBe(2);
    })

});
