import { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

function UserContext({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    //crate a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // login a user
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // logout
    const logOutUser = () => {
        setLoading(true);

        return signOut(auth);
    };

    // on auth change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentsUser) => {
            setUser(currentsUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const userInfo = {
        user,
        loading,
        setLoading,
        createUser,
        logInUser,
        logOutUser,
    };

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
}

export default UserContext;
