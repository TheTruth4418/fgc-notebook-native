import React from 'react';
import { connect } from 'react-redux';
import NoteCards from './noteCards';

function MuNote(props){
    const data = props.data
    return (
        <>
            <NoteCards data={props.data} type="mu"/>
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

    }
} 

export default connect(MSTP, MDTP)(MuNote)