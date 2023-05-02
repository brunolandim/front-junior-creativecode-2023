import React, { createContext, useState, ReactNode } from "react";

interface IAuthContext {
    userEmail: string,
    name: string,
    setUserEmail: React.Dispatch<React.SetStateAction<string>>,
}


export const AuthContext = createContext<IAuthContext>({
    userEmail: '',
    name: '',
    setUserEmail: () => { },
});


const AuthProvider = ({ children }: any) => {
    const [userEmail, setUserEmail] = useState<string>('');
    const name = 'Fulano'

    return (
        <AuthContext.Provider value={{ userEmail, setUserEmail, name }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;