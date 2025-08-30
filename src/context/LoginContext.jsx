import { createContext, useState } from "react"

export const LoginContext = createContext()

export default function LoginProvider({children}){
    const [nameLogin, setNameLogin] = useState("")
    const [jabatanLogin, setJabatanLogin] = useState("")

    return(
        <LoginContext.Provider value={{nameLogin, setNameLogin, jabatanLogin, setJabatanLogin}}>
            {children}
        </LoginContext.Provider>
    )
}