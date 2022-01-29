import React, {useEffect} from 'react';
import { Text, View, Button } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import { logoutUser,fetchUser } from '../redux/actions';

function Home(props){
    useEffect(() => {
        props.fetchUser()
      }, []);
    return (
        <View>
            {props.currentUser ? <> 
                <Text>Welcome back {props.currentUser.username}!</Text>
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
        },
        fetchUser: () => { dispatch(fetchUser()) }
    }
} 

export default connect(MSTP, MDTP)(Home)