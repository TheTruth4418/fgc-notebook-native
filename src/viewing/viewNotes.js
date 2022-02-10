import { Button,Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import { Picker } from 'react-native';
import { fetchCharNotes, fetchMuNotes, refreshCurrentNote } from '../redux/actions';
import NoteCards from './noteCards';

function ViewNotes(props){
    let gameId = props.route.params.gameId //Set the game Id that I passed in from Home, Will use to get the correct game
    let game = Object.keys(props.games)[gameId] //Sets the game so that I can submit data to the API
    const characters = Object.keys(props.games[game]).sort() //Grabs the Characters from the store in order to utilize that data

// Upon rendering makes sure there isnt previous data thats being rendered
    useEffect(() => {
        if(props.note){
            props.refreshCurrentNote();
        }
      }, []);

    const [state, setState] = React.useState({
        game: game,
        form: "Character",
        character: "",
        opponent: "",
        title: ""
    });;
//Create the form for the characters
    const charsForm = () => {
        let arr = [];
        characters.forEach(char => {
            arr.push(<Picker.Item label={char} key={char} value = {char}/>)
        })
        return(arr)
    }
//Switches the form between Chars and Matchups
    const formSwitcher = () => {
        const modes = ['Character', 'Matchup']
        let switchForms = () => {
            props.refreshCurrentNote()
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
//Form for opponent if we need it
    const muForm = () => {
        return (
            <>
                <Picker
                    selectedValue={state.opponent}
                    onValueChange={(char) => {
                            setState({...state, opponent: char})
                            onOppChange({...state, opponent: char})
                        }
                }>
                {charsForm()}
            </Picker>
            </>
        )
    }
// Sends API request for a specific matchup
    const muNoteReq = (data) => {
        props.fetchMuNotes(data)
    }
//Handles Character change and sends the API request if conditions are met
    const onCharChange = (data) => {
        if(state.form === "Character"){
            props.fetchCharNotes(data)
        } else if(state.opponent != ""){
            muNoteReq(data)
        } else {
            null
        }
    }
//Handles opponent change and sneds API request if conditions are met
    const onOppChange = (data) => {
        if(state.character != ""){
            muNoteReq(data)
        }
    }
// What renders the notes, pass in a type which helps the API request
    const renderNotes = () => {
        if(state.form === "Character"){
            return (<NoteCards type="char" data={state}/>)
        } else {
            return (<NoteCards type="mu"data={state}/>)
        }
    }

    return (
        <View>
            <Text>{`View mode for ${game}`}</Text>
            {formSwitcher()}
            <Picker
                    selectedValue={state.character}
                    onValueChange={(char, charIndex) =>{
                        setState({...state, character: char})
                        onCharChange({...state, character:char})
                    }

                }>
                {charsForm()}
            </Picker>
            {state.form === "Matchup" ? muForm() : null }
            {props.note ? renderNotes():<Text>Select Character(s) to get started!</Text>}
            <Button title="Go Back" onPress={() =>props.navigation.navigate('Home')} />
        </View>
    )
}


const MSTP = state => {
    return {
        games: state.games,
        note: state.current_note
    }
}

const MDTP = dispatch => {
    return {
        fetchCharNotes: (data) => dispatch(fetchCharNotes(data)),
        fetchMuNotes: (data) => dispatch(fetchMuNotes(data)),
        refreshCurrentNote: () => dispatch(refreshCurrentNote())
    }
}

export default connect(MSTP, MDTP)(ViewNotes)