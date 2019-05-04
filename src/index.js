import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
    type Query{
        lucas: User!

    }
    type User{
        nome: String!
        email: String!
        idade: Int!
    }
    `

const resolvers = {
  Query: {
    lucas() {
      return {
        nome: 'Lucas 4h50',
        email: 'Upaltasaventuras@gmail.com',
        idade: 25,
      }
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('up altas aventuras')
})
