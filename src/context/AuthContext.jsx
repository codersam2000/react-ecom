import {useState, useCallback, createContext} from 'react';

export const AuthContext = createContext();

const retrieveStoredToken = () => {
    // const token = localStorage.getItem('token');
    // const user  = JSON.parse(localStorage.getItem('user'));

    // return {
    //     token,
    //     user
    // }
}

const AuthContextProvider = ({children}) => {
    const tokenData = retrieveStoredToken();

    let initToken = null;
    let initUser = null;

    if (tokenData) {
        initToken = tokenData.token;
        initUser = tokenData.user
    }

    const [token, setToken] = useState(initToken);
    const [user, setUser] = useState(initUser);

    const isUserLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const loginHandler = (user, token) => {
        setToken(token);
        setUser(user);

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const authContext = {
        token: token,
        user: user,
        isUserLoggedIn: isUserLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value ={authContext}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider