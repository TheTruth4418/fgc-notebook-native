import React, {useEffect, useState} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CharNoteViewer from './charNoteViewer';
import MuNoteViewer from './muNoteViewer';


function Viewer(props){

    console.log(props.data)

    return (
        <>
            {props.data.form === "Character" ? <CharNoteViewer data={props.data}/> : <MuNoteViewer data={props.data}/>}
        </>
    )
}

const MSTP = state => {
    return {
        
    }
}

const MDTP = dispatch => {
    return {
        
    }
} 

export default connect(MSTP, MDTP)(Viewer)