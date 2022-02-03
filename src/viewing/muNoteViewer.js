import React, {useEffect, useState} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { noteCards } from './noteCards';

function MuNote(props){
    const data = props.data
    return (
        <>
            {noteCards(props.note)}
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