const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input Params {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, input: Params!): User
        deleteBook(bookId: ID!): User
    }
`

module.exports = typeDefs;