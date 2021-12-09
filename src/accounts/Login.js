import React, {Component} from 'react';
import { postLogin } from '../redux/actions';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

function Login(props){
    const [state, setState] = React.useState({
        username : "",
        password : "",
        email: ""
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

    const login = () => {
        props.postLogin(state)
    }

    const signup = () => {
        console.log(state, localStorage)
    }

    return(
        <View>
            <Text>Signup/Login to get Started</Text>

            <Text>Email (Not required for exsisting users)</Text>
            <TextInput name ="email" id="email" placeholder="Email" onChangeText={(value)=>handleEmail(value)}/>

            <Text>Gamertag</Text>
            <TextInput name ="username" id="username" placeholder="Gamertag" onChangeText={(value)=>handleUsername(value)}/>

            <Text>Password</Text>
            <TextInput name ="password" secureTextEntry={true} id="password" placeholder="Password" onChangeText={(value)=>handlePassword(value)}/>

            <TouchableOpacity onPress={login} className="button">
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={signup} className="button">
                <Text>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

const MDTP = dispatch => {
    return {
        postLogin: (state) => dispatch(postLogin(state))
    }
} 

export default connect(null, MDTP)(Login);
