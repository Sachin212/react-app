const Image = require('../../models/Image')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getImages(){
            try{
                const images = await Image.find()
                return images
            }catch (err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async addImage(_, { value, username }, context){
            const user = checkAuth(context)
            if(value.trim() === ''){
                throw new Error('Image value must not be empty')
            }
            
            if(username === user.username){
                const newImage = new Image({
                    value,
                    image: {
                        avatar: true,
                        src: value
                    }
                })
    
                const image = await newImage.save()

                return image
            }
        }
    }
}