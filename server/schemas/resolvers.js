const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (_parent, args, context) => {
            const { user } = context;
            const foundUser = await User.findOne({
                $or: [
                    { _id: user ? user._id : args.id },
                    { username: args.username }
                ]
            });
            return foundUser;
        }
    },
    Mutation: {
        createUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (_parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No profile found with this username!');
            }

            const correctPw =  await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book } },
                {
                    new: true,
                    runValidators: true
                }
            );
        },
        deleteBook: async (_parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: book } },
                { new: true }
            );
        }
    }
};

module.exports = resolvers;