import React, { createContext, useReducer } from "react";

const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case "authentication": {
            return {
                ...state,
                accessToken: action.accessToken,
            };
        }
        case "logout": {
            return {};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}
const getLocalStorage = () => {
    const auth = localStorage.getItem('user');
    if (!auth) return null;

    return JSON.parse(auth);
};

function AuthProvider({ children }) {
    const auth = getLocalStorage() ?? {};
    const [state, dispatch] = useReducer(authReducer, auth);
    const value = { state, dispatch };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useLogin() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useLogin must be used within a AuthProvider");
    }
    return context;
}

export default { AuthProvider, useLogin };

