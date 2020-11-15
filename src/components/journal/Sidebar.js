import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/actionsAuth'
import { startNewNote } from '../../actions/actionsNotes'

import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    
    const dispatch = useDispatch()
    const { auth }  = useSelector(state => state)
    
    const handeLogout = () => {
        dispatch(startLogout());
    }

    const handleAddNew = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className="journal_side-bar">
            <div className="journal_side-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {`${ auth.name }`} </span>
                </h3>

                <button className="btn" onClick={ handeLogout } >
                    Cerrar Sesión
                </button>
            </div>

            <div  className="journal_new-entry" onClick={ handleAddNew } > 
                <i className="far fa-calendar-plus fa-5x" ></i>
                <p className="mt-5">
                    Nueva entrada
                </p>
            </div>

            <JournalEntries />

        </aside>
    )
}
