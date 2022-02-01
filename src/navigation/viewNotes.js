import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import React, {useState} from 'react';
import { Picker } from 'react-native-web';

function ViewNotes(props){
    let gameId = props.route.params.gameId
    let game = Object.keys(props.games)[gameId]
    const characters = Object.keys(props.games[game])

    const [state, setState] = React.useState({
        game: game,
        form: "Character",
        character: "",
        opponent: "",
        title: ""
    });;

    const charsForm = () => {
        let arr = [];
        characters.forEach(char => {
            arr.push(<Picker.Item label={char} key={char} value = {char}/>)
        })
        return(arr)
    }

    const formSwitcher = () => {
        const modes = ['Character', 'Matchup']
        let switchForms = () => {
            state.form === modes[0] ? setState({ ...state, form: modes[1], character: "", opponent: "" }) : setState({ ...state, form: modes[0], character:"", opponent: "" }) 
        }
        return (
            <>
                <TouchableOpacity onPress={switchForms}>
                    <Text>{`Switch to ${state.form === modes[0] ? modes[1]: modes[0] } form`}</Text>
                </TouchableOpacity>
            </>
        )
    }

    const muForm = () => {
        return (
            <>
                <Picker
                    selectedValue={state.opponent}
                    onValueChange={(char, charIndex) =>
                        setState({
                            ...state,
                            opponent: char
                        })
                }>
                {charsForm()}
            </Picker>
            </>
        )
    }

    console.log(state)

    return (
        <View>
            <Text>{`View mode for ${game}`}</Text>
            {formSwitcher()}
            <Picker
                    selectedValue={state.character}
                    onValueChange={(char, charIndex) =>
                        setState({ ...state, character: char })
                }>
                {charsForm()}
            </Picker>
            {state.form === "Matchup" ? muForm() : null }
        </View>
    )
}


const MSTP = state => {
    return {
        games: state.games
    }
}

export default connect(MSTP)(ViewNotes)