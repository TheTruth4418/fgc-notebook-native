import { Button,Text, View,TextInput } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Picker, TouchableOpacity } from 'react-native';
import { postCharNote, postMuNote } from '../redux/actions';

function CreateNote(props){
    let gameId = props.route.params.gameId  //Set the game Id that I passed in from Home, Will use to get the correct game
    let game = Object.keys(props.games)[gameId] //Sets the game so that I can submit data to the API
    const characters = Object.keys(props.games[game]) //Grabs the Characters from the store in order to utilize that data

    const [state, setState] = React.useState({
        game: game,
        form: "Character",
        character: "",
        opponent: "",
        title: ""
    });

//Steps through the array of characters and makes a form
    const charsForm = () => {
        let arr = [];
        characters.forEach(char => {
            arr.push(<Picker.Item label={char} key={char} value = {char}/>)
        })
        return(arr)
    }

//Switch in between viewing for a specific character or a matchup
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
//Event handler for the note title
    const handleNote = (input) => {
        setState({
            ...state,
            title: input
        })
    }
//If making a matchup note, renders another form for the Opponent
    const muForm = () => {
        return (
            <>
                <Picker selectedValue={state.opponent}
                        onValueChange={(char) =>
                        setState({ ...state, opponent: char }) }>
                {charsForm()}
            </Picker>
            </>
        )
    }
//Submit handler, using the data from the form, submit the form data to the API
    const handleSubmit = () => {
        state.form === "Character" ? props.postCharNote(state) : props.postMuNote(state)
    }

    return (
        <View>
            <Text>{`Create mode for ${game}`}</Text>
            {formSwitcher()}
            <Picker selectedValue={state.character}
                    onValueChange={(char) =>
                    setState({ ...state, character: char}) }>
                {charsForm()}
            </Picker>
            {/* Render the form for the opponent if the state of form is Matchup */}
            {state.form === "Matchup" ? muForm() : null }
            <TextInput name ="note" id="note" placeholder="Type Note here!" onChangeText={(value)=>handleNote(value)}/>
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Submit!</Text>
            </TouchableOpacity>
            <Button title="Go Back" onPress={() => props.navigation.navigate('Home')} />
        </View>
    )
}
//Need the games in order to grab the right game and make the correct form
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