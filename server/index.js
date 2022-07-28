const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");


const app = express()

app.use("/graphql", graphqlHTTP({
    schema,
    //Only enable graphiql if in development
    graphiql: true,
}))

const port = process.env.PORT || 5500

app.listen(port, ()=> console.log(`Server running on ${port}`))