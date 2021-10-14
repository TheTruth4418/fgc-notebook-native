import React, {Component} from 'react';
import { Text, View } from 'react-native';
import Login from '../accounts/Login';
import Signup from '../accounts/Signup';

export default function Home(){
    return (
        <View>
            <Text>Signup/Login to get Started!</Text>
            <Login/>
        </View>
    )
}