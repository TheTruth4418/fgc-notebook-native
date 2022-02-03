import React, {useEffect, useState} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MuNote(props){
    return (
        <Text>Matchup Note Viewer</Text>
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

export default connect(MSTP, MDTP)(MuNote)