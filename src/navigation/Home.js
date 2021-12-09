import React, {Component} from 'react';
import { Text, View } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import Signup from '../accounts/Signup';

function Home(props){
    return (
        <View>
            {props.currentUser ? <Text>Welcome back User!</Text> : <Login/>}
        </View>
    )
}

const MSTP = state => {
    return {
        currentUser: state.user
    }
}

export default connect(MSTP)(Home)