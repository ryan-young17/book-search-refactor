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
        me(id: ID, username: String): User
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
        saveBook(input: Params): User
        deleteBook(userId: ID!, book: String!): User
    }
`

module.exports = typeDefs;