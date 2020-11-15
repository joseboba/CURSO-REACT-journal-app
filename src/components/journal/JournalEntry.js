import React from 'react'
import moment from 'moment'
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/actionsNotes';
export const JournalEntry = ({ id, title, body, url, date }) => {
    
    const dispatch = useDispatch();
    
    const noteDate = moment(date);
    
    const note = {
        title,
        body, 
        url, 
        date
    }

    const handleEntryClick  = (e) => {
        e.preventDefault();
        dispatch(activeNote( id, note ))
    }

    return (
        <div  className="journal__entry pointer animate__animated animate__backInLeft" onClick={ handleEntryClick }>

        {    
            url && 

            <div className="journal__entry-picture" style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}>
            
            </div>
        }
            <div className="journal__entry-body" >
                <p className="journal__entry-title"> { title } </p>
                <p className="journal__entry-content"> { body } </p>
            </div>

            <div className="journal__entry-date-box">
                <span> { noteDate.format('MMMM, dddd ') } </span>
                <h4>{ noteDate.format('DD') }</h4>
            </div>
        </div>
    )
}
