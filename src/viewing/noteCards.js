import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import BulletPointForm from "../bulletPoints/bulletPointForm"
import { connect } from "react-redux"
import { postBulletPoint, deletePoint, postEditedBulletPoint } from '../redux/actions'
import EditBulletPointForm from '../bulletPoints/editBulletPointForm'

function NoteCards(props){
    const data = props.data
    console.log(data)

    const submit = (input) => {
        input.type = props.type
        props.postBulletPoint(input,data)
        //Send the data from the state and the report
    }

    const submitEdit = (input) => {
        input.type = props.type
        console.log(input)
        props.postEditedBulletPoint(input,data)
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
                        <EditBulletPointForm  point={point} data={data} onSubmit={submitEdit}/>
                        <TouchableOpacity onPress={()=>props.deletePoint(point.id, data)}>
                            <Text>Delete Point</Text>
                        </TouchableOpacity>
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
        return(<Text>No notes found for credentials</Text>)
    }
}

const MSTP = state => {
    return {
        note: state.current_note
    }
}

const MDTP = dispatch => {
    return {
        postBulletPoint: (pointObj, currentNote) => dispatch(postBulletPoint(pointObj, currentNote)),
        deletePoint: (pointObj, currentNote) => dispatch(deletePoint(pointObj, currentNote)),
        postEditedBulletPoint: (pointObj, currentNote) => dispatch(postEditedBulletPoint(pointObj, currentNote))
    }

} 

export default connect(MSTP, MDTP)(NoteCards)