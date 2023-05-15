# CRUD-API

Steps to build a simple CRUD API using js.

1. Install all the packages mentioned in the package.json file.
3. MongoDB Atlas cloud will automatically connect to my server. If anybody wants to proceed with their local MongoDB server then use this commented line: 
  //  mongoose.connect("mongodb://0.0.0.0:27017/usersDB");
3. The server is running at 4000 port. Change it accordingly.
4. To start the project use :
   // nodemon app.js
5. All the operations (Create, Read, Update and Delete) are performed in this project.
6. To create use : localhost:4000/api/users and send the information (username,age,hobbies) through body. To send the information I've used Postman( https://www.postman.com/ ).
7. To read use : "localhost:4000/api/users" to get the information about all the users. To get information of a specific user use :"localhost:4000/api/users/userId" where userId is created by the server.
8. To update use: "localhost:4000/api/users/userId".
9. To delete also use: "localhost:4000/api/users/userId".

