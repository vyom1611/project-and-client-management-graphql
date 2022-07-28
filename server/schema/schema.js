const { projects, clients } = require("../sampleData");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require("graphql");

//Mongoose models
const Project = require("../models/Project")
const Client = require("../models/Client")

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
                return Client.findById(args.id)
            }
        },
        //For finding all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        project: {
            type: ProjectType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.Id)
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
            }
        }
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add client
        addClient: {
            type: ClientType,
            args: {
                //The nonNull is for making the name to be required
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent,args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },

        //Delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
            },
        },

        //Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },

        //Delete Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type : GraphQLID },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                    defaultValue: 'Not Started',
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                },
                    { new: true })
            }
        },

        //Update project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString }
            }
        }
    },

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

