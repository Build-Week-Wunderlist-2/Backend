# Backend

API for Wunderlist 2.0 </br>
Deployed at https://wunderlist2backend.herokuapp.com/

# User Login and Register

| Method  | Endpoint  | Auth required?  | Description  |   
|---|---|---|---|
| POST  | /api/register  | No  | Create a new user account, return an authentication token  | 
| POST  | /api/login  | No  | Login a user, return user id and authentication token  |  

# Todo List and Tasks

| Method  | Endpoint  | Auth required?  | Description  |   
|---|---|---|---|
| GET  | /api/users/:userid/lists  | Yes  | Get the todo lists of an user with the id of :userid  | 
| GET  | /api/users/:userid/lists/:listid/todos  | Yes  | Get the tasks (todo items) of an user with the id of :userid and of the list with the id of :listid   |  
| POST  | /api/users/:userid/lists/  | Yes  | Create a new todo list for an user with the id of :userid, <h5> Post request body example </h5> <h4>{ listname: 'New List' } </h4><h5> Response body example </h5> <h4> { </br> "id":1, </br> "listname": "New List", </br> "user_id": 1 </br> } </h4> | 
| POST  | /api/users/:userid/lists/:listid/todos  | Yes  | Create a new task (todo item) for an user with the id of :userid in the list with the id of :listid, <h5> Post request body example </h5> <h4>{ todo: 'New Todo' } </h3> <h5> Response body example </h4> <h4> { </br> "id":1, </br> "todo": "New Todo", </br> "list_id": 1, , </br> "completed": 0 </br> } </h4> |  
| PUT  | /api/users/:userid/lists/:listid  | Yes  | Update the name of a todo list with the id of :listid for an user with the id of :userid, <h5> Post request body example </h5> <h4>{ listname: 'Edited List' } </h4> <h5> Response body example </h5> <h4> { </br> "id":1, </br> "listname": "Edited List", </br> "user_id": 1 </br> } </h4> | 
| PUT  | /api/users/:userid/lists/:listid/todos/:todoid  | Yes  | Update the name of the task (todo item) with the id of :todoid for an user with the id of :userid in the list with the id of :listid, <h5> Post request body example </h5> <h4>{ todo: 'Edited Todo' } </h3> <h5> Response body example </h4> <h4> { </br> "id":1, </br> "todo": "Edited Todo", </br> "list_id": 1 </br> } </h4> | 
| PUT  | /api/users/:userid/lists/:listid/todos/:todoid  | Yes  | Update the completion status of the task (todo item) with the id of :todoid for an user with the id of :userid in the list with the id of :listid, <h5> Post request body example </h5> <h4>{ completed: 1 } </h3> <h5> Response body example </h4> <h4> { </br> "id":1, </br> "todo": "Edited Todo", </br> "list_id": 1, </br> "completed": 1 </br> } </h4> | 
| DELETE  | /api/users/:userid/lists/:listid  | Yes  | Delete a todo list with the id of :listid for an user with the id of :userid, <i> will delete all the todo items associated with the list id </i> <h5> Response body example </h5> <h4> removed { </br> "id":1, </br> "listname": "Edited List", </br> "user_id": 1 </br> } </h4> | 
| DELETE  | /api/users/:userid/lists/:listid/todos/:todoid  | Yes  | Delete a task (todo item) with the id of :todoid for an user with the id of :userid in the list with the id of :listid, <h5> Response body example </h4> <h4> removed { </br> "id":1, </br> "todo": "Edited Todo", </br> "list_id": 1, </br> completed: 0 </br> } </h4> | 

# Testing

Just install dependencies and enter "npm run test" in the terminal, tests are made in the test database
