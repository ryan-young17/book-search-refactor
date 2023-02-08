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

    type Query {
        getSingleUser(id: ID, username: String): User
    }

    type Mutation {
        # Add in controller methods here (createUser, login, saveBook, deleteBook)
    }
`

module.exports = typeDefs;