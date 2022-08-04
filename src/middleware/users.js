import axios from 'axios'
class User {
    static async insert(_user){
        try {
            const response = await axios.post("http://localhost:1009/api/user/new", {user: _user})
            return response
        } catch (error) {
            console.error(error)
            return 0
        }
    }
    static getAll(){
        return new Promise((resolve, reject)=>{
            try{
                axios.get("http://localhost:1009/api/user").then((res)=>{
                    const data = res.data
                    resolve(
                        data.map(user=> ({
                            ...user
                        }))
                    )
                }).catch((err)=>{reject(err)})
            }catch(error){
                console.log(error)
            }
        })
    }
    static async findUsername(username){
        try {
            const res = await axios.get("http://localhost:1009/api/user/username/" + username)
            if(res.status === 200){
                return res.data
            }
        } catch (error) {
            console.error(error)
            return 0
        }
    }
    static async findEmail(email){
        try {
            const res = await axios.get("http://localhost:1009/api/user/email/" + email)
            if(res.status === 200){
                return res.data
            }
        } catch (error) {
            console.error(error)
            return 0
        }
    }

    static async loginToken(token){
        if(token === "") return 0
        try {
            const res = await axios.post("http://localhost:1009/api/user/login/token", {token: token})
            if(res.status === 200){
                return res.data
            }
        } catch (error) {
            console.error(error)
            return 0
        }
    }

    static async login(user){
        try {
            const res = await axios.post("http://localhost:1009/api/user/login/", {user: user})
            if(res.status === 200){
                return res.data
            }
        } catch (error) {
            console.error(error)
            return 0
        }
    }
    
    static async logOut(token){
        try {
            const res = await axios.post("http://localhost:1009/api/user/logout", {token: token})
            if(res.status === 200){
                return res.status
            }
        } catch (error) {
            console.error(error)
            return 0
        }
    }

}
export default User