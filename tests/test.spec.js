const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig");


afterAll(async () => {
    await db('users').truncate();
    await db('lists').truncate();
    await db('todo').truncate();
});

describe("server", function () {

    let token = ''
    let id = 0
    let firstListId = 0

    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    describe("POST api/register", () => {

        it("Return status code 500 when no username or password is given", () => {
            return supertest(server)
                .post("/api/register")
                .send({

                })
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })

        it ("Return error message when no username is given", () => {
            return supertest(server)
                .post("/api/register")
                .send({
                    username: "",
                    password: ""
                })
                .then(res => {
                    expect(res.body.message).toBe("Please provide a username")
                })
        })

        it ("Return error message when no password is given", () => {
            return supertest(server)
                .post("/api/register")
                .send({
                    username: "NewUser",
                    password: ""
                })
                .then(res => {
                    expect(res.body.message).toBe("Please provide a password")
                })
        })

        it("Create a new user", () => {
            return supertest(server)
                .post("/api/register")
                .send({
                    username: "NewUser",
                    password: "Password"
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })

    describe("POST api/login", () => {

        it("Return status code 401 with invalid credentials", () => {
            return supertest(server)
                .post("/api/login")
                .send({
                    username: "NotExist",
                    password: "NotExist"
                })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

        it("Return status code 401 with invalid credentials", () => {
            return supertest(server)
                .post("/api/login")
                .send({
                    username: "NotExist",
                    password: "NotExist"
                })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

        it("Return error message when no username is given", () => {
            return supertest(server)
                .post("/api/login")
                .send({
                    username: "",
                    password: ""
                })
                .then(res => {
                    expect(res.body.message).toBe('Please provide a username')
                })
        })

        it("Return error message when no password is given", () => {
            return supertest(server)
                .post("/api/login")
                .send({
                    username: "NotExist",
                    password: ""
                })
                .then(res => {
                    expect(res.body.message).toBe('Please provide a password')
                })
        })

        it("Login successfully return status code 200", () => {
            return supertest(server)
                .post("/api/login")
                .send({
                    username: "NewUser",
                    password: "Password"
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("Login successfully return authentication token and id", () => {
            return supertest(server)
                .post("/api/login")
                .send({
                    username: "NewUser",
                    password: "Password"
                })
                .then(res => {
                    token = res.body.token
                    id = res.body.id
                    expect(res.body.token && res.body.id).toBe(1)
                })
        })

        describe("POST api/:userid/lists", () => {

            it('Return status code and error message without authorization token', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists`)
                    .send({
                        listname: "New List"
                    })
                    .then(res => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe('A authorization header token is required')
                    })
            })

            it("Return error if authorization token is invalid", () => {
                return supertest(server)
                    .get(`/api/users/${id}/lists`)
                    .set('Authorization', 'invalidtoken')
                    .then(res => {
                        expect(res.status).toBe(401)
                        expect(res.body.message).toBe('Token validation error')
                    })
            })

            it('Cannot add a new list without having anything', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists`)
                    .set('Authorization', token)
                    .send({

                    })
                    .then(res => {
                        expect(res.status).toBe(400)
                    })
            })

            it('Add a new list successfully', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists`)
                    .set('Authorization', token)
                    .send({
                        listname: 'New List'
                    })
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect(res.body.listname).toBe('New List')
                        firstListId = res.body.id
                    })
            })

        })

    describe("GET api/:userid/lists", () => {


        it("Return status code 400 and error message without authorization token", () => {
            return supertest(server)
                .get(`/api/users/${id}/lists`)
                .then(res => {
                    expect(res.status).toBe(400);
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it("Return error if authorization token is invalid", () => {
            return supertest(server)
                .get(`/api/users/${id}/lists`)
                .set('Authorization', 'invalidtoken')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.message).toBe('Token validation error')
                })
        })

        it("Return error is userid does not exit", () => {
            return supertest(server)
                .get(`/api/users/2/lists`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('Return status code 200 success with authorization token', () => {
            return supertest(server)
                .get(`/api/users/${id}/lists`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        describe("POST api/:userid/lists/:listid/todos", () => {

            it('Return status code and error message without authorization token', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists/${firstListId}/todos`)
                    .send({
                        todo: "New Todo"
                    })
                    .then(res => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe('A authorization header token is required')
                    })
            })

            it('Cannot add a new todo without having anything', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists/${firstListId}/todos`)
                    .set('Authorization', token)
                    .send({

                    })
                    .then(res => {
                        expect(res.status).toBe(400)
                    })
            })

            it('Cannot add new todo to a list that does not exist', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists/1000/todos`)
                    .set('Authorization', token)
                    .send({
                        todo: "New Todo"
                    })
                    .then(res => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe('The list does not exist')
                    })
            })

            it('Can add new todo to a list', () => {
                return supertest(server)
                    .post(`/api/users/${id}/lists/${firstListId}/todos`)
                    .set('Authorization', token)
                    .send({
                        todo: "New Todo"
                    })
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect(res.body.todo).toBe('New Todo')
                    })
            })

        })

    describe("GET api/:userid/lists/:listid/todos", () => {

        it("Return status code 400 and error message without authorization token", () => {
            return supertest(server)
                .get(`/api/users/${id}/lists/${firstListId}/todos`)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it("Return error if authorization token is invalid", () => {
            return supertest(server)
                .get(`/api/users/${id}/lists/${firstListId}/todos`)
                .set('Authorization', 'invalidtoken')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.message).toBe('Token validation error')
                })
        })

        it("Return error message if the list does not exist", () => {
            return supertest(server)
                .get(`/api/users/${id}/lists/2/todos`)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it("Return a list of todo tasks on success", () => {
            return supertest(server)
                .get(`/api/users/${id}/lists/${firstListId}/todos`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })

    describe('PUT api/:userid/lists/:listid', () => {

        it('Return status code and error message without authorization token', () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/${firstListId}`)
                .send({
                    listname: "Edited List"
                })
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it("Return error if the list does not exit", () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/1000`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('The list does not exist')
                })
        })

        it("Successfully edit a listname of an existing list", () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/${firstListId}`)
                .set('Authorization', token)
                .send({
                    listname: 'Edited List'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.listname).toBe('Edited List')
                })
        })

    })

    describe('PUT api/:userid/lists/:listid/todos/1', () => {

        it('Return status code and error message without authorization token', () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/${firstListId}/todos/1`)
                .send({
                    todo: "Edited Todo"
                })
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it("Return error if the todo item does not exist", () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/${firstListId}/todos/5`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('The todo item does not exist')
                })
        })

        it('Successfully edit the todo of a list', () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/${firstListId}/todos/1`)
                .set('Authorization', token)
                .send({
                    todo: "Edited Todo"
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.todo).toBe('Edited Todo')
                })
        })

        it('Can mark a todo item as completed', () => {
            return supertest(server)
                .put(`/api/users/${id}/lists/${firstListId}/todos/1`)
                .set('Authorization', token)
                .send({
                    completed: 1
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.completed).toBe(1)
                })
        })

    })

    describe('DELETE api/:userid/lists/:listid/todos/1', () => {

        it('Return status code and error message without authorization token', () => {
            return supertest(server)
                .delete(`/api/users/${id}/lists/${firstListId}/todos/1`)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it('Cannot delete a todo item that does not exist', () => {
            return supertest(server)
                .delete(`/api/users/${id}/lists/${firstListId}/todos/1000`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('The todo item does not exist')
                })
        })

        it('Successfully delete a todo item of a list', () => {
            return supertest(server)
                .delete(`/api/users/${id}/lists/${firstListId}/todos/1`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.removed.todo).toBe('Edited Todo')
                })
        })

    })

    describe('DELETE api/:userid/lists/:listid', () => {

        it('Return status code and error message without authorization token', () => {
            return supertest(server)
                .delete(`/api/users/${id}/lists/${firstListId}`)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('A authorization header token is required')
                })
        })

        it("Return error if the list does not exit", () => {
            return supertest(server)
                .delete(`/api/users/${id}/lists/1000`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('The list does not exist')
                })
        })

        it('Successfully delete a list that does not exist', () => {
            return supertest(server)
                .delete(`/api/users/${id}/lists/${firstListId}`)
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.removed.listname).toBe('Edited List')
                })
        })

    })

    })

    })

})
