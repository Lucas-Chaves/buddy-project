import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// dummy data
const usuarios = [
  {
    id: '1',
    nome: 'Lucas luiz',
    email: 'Upaltasaventuras@gmail.com',
    idade: 25,
  },
  {
    id: '2',
    nome: 'Lucas humanas',
    email: 'Upaltasaventuras2@gmail.com',
    idade: 25,
  },
  {
    id: '3',
    nome: 'Lucas jorge',
    email: 'Upaltasaventuras3@gmail.com',
    idade: 25,
  },
]

const rates = [
  {
    id: '11',
    titulo: 'Achei legal',
    avaliacao: 5,
    autor: '1',
  },
  {
    id: '12',
    titulo: 'Achei legal',
    avaliacao: 5,
    autor: '2',
  },
  {
    id: '13',
    titulo: 'Achei legal',
    avaliacao: 5,
    autor: '3',
  },
]

const comentarios = [
  {
    id: '101',
    texto: 'Podia ser melhor',
    autor: '1',
    avaliacao: '11',
  },
  {
    id: '102',
    texto: 'Podia ser melhor',
    autor: '2',
    avaliacao: '11',
  },
  {
    id: '103',
    texto: 'Podia ser melhor',
    autor: '1',
    avaliacao: '12',
  },
]

// Definição dos Tipos
const typeDefs = `
    type Query{
      usuario: User!
      avaliation: Avaliacao!
      comentario: Comentario!
      usuarios: [User!]!
      avaliacoes: [Avaliacao!]!
      comentarios: [Comentario!]!
      
    }
    type Mutation{
      createUser(
        nome: String!
        email: String!
        idade: Int!
      ): User!
      createComentario(
        texto: String!
        autor: ID!
        avaliacao: ID!
      ): Comentario!
      
    }
    type User{
      id: ID!
      nome: String!
      email: String!
      idade: Int!
      avaliacoes: [Avaliacao!]!
      comentarios: [Comentario!]!
    }
    type Avaliacao{
      id: ID!
      titulo: String!
      avaliacao: Int!
      autor: User!
      comentarios: [Comentario!]!
    }
    type Comentario{
      id:ID!
      texto: String!
      autor: User!
      avaliacao: Avaliacao!
    }
    `

const resolvers = {
  Query: {
    usuario() {
      return {
        id: '4',
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const user = {
        id: uuidv4(),
        nome: args.nome,
        email: args.email,
        idade: args.idade,
      }
      usuarios.push(user);
      return user;
    },
    createComentario(parent, args, ctx, info) {
      const comentario = {
        id: uuidv4(),
        ...args,
      }
      comentarios.push(comentario);

      return comentario;
    },
  },
  Avaliacao: {
    autor(parent, args, ctx, info) {
      return usuarios.find(usuario => {
        return usuario.id === parent.autor
      })
    },
    comentarios(parent, args, ctx, info) {
      return comentarios.filter(comentario => {
        return comentario.autor === parent.id
      })
    },
  },
  User: {
    avaliacoes(parent, args, ctx, info) {
      return rates.filter(avaliacao => {
        return avaliacao.autor === parent.id
      })
    },
    comentarios(parent, args, ctx, info) {
      return comentarios.filter((comment) => {
        return comment.autor === parent.id
      })
    },
  },
  Comentario: {
    autor(parent, args, ctx, info) {
      return usuarios.find((usuario) => {
        return usuario.id === parent.autor
      })
    },
    avaliacao(parent, args, ctx, info) {
      return rates.find(rate => {
        return rate.id === parent.avaliacao
      })
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
