const { projects, clients } = require("../sampleData");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require("graphql");

//Creating a type "Client" (like a class)
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

//Type "Project"
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        //To find the client of the project
        //Nesting types within types
        client: { type: ClientType,
            resolve(parent, args) {
            //Here parent is like self/this in OOPs, but to work on the actual data we are using
                return clients.find(client => client.id === parent.clientId)
            }
        }
    })
})

//This is how we function on our types
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            //What kind of parameters we want to find clients from
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Logic for filtering through the condition we want
                return clients.find(client => client.id === args.id)
            }
        },
        //For finding all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients
            }
        },
        project: {
            type: ProjectType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})

