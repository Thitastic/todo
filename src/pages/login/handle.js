import User from '../../middleware/users'
class Handle{
    static async login(_user){
        const user = await User.login(_user)
        if(user.length > 0) return user[0]
        else return 0
    }
}
export default Handle