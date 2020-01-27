const {
    GraphQLSchema,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = require('graphql');

const db = require('../db_models/studyModels.js');

const UnitsSchema = new GraphQLObjectType({
    name: 'UnitsSchema',
    fields: {
        id: { type: GraphQLID },
        unit: { type: GraphQLString },
        description: { type: GraphQLString },
        sub_units: { type: GraphQLString }
    }
});

const ResourcesSchema = new GraphQLObjectType({
    name: 'ResourcesSchema',
    fields: {
        id: { type: GraphQLID },
        unit_id: { type: GraphQLInt },
        resources: { type: GraphQLString },
    }
});

const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        units: {
            type: new GraphQLList(UnitsSchema),
            resolve: (parentValue, args) => {
                const queryString = 'SELECT * FROM units;';

                return db.query(queryString)
                    .then((response) => response.rows);
            }
        },
        resources: {
            type: new GraphQLList(ResourcesSchema),
            args: { unit_id: { type: GraphQLInt } },
            resolve: (parentValue, args) => {
                let queryString = 'SELECT * FROM resources WHERE unit_id=$1';

                if (!args.unit_id) {
                    // Can this be optimized?
                    queryString = 'SELECT * FROM resources'
                }

                const variables = [args.unit_id]

                return db.query(queryString, args.unit_id ? variables : null)
                    .then((response) => response.rows);
            }
        }
    })
});

const schema = new GraphQLSchema({ query });

module.exports = schema


/*
query {
  units {
    id
    unit
    description
    sub_units
  }
}

query {
  resources(unit_id: 1) {
    id
    unit_id
    resources
  }
}
*/