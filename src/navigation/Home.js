import React, {Component} from 'react';
import { Text, View, Button } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import Signup from '../accounts/Signup';
import { logoutUser } from '../redux/actions';

function Home(props){
    return (
        <View>
            {props.currentUser ? <> 
                <Text>Welcome back User!</Text>
                <Button title="Logout" onPress={props.logoutUser} /> </> : <Login/>}

        </View>
    )
}

const MSTP = state => {
    return {
        currentUser: state.user
    }
}

const MDTP = dispatch => {
    return {
        logoutUser: () => {
            localStorage.clear()
            dispatch(logoutUser())
        }
    }
} 

export default connect(MSTP, MDTP)(Home)