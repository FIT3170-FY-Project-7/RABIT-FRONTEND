import { JoinLeftTwoTone } from '@mui/icons-material'
import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../../api'
import { UserContext } from './UserContext'

// JWT OBJECT INTERFACE, here for reference and later use
// interface IJWT {
//     iss: string
//     aud: string
//     auth_time: string
//     user_id: string
//     sub: string
//     iat: string
//     exp: string
//     email: string
//     email_verified: boolean
//     firebase: {
//         identities: {
//             email: string[]
//         }
//         sign_in_provider: string
//     }
// }

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [jwt, setjwt] = useState<string | null>(null)
    const navigate = useNavigate()

    const login = (email: string, password: string) => {
        api.post('/user/login', { email, password }).then(
            response => {
                setjwt(response.data.jwt)
                localStorage.setItem('jwt', response.data.jwt);
                navigate('/management/profile')
            },
            error => {
                console.log(error)
                throw error
            }
        )
    }


    const enforceLogin = () => {
        var localJWT = localStorage.getItem('jwt')
        if (localJWT != null){
            setjwt(localJWT)
        }
        else{
            return false
        }
        return true
    }

    const logout = () => {
        setjwt(null)
        localStorage.removeItem('jwt');
        navigate('/login')
    }

    const signUp = (email: string, displayName:string, password: string) => {
        api.post('/user/signup', { email, displayName, password }).then(
            response => {
                setjwt(response.data.jwt)
                localStorage.setItem('jwt', jwt);
                navigate('/management/profile')
            },
            error => {
                console.log(error)
                throw error
            }
        )
    }

    const value = { jwt, login, logout, enforceLogin, signUp }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
