import React, {useEffect, useState} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCharNotes } from '../redux/actions';

function CharNote(props){
    useEffect(() => {
        props.fetchCharNotes(props.data);
      }, []);
    return (
        <Text>Character Note Viewer</Text>
    )
}

const MSTP = state => {
    return {

    }
}

const MDTP = dispatch => {
    return {
        fetchCharNotes: (data) => dispatch(fetchCharNotes(data))
    }

} 

export default connect(MSTP, MDTP)(CharNote)