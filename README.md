# GraphCMS - Full Stack Project and Client Management Application

GraphCMS is a robust, full stack application designed to manage clients and associated projects. The application is developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), with GraphQL used to streamline the API for cleaner, more efficient operations. The Apollo Client is employed to manage state on both local and server sides within the React framework.

<kbd><img width="880" alt="Screenshot 2024-06-29 at 5 27 45 PM" border="20px solid black" src="https://github.com/vyom1611/project-and-client-management-graphql/assets/93402393/c1834811-570b-4932-b80a-11d0ba81315f"></kbd>


## Project Structure

The repository is organized into the following key directories:

- `client/`: This contains all of the front-end code for the React.js application.
- `server/`: This directory houses the server-side code, built using Express.js and GraphQL.

## Detailed Setup Instructions

In order to set up and run the full stack application, follow the step-by-step instructions detailed below:

### Backend

1. **Navigate to the Backend Directory**

```
cd project-and-client-management-graphql/server
```

2. **Install Dependencies**

Run the following command to install all required dependencies:

```
npm install
```

3. **Set up Environment Variables**

Create a `.env` file in the  directory. Add the following line, replacing `<your_mongoDB_uri>` with your MongoDB URI:

```
MONGO_URI=<your_mongoDB_uri>
```

4. **Start the Backend Server**

You can start the backend server using:

```
node index.js
```

At this point, your server should be up and running at `http://localhost:5500`.

### Client

1. **Navigate to the Frontend Directory**

```
cd project-and-client-management-graphql/client
```

2. **Install Dependencies**

Similar to the backend, run the following command to install necessary dependencies:

```
npm install
```

3. **Start the Local Development Server**

You can start the local development server using:

```
npm start run
```

You should now be able to access the full application at `http://localhost:3000`.

## Application Functionality

The GraphCMS application supports a wide range of operations, including:

- Adding new clients
- Viewing existing clients
- Updating client details
- Deleting clients
- Adding new projects associated with clients
- Viewing existing projects
- Updating project details
- Deleting projects

<kbd><img width="885" alt="Screenshot 2024-06-29 at 5 27 51 PM" src="https://github.com/vyom1611/project-and-client-management-graphql/assets/93402393/35485080-df47-46c4-a546-8ba66ac037fc"></kbd>

<kbd><img width="931" alt="Screenshot 2024-06-29 at 5 23 19 PM" src="https://github.com/vyom1611/project-and-client-management-graphql/assets/93402393/c54202d0-3cb9-4b0c-b271-d52ab819a182"></kbd>

<kbd><img width="934" alt="Screenshot 2024-06-29 at 5 23 57 PM" src="https://github.com/vyom1611/project-and-client-management-graphql/assets/93402393/6db7e079-7aaa-4233-a406-f1af2f60015b"></kbd>



In the frontend, the Apollo Client is used to make GraphQL requests to the backend. The backend server processes these requests, responding with data that is then used to update the UI in real-time.

The backend serves as the foundation for the GraphQL API, which is used by the frontend for a variety of operations. Built with Node.js and Express.js, it leverages MongoDB for data storage. The server setup can be found in the `server.js` file, and the GraphQL schema is defined within the `schema/schema.js` file.

## Contributing to the Project

Contributions to the GraphCMS project are very much welcomed and appreciated! If you come across any bugs or issues, please file an issue for it. If you have any feature requests or wish to make a contribution, you can submit a pull request.

## License

The GraphCMS project is licensed under the terms of the MIT License. You can find the terms and conditions of the license in the LICENSE.md file located in the project repository.
