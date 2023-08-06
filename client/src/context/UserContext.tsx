import { ReactNode, createContext, useContext, useState } from "react";
import User from "./user";

const user_default:User = {
    name: "ABC",
    id: "a12345",
    role: "student"
}

type UserContextType = {
    user: User | null,
    setUser: Function
}

type props = {
    children: JSX.Element | JSX.Element[]
}


export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({children} : props){
    const [user, setUser] = useState<User | null>(user_default)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}    
        </UserContext.Provider>
    )
}