import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


function BulletPointForm(props){
    const [state, setState] = React.useState({
        description: "",
        render: false,
        id: props.noteId 
    })

    const handleText= (input) => {
        setState({
            ...state,
            description: input
        })
    }

    const submit = () => {
        setState({
            ...state,
            render:false,
            id: props.noteId
        })
        props.onSubmit(state)
    }

    const render = () => {
        if(state.render === false){
            return (<View>
                        <TouchableOpacity onPress={()=>setState({...state, render:true, description:""})}>
                            <Text>New Point</Text>
                        </TouchableOpacity>
                    </View>)
        } else {
            return (<View>
                        <TextInput name ="description" id="description" placeholder="Type in bullet point" onChangeText={(value)=>handleText(value)}/>
                        <TouchableOpacity onPress={submit} className="button">
                            <Text>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setState({...state,render:false,description: ""})} className="button">
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>)
        }  
    
    }


    return(<>
        {render()}
    </>
    )
}

const MDTP = dispatch => {
    return {
        
    }
} 

export default connect(null, MDTP)(BulletPointForm);