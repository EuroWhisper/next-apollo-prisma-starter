import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { Resolvers } from '../../src/generated/graphql';

const prisma = new PrismaClient();
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Movie {
    title: String
    director: String
  }

  type AuthData {
    token: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    movies(title: String): [Movie]
  }

  type Mutation {
    login(email: String, password: String): AuthData
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const movies = [
  {
    title: 'The Conjuring',
    director: 'James Wan',
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    books: async (parent, args) => {
      const books = await prisma.book.findMany();
      return books;
    },
    movies: async (parent, args) => {
      let movies;

      if (args.title) {
        movies = await prisma.movie.findMany({
          where: { title: { contains: args.title } },
        });
        return movies;
      }
      movies = await prisma.movie.findMany();
      return movies;
    },
  },
  Mutation: {
    login: (parent, args, context) => ({ token: 'I am a token love me' }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
