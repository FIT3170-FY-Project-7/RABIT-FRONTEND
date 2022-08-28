import { ReactNode, useState } from 'react'
import api from '../../api'
import { UserContext } from './UserContext'

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [jwt, setjwt] = useState<string | null>(null)
    const login = (email: string, password: string) => {
        api.post('/user/login', { email, password }).then(
            response => console.log(response.data),
            error => console.log(error)
        )
    }
    const logout = () => {
        setjwt(null)
    }

    const value = { jwt, login, logout }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
