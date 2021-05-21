const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')
const profileResolvers = require('./profile')
const imageResolvers = require('./image')
const followResolvers = require('./follow')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Profile: {
        followerCount: (parent) => parent.followedBy.length
    },
    Query: {
        ...postsResolvers.Query,
        ...profileResolvers.Query,
        ...imageResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...profileResolvers.Mutation,
        ...imageResolvers.Mutation,
        ...followResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}
