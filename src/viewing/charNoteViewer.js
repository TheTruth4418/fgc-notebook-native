import React, {useEffect, useState} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

