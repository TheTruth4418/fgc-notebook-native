import React, {Component} from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

function Login(){
    const [state, setState] = React.useState({
        username : "",
        password : ""
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

    const login = () => {
        console.log(state)
    }

    const signup = () => {
        console.log(state)
    }

    return(
        <View>
            <Text>Login:</Text>

            <Text>Gamertag</Text>
            <TextInput name ="username" id="username" placeholder="Gamertag" onChangeText={(value)=>handleUsername(value)}/>

            <Text>Password</Text>
            <TextInput name ="password" secureTextEntry={true} id="password" placeholder="Password" onChangeText={(value)=>handlePassword(value)}/>

            <TouchableOpacity onPress={login}>
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={signup}>
                <Text>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
