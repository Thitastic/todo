import User from '../../middleware/users'
class Handle{
    /**
     * 
     * @param {*} user 
     * @returns token
     */
    static async newUser(_user){
        const user =  await User.insert(_user)
        return user.data[0]
    }

    static async getAll(){
        return await User.getAll()
    }

    static async findUsername(username){
        const user = await User.findUsername(username)
        if(user.length > 0) return user[0]
        else return 0
    }
    
    static async findEmail(email){
        const user = await User.findEmail(email)
        if(user.length > 0) return user[0]
        else return 0
    }
}
export default Handle