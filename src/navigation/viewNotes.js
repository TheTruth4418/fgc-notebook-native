import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import { Picker } from 'react-native-web';
import CharNoteViewer from '../viewing/charNoteViewer';
import MuNoteViewer from '../viewing/muNoteViewer'
import { fetchCharNotes, fetchMuNotes, refreshCurrentNote } from '../redux/actions';

function ViewNotes(props){
    let gameId = props.route.params.gameId
    let game = Object.keys(props.games)[gameId]
    const characters = Object.keys(props.games[game])

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

    const muForm = () => {
        return (
            <>
                <Picker
                    selectedValue={state.opponent}
                    onValueChange={(char, charIndex) =>
                        {
                            setState({...state, opponent: char})
                            onOppChange({...state, opponent: char})
                        }
                }>
                {charsForm()}
            </Picker>
            </>
        )
    }

    const muNoteReq = (data) => {
        props.fetchMuNotes(data)
    }

    const onCharChange = (data) => {
        if(state.form === "Character"){
            props.fetchCharNotes(data)
        } else if(state.opponent != ""){
            muNoteReq(data)
        } else {
            null
        }
    }

    const onOppChange = (data) => {
        if(state.character != ""){
            muNoteReq(data)
        }
    }

    const renderNotes = () => {
        if(state.form === "Character"){
            return (<CharNoteViewer data={state} />)
        } else {
            return (<MuNoteViewer data={state}/>)
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
            {props.note ? renderNotes() : <Text>Select Character(s) to get started!</Text>}
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