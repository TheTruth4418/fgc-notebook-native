import React, {Component} from 'react';
import {useState} from 'react';
import { Text, View,TextInput, StyleSheet } from 'react-native';

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
            <TextInput style={styles.input} name ="username" placeholder="Gamertag" value={state.username} onChange={handleChange}/>

            <Text>Password</Text>
            <TextInput style={styles.input} name ="password" placeholder="Password" value={state.password} onChange={handleChange}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})

export default Signup