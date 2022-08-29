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

    const login = (email: string, password: string) => {
        api.post('/user/login', { email, password }).then(
            response => {
                setjwt(response.data.jwt)
            },
            error => {
                console.log(error)
                throw error
            }
        )
    }

    const enforceLogin = () => {
        const navigate = useNavigate()
        if (!jwt) {
            navigate('/login')
        }
    }

    const logout = () => {
        setjwt(null)
    }

    const value = { jwt, login, logout, enforceLogin }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
