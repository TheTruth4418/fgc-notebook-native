import React, {useEffect, useState} from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import { logoutUser,fetchUser,fetchGames } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';



function Home(props){
    useEffect(() => {
        props.fetchUser();
      }, []);

      const [state, setState] = React.useState({ game : 0 })

      const createPress = () => {
        props.navigation.navigate('Create')
      }

      const viewPress = () => {
        props.navigation.navigate('View')
      }

      const nextGame = () => {
        state.game === Object.keys(props.games).length-1 ? setState({ game: 0 }) : setState({ game: state.game+1 })
      }

      const prevGame = () => {
        state.game === 0 ? setState({ game: Object.keys(props.games).length-1 }) : setState({ game: state.game-1 })
      }

    const gamesList = () => {
        let arr = []
        Object.keys(props.games).forEach(game => {
            arr.push(<View key={game}>
                <Text >{game}</Text>
                <TouchableOpacity onPress={createPress}>
                    <Text >CREATE NOTES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={viewPress} >
                    <Text >VIEW NOTES</Text>
                </TouchableOpacity>
            </View>)
        })
        return(
            <>
                <Text>Choose Your Destiny.</Text>
                {arr[state.game]}
            </>
        )
    }

    return (
        <View>
            {props.currentUser ? <> 
                <Text>Welcome back {props.currentUser.username}!</Text>
                {props.games ? <>
                                    <TouchableOpacity onPress={prevGame} >
                                        <Text >PREV. GAME</Text>
                                    </TouchableOpacity>
                                        {gamesList()}
                                    <TouchableOpacity onPress={nextGame} >
                                        <Text >NEXT GAME</Text>
                                    </TouchableOpacity>
                               </> : <Text> Loading Games.... </Text>}
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