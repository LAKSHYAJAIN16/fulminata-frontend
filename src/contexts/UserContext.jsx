import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [loggedin, setLoggedin] = useState(false);

    return (
        <>
            <UserContext.Provider value={{
                user,
                setUser,
                loggedin,
                setLoggedin
            }}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}