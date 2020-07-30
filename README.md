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
