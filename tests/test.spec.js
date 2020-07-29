const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig");

afterAll(async () => {
    return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
});

describe("server", function () {

    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    let user = {
        username: "NewUser",
        password: "Password",
        token: ""
    }

})
