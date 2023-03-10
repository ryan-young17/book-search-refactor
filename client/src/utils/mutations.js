import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: Params!) {
        saveBook(input: $input) {
            _id
            email
            password
            username
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation DeleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
            _id
            email
            username
            password
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;