import { createContext, useContext } from 'react'

interface IContext {
    login: (email: string, password: string) => void
    logout: () => void
    enforceLogin: () => void
    jwt: string
}
export const UserContext = createContext<IContext>(null)

export const useUserContext = () => useContext(UserContext)
