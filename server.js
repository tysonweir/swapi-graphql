const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const axios = require("axios");
const cors = require("cors");

// Define GraphQL schema
const schema = buildSchema(`
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type Planet {
    name: String
    rotation_period: String
    orbital_period: String
    diameter: String
    climate: String
  }

  type Query {
    people: [Person]
    planets: [Planet]
  }
`);

// Define resolvers
const rootValue = {
  people: async () => {
    const response = await axios.get("https://swapi.dev/api/people/");
    return response.data.results;
  },
  planets: async () => {
    const response = await axios.get("https://swapi.dev/api/planets/");
    return response.data.results;
  },
};

const app = express();
app.use(cors()); // Enable CORS

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
