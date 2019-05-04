import { GraphQLServer } from 'graphql-yoga'

const usuarios = [
  {
    id: 1,
    nome: 'Lucas luiz',
    email: 'Upaltasaventuras@gmail.com',
    idade: 25,
  },
  {
    id: 2,
    nome: 'Lucas humanas',
    email: 'Upaltasaventuras2@gmail.com',
    idade: 25,
  },
  {
    id: 3,
    nome: 'Lucas jorge',
    email: 'Upaltasaventuras3@gmail.com',
    idade: 25,
  },
]

const rates = [
  {
    id: 11,
    titulo: 'Achei legal',
    avaliacao: 5,
  },
  {
    id: 12,
    titulo: 'Achei legal',
    avaliacao: 5,
  },
  {
    id: 13,
    titulo: 'Achei legal',
    avaliacao: 5,
  },
]

const comentarios = [
  {
    id: 101,
    texto: 'Podia ser melhor',
  },
  {
    id: 102,
    texto: 'Podia ser melhor',
  },
  {
    id: 103,
    texto: 'Podia ser melhor',
  },
]

const typeDefs = `
    type Query{
      lucas: User!
      avaliation: Avaliacao!
      comentario: Comentario!
      usuarios: [User!]!
      avaliacoes: [Avaliacao!]!
      comentarios: [Comentario!]!
      
    }
    type User{
      id: ID!
      nome: String!
      email: String!
      idade: Int!
    }
    type Avaliacao{
      id: ID!
      titulo: String!
      avaliacao: Int!
    }
    type Comentario{
      id:ID!
      texto: String!
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
    avaliation() {
      return {
        titulo: 'Achei legal',
        avaliacao: 5,
      }
    },
    comentario() {
      return {
        texto: 'Podia ser melhor',
      }
    },
    avaliacoes(parent, args, ctx, info) {
      return rates
    },
    usuarios(parent, args, ctx, info) {
      return usuarios
    },
    comentarios(parent, args, ctx, info) {
      return comentarios
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
