const { model, Schema } = require("mongoose")

const profileSchema = new Schema({
        username: String,
        dob: String,
        mobile: String,
        pic: String,
        gender: String,
        following: [
                {
                hide: Boolean,
                username: String
                }
        ],
        followedBy: [
                {
                hide: Boolean,
                username: String
                }
        ],
        joinedAt: String
})

module.exports = model('Profile', profileSchema)