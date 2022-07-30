const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/database");


const app = express()

//Connect to database
connectDB();

//Adding cors middleware
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    //Only enable graphiql if in development
    graphiql: true,
}))

const port = process.env.PORT || 5500

app.listen(port, ()=> console.log(`Server running on ${port}`))