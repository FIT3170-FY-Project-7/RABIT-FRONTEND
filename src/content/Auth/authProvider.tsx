import { AuthProvider } from 'react-admin'
import api from '../../api'
interface JWT {
    iss: string
    aud: string
    auth_time: string
    user_id: string
    sub: string
    iat: string
    exp: string
    email: string
    email_verified: boolean
    firebase: {
        identities: {
            email: string[]
        }
        sign_in_provider: string
    }
}
export const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        console.log('hello')
        api.post('/user/login', { email, password }).then(
            response => console.log(response.data),
            error => console.log(error)
        )
        return Promise.resolve()

        // const request = new Request('http://localhost:8000/user/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email,
        //         password: password
        //     })
        // })
        // return fetch(request)
        //     .then(auth => {
        //         let jwtObj: JWT = jwtDecode(JSON.stringify(auth))
        //         localStorage.setItem('user_id', jwtObj.user_id)
        //         return Promise.resolve()
        //     })
        //     .catch((e: Error) => {
        //         console.log(e)
        //         return Promise.reject()
        //     })
    },

    logout: () => {
        localStorage.removeItem('user_id')
        return Promise.resolve()
    },
    checkAuth: () => (localStorage.getItem('user_id') ? Promise.resolve() : Promise.reject()),
    checkError: error => {
        // To do: check for certain error codes that log the user out.
        return Promise.resolve()
    },
    getIdentity: () =>
        // should be filled out with values from database api call
        Promise.resolve({
            id: localStorage.getItem('user_id')
        }),
    getPermissions: () => Promise.resolve('')
}

export default authProvider
