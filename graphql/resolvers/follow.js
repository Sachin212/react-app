const Profile = require('../../models/Profile')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation: {
        followUser: async (_, { username }, context) =>{
            const user = checkAuth(context)

            const profile_following = await Profile.findOne({username})

            const self_profile = await Profile.findOne({username: user.username})

            if(user.username === username){
                throw new Error("Cannot Follow self")
            }else{
                if(profile_following && self_profile){
                        // If following unfollow
                    if(profile_following.followedBy.find( follow => follow.username === user.username)){
                        profile_following.followedBy = profile_following.followedBy.filter(follow => follow.username !== user.username)
                        self_profile.following = self_profile.following.filter(follow => follow.username !== username)
                    }else{
                        //Not following Follow
                        profile_following.followedBy.unshift({
                            hide: false,
                            username: user.username
                        })
                        self_profile.following.unshift({
                            hide: false,
                            username: username
                        })
                    }
                    await self_profile.save()
                    await profile_following.save()
                    return profile_following
                }else{
                    throw new Error("Profile Not Found")
                }
            }
        }
    }
}
