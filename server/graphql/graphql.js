const {
    GraphQLSchema,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
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
        }
    })
});

const schema = new GraphQLSchema({ query });

module.exports = schema