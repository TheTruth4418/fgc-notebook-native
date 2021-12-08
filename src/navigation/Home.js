import React, {Component} from 'react';
import { Text, View } from 'react-native';
import Login from '../accounts/Login';
import Signup from '../accounts/Signup';

export default function Home(){
    return (
        <View>
            {localStorage.token ? <Text>Welcome back User!</Text> : <Login/>}
        </View>
    )
}