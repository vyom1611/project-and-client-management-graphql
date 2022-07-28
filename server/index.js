const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config();

const app = express()

app.use("/graphql", graphqlHTTP({
    schema: schema,
    //Only enable graphiql if in development
    graphiql: process.env.NODE_ENV === "development",

}))

const port = process.env.PORT || 5500

app.listen(port, ()=> console.log(`Server running on ${port}`))