const {gql} = require('apollo-server')

const typeDefs = gql`
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    type Profile{
        id: ID!
        username: String!
        dob: String!
        mobile: String!
        pic: String!
        gender: String!
        joinedAt: String!
        following: [Following]!
        followedBy: [FollowedBy]!
        followerCount: Int!
    }
    type Following {
        id: ID!
        hide: Boolean!
        username: String!
    }
    type FollowedBy {
        id: ID!
        hide: Boolean!
        username: String!
    }
    type Image{
        id: ID!
        value: String!
        image: Pic!
    }
    type Pic{
        id: ID!
        avatar: Boolean!
        src: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUserPost(username: String!): [Post]
        getProfiles: [Profile]
        getProfile(username: String!): Profile
        getImages: [Image]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        editProfile(dob: String, mobile: String, pic: String, gender: String): Profile!
        addImage(value: String!, username: String!): Image!
        followUser(username: String!): Profile!
    }
    type Subscription{
        newPost: Post!
    }
`
module.exports = typeDefs