import React from 'react';
import { connect } from 'react-redux';
import { fetchCharNotes } from '../redux/actions';
import NoteCards from './noteCards';

function CharNote(props){
    const data = props.data

    return (
        <>
            <NoteCards data={props.data} type="char"/>
        </>
    )
}

const MSTP = state => {
    return {
        note: state.current_note
    }
}

const MDTP = dispatch => {
    return {
        fetchCharNotes: (data) => dispatch(fetchCharNotes(data))
    }

} 

export default connect(MSTP, MDTP)(CharNote)

