import React, {useEffect} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import { logoutUser,fetchUser,fetchGames } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Home(props){
    useEffect(() => {
        props.fetchUser();
      }, []);

      const createPress = () => {
        props.navigation.navigate('Create')
      }

      const viewPress = () => {
        props.navigation.navigate('View')
      }

    const gamesList = () => {
        let arr = []
        Object.keys(props.games).forEach(game => {
            arr.push(<Text key={game}>{game}</Text>)
        })
        return(
            <>
                <Text>Choose Your Destiny.</Text>
                {arr}
            </>
        )
    }

    return (
        <View>
            {props.currentUser ? <> 
                <Text>Welcome back {props.currentUser.username}!</Text>
                {props.games ? gamesList() : <Text> Loading Games.... </Text>}
                <TouchableOpacity onPress={createPress} >
                    <Text>CREATE NOTES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={viewPress}>
                    <Text>VIEW NOTES</Text>
                </TouchableOpacity>
                <Button title="Logout" onPress={props.logoutUser} /> </> : <Login/>}
        </View>
    )
}

const MSTP = state => {
    return {
        currentUser: state.user,
        games: state.games
    }
}

const MDTP = dispatch => {
    return {
        logoutUser: () => {
            AsyncStorage.clear()
            dispatch(logoutUser())
        },
        fetchUser: () => { dispatch(fetchUser()) },
        fetchGames: () => {dispatch(fetchGames())}
    }
} 

export default connect(MSTP, MDTP)(Home)