# Contacts_Management_Api

Api is live on : https://contacts-management-api-1kpy.onrender.com/
Contacts Management is a REST API which provides user authentication and Contacts Management.
The API is built using Node.js,Express.js and MongoDB.
Apart from this it uses Bcrypt libraray for encrypting passwords and JWT(Json Web Token) for seamless authentication.

Users can register,login and get current user info.
They can create,read,update and delete contacts.

User Authentication

 - login
 - route : POST /api/login
 - access public

- register the user
- route : POST /api/register
- access public

- get current user
- route : POST /api/current
- access private

  
