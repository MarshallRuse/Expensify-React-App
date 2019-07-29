import { firebase, googleAuthProvider } from '../../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    //redux-thunk
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    //redux-thunk
    return () => {
        return firebase.auth().signOut();
    }
}