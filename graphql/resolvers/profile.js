const { AuthenticationError, UserInputError } = require('apollo-server')

const Profile = require('../../models/Profile')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query:{
        async getProfiles(){
            try{
                const profiles = await Profile.find()
                // console.log(profiles)
                return profiles
            }catch(err){
                throw new Error(err)
            }
        },
        async getProfile(_, { username }){
            try{
                const profile = await Profile.findOne({ username })
                if(profile){
                    return profile
                }else{
                    throw new Error('Profile not found')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async editProfile(_, {profileId, dob, mobile, pic, gender }, context){
            const { username } = checkAuth(context)

            console.log(dob, mobile, pic, gender)

            try{
                const update = {
                            dob:false,
                            mobile:false,
                            pic:false,
                            gender:false};
                const filter = {username}

                if(dob) update.dob = dob
                if(mobile) update.mobile = mobile
                if(pic) update.pic = pic
                if(gender) update.gender = gender
                const profile = await Profile.findOneAndUpdate(filter, update, {
                    new: true
                })
                return profile
                
            }catch(err){
                throw new Error(err)
            }
        }
        // async followUser(_, body, context){

        // }
    }
}