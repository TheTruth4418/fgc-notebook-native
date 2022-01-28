import React, {Component} from 'react';
import { postLogin, postSignup } from '../redux/actions';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-web';
function Login(props){
    const [state, setState] = React.useState({
        username : "",
        password : "",
        email: "",
        form: "Login"
    })

    const handleUsername = (input) => {
        console.log(input)
        setState({
            ...state,
            username: input
        })
    }

    const handlePassword = (input) => {
        console.log(input)
        setState({
            ...state,
            password: input
        })
    }

    const handleEmail = (input) => {
        console.log(input)
        setState({
            ...state,
            email: input
        })
    }

    const postForm = () => {
        if(state.form != "Login" && state.form != "Signup"){
            alert("Nice try")
            setState({
                username : "",
                password : "",
                email: "",
                form: "Login" 
            })
        }else{
            state.form === "Login" ? props.postLogin(state) : props.postSignup(state);
        }
    }

    const form = () => {
        state.form === "Login" ? setState({...state, form:"Signup"}) : setState({...state, form:"Login"})
    }

    return(
        <View>
            <Text>Signup/Login to get Started</Text>

            <TouchableOpacity onPress = {form}>
                <Text>Change</Text>
            </TouchableOpacity>

            { state.form === "Signup" ? <><Text>Email (Not required for exsisting users)</Text>
            <TextInput name ="email" id="email" placeholder="Email" onChangeText={(value)=>handleEmail(value)}/></> : null}

            <Text>Gamertag</Text>
            <TextInput name ="username" id="username" placeholder="Gamertag" onChangeText={(value)=>handleUsername(value)}/>

            <Text>Password</Text>
            <TextInput name ="password" secureTextEntry={true} id="password" placeholder="Password" onChangeText={(value)=>handlePassword(value)}/>

            <TouchableOpacity onPress={postForm} className="button">
                <Text>{state.form}</Text>
            </TouchableOpacity>
        </View>
    )
}

const MDTP = dispatch => {
    return {
        postLogin: (state) => dispatch(postLogin(state)),
        postSignup: (state) => dispatch(postSignup(state))
    }
} 

export default connect(null, MDTP)(Login);
