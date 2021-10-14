import React, {Component} from 'react';
import {useState} from 'react';
import { Text, View,Input } from 'react-native';

function Signup(){
    const [state, setState] = useState({
        username : "",
        password : ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    return(
        <View>
            <Text>Signup:</Text>

            <Text>Gamertag</Text>
            <Input name ="username" placeholder="Gamertag" value={state.username} onChange={handleChange}/>

            <Text>Password</Text>
            <Input name ="password" placeholder="Password" value={state.password} onChange={handleChange}/>
        </View>
    )
}

export default Signup