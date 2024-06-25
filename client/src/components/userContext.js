import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://seek-safe-work.vercel.app/profile', {
            credentials: 'include',
        })
            .then((res) => {
                res.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setIsLoading(false);
                })
            })
            .catch(error => {
                setIsLoading(false);
                console.log("Fetch error:", error);
            })

    }, [])

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}
