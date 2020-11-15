import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import Swal from 'sweetalert2'
import { types } from "../types/types"
import { finishLoading, startLoading } from './actionsUi'
import { noteLogout } from './actionsNotes'


export const startLoginEmailPassword = (email, password) => {
    
    return (dispatch) => {
        
        dispatch(startLoading())
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(login(user.uid , user.displayName)) 
                dispatch(finishLoading())
            })
            .catch(e =>{
                console.log(e)
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
            })
    }

}

export const startRegisterWithEmailPasswordName = (email, password, name) => {

  
    return( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async({ user }) => {
           await user.updateProfile({ displayName: name })
            dispatch(
                login(user.uid, user.displayName)
            )
        })
        .catch(e => {
            Swal.fire('Error', e.message, 'error')
        })

    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                const { uid, displayName } = user;
                dispatch( login(uid, displayName) )
            })
    }
}


export const login = (uid, displayName) => {

    return{
        type: types.login,
        payload: {
            uid, 
            displayName
        }
    }

}

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch( logout() )
        dispatch( noteLogout() );
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}