const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        getSingleUser: async (_parent, args, context) => {
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
        createUser: async (username, email, password) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;