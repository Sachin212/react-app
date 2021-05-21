const { model, Schema } = require("mongoose")

const imageSchema = new Schema({
    value: String,
    image: {
        avatar: Boolean,
        src: String
    }
})

module.exports = model('Image', imageSchema)