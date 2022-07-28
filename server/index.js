const express = require("express");
const colors = require("colors")
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/database");


const app = express()

//Connect to database
connectDB()

app.use("/graphql", graphqlHTTP({
    schema,
    //Only enable graphiql if in development
    graphiql: true,
}))

const port = process.env.PORT || 5500

app.listen(port, ()=> console.log(`Server running on ${port}`))