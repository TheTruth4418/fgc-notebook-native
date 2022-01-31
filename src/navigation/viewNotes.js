import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

function ViewNotes(props){
    let gameId = props.route.params.gameId
    let game = Object.keys(props.games)[gameId]
    console.log(props)
    return (
        <View>
            <Text>{`View mode for ${game}`}</Text>
        </View>
    )
}


const MSTP = state => {
    return {
        games: state.games
    }
}

export default connect(MSTP)(ViewNotes)