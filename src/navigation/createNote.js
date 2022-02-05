import { Text, View,TextInput } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Picker, TouchableOpacity } from 'react-native-web';
import { postCharNote, postMuNote } from '../redux/actions';

function CreateNote(props){
    let gameId = props.route.params.gameId
    let game = Object.keys(props.games)[gameId]
    const characters = Object.keys(props.games[game])
    const [state, setState] = React.useState({
        game: game,
        form: "Character",
        character: "",
        opponent: "",
        title: ""
    });

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
            state.form === modes[0] ? setState({ ...state, form: modes[1], opponent: "" }) : setState({ ...state, form: modes[0], opponent: "" }) 
        }
        return (
            <>
                <TouchableOpacity onPress={switchForms}>
                    <Text>{`Switch to ${state.form === modes[0] ? modes[1]: modes[0] } form`}</Text>
                </TouchableOpacity>
            </>
        )
    }

    const handleNote = (input) => {
        setState({
            ...state,
            title: input
        })
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

    const handleSubmit = () => {
        state.form === "Character" ? props.postCharNote(state) : props.postMuNote(state)
    }

    return (
        <View>
            <Text>{`Create mode for ${game}`}</Text>
            {formSwitcher()}
            <Picker
                    selectedValue={state.character}
                    onValueChange={(char, charIndex) =>
                        setState({
                            ...state,
                            character: char
                        })
                }>
                {charsForm()}
            </Picker>
            {state.form === "Matchup" ? muForm() : null }
            <TextInput name ="note" id="note" placeholder="Type Note here!" onChangeText={(value)=>handleNote(value)}/>
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Submit!</Text>
            </TouchableOpacity>
        </View>
    )
}

const MSTP = state => {
    return {
        games: state.games
    }
}

const MDTP = dispatch => {
    return {
        postCharNote: (state) => dispatch(postCharNote(state)),
        postMuNote: (state) => dispatch(postMuNote(state))
    }
} 

export default connect(MSTP, MDTP)(CreateNote)