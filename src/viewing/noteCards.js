import React from "react"
import { Text, View } from "react-native"
import BulletPointForm from "../bulletPoints/bulletPointForm"
import { connect } from "react-redux"
import { postBulletPoint } from '../redux/actions'

function NoteCards(props){
    const data = props.data

    const submit = (input) => {
        input.type = props.type
        props.postBulletPoint(input,data)
        //Send the data from the state and the report
    }

    let arr = []
    props.note.forEach(note => {
        console.log(note)
        let points = []
        if(note.bullet_points){
            note.bullet_points.forEach(point => {
                points.push(
                    <View key={point.description}>
                        <Text>{point.description}</Text>
                    </View>
                )
            })
        }
        arr.push(<View key={`${note.title}`}>
            <Text>{note.title}</Text>
            {points}
            <BulletPointForm noteId={note.id} onSubmit={submit}/>
            <Text>{"\n"}</Text>
        </View>)
    })
    if(arr.length !=0){
        return(arr)
    } else {
        return('No notes found for credentials')
    }
}

const MSTP = state => {
    return {
        note: state.current_note
    }
}

const MDTP = dispatch => {
    return {
        postBulletPoint: (pointObj, currentNote) => dispatch(postBulletPoint(pointObj, currentNote))
    }

} 

export default connect(MSTP, MDTP)(NoteCards)