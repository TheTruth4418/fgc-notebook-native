import React, {useEffect} from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import { logoutUser,fetchUser,fetchGames } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Home(props){
    useEffect(() => {
        props.fetchUser();
      }, []);

      const [state, setState] = React.useState({ game : 0 })

      const createPress = () => {
        props.navigation.navigate('Create',{
            gameId: state.game,
            game: props.games[state.game]
        })
      }

      const viewPress = () => {
        props.navigation.navigate('View', {
            gameId: state.game,
            game: props.games[state.game]
        })
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
                <Text>{game}</Text>
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
                <TouchableOpacity onPress={prevGame}>
                    <Text >PREV. GAME</Text>
                </TouchableOpacity>
                <Text>Choose Your Destiny.</Text>
                {arr[state.game]}
                <TouchableOpacity onPress={nextGame}>
                    <Text >NEXT GAME</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <View>
            {props.currentUser ?
             <><Text>Welcome {props.currentUser.username}!</Text>{props.games ? gamesList() :
              <Text> Loading Games.... </Text>}
              <Button title="Logout" onPress={props.logoutUser} /></> 
              :<Login/>}
            
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