import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

function CreateNote(props){
    let gameId = props.route.params.gameId
    let game = Object.keys(props.games)[gameId]
    return (
        <View>
            <Text>{`Create mode for ${game}`}</Text>
        </View>
    )
}

const MSTP = state => {
    return {
        games: state.games
    }
}

export default connect(MSTP)(CreateNote)