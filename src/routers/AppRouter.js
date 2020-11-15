import React, { useEffect, useState } from 'react'
import { firebase } from '../firebase/firebase-config'
import {BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux'
import { login } from '../actions/actionsAuth'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoute } from './PrivateRoutes'
import { startLoadingNotes } from '../actions/actionsNotes'

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [cecking, setCecking] = useState(true)
    const [isLoggedin, setIsLoggedin] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if(user?.uid){
                dispatch(login( user.uid, user.displayName ));
                setIsLoggedin(true);
                dispatch(startLoadingNotes(user.uid))
            }else{
                setIsLoggedin(false)
            }
            setCecking(false);

        })
    }, [dispatch, setCecking, setIsLoggedin])

    if( cecking ){
        return(
            <h1> Espere... </h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes path="/auth" component={ AuthRouter }  isAuthenticated={ isLoggedin }  />
                    <PrivateRoute exact path="/" component={ JournalScreen } isAuthenticated={ isLoggedin } />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
