import React from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import { connect } from 'react-redux';


function EditBulletPointForm(props){
    const [state, setState] = React.useState({
        description: props.point.description,
        render: false,
        id: props.point.id 
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
            render:false
        })
        props.onSubmit(state)
        //props.postEditedBulletPoint(state,props.data)
    }

    const render = () => {
        if(state.render === false){
            return (<View>
                        <TouchableOpacity onPress={()=>setState({...state, render:true})}>
                            <Text>Edit Point</Text>
                        </TouchableOpacity>
                    </View>)
        } else {
            return (<View>
                        <TextInput value={state.description} name ="description" id="description" placeholder="Type in bullet point" onChangeText={(value)=>handleText(value)}/>
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

export default connect(null, MDTP)(EditBulletPointForm);