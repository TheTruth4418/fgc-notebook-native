import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Picker } from 'react-native-web';

function CreateNote(props){
    let gameId = props.route.params.gameId
    let game = Object.keys(props.games)[gameId]
    const characters = Object.keys(props.games[game])
    const [selectedCharacter, setSelectedCharacter] = useState();

    const charsForm = () => {
        let arr = [];
        characters.forEach(char => {
            arr.push(<Picker.Item label={char} key={char} value = {char}/>)
        })
        return(arr)
    }

    return (
        <View>
            <Text>{`Create mode for ${game}`}</Text>
            <Picker
                    selectedValue={selectedCharacter}
                    onValueChange={(char, charIndex) =>
                        setSelectedCharacter(char)
                }>
                {charsForm()}
            </Picker>
        </View>
    )
}

const MSTP = state => {
    return {
        games: state.games
    }
}

export default connect(MSTP)(CreateNote)