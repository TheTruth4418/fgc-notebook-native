import React, {useEffect} from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Login from '../accounts/Login';
import { connect } from 'react-redux';
import { logoutUser,fetchUser,fetchGames } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home(props){
// Upon Startup, run the fetch user to auto login
    useEffect(() => {
        props.fetchUser();
      }, []);

// Grab data from API, put into an array and be gable to scroll thorugh each game in the menu
    const gamesList = () => {
        let arr = []
        Object.keys(props.games).forEach(game => {
            arr.push(<View key={game}>
                <Text>{game}</Text>
                <TouchableOpacity onPress={navToCreation}>
                    <Text >CREATE NOTES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navToViewing} >
                    <Text >VIEW NOTES</Text>
                </TouchableOpacity>
            </View>)
        })

// Utilizing state to select the game depending on the index of the Games array
      const [state, setState] = React.useState({ game : 0 })

//Button used to activate Creation portion of the app
      const navToCreation = () => {
        props.navigation.navigate('Create',{
            gameId: state.game,
            game: props.games[state.game]
        })
      }

//Button used to activate the Viewing portion of the app
      const navToViewing = () => {
        props.navigation.navigate('View', {
            gameId: state.game,
            game: props.games[state.game]
        })
      }

// Toggles the next game in the Games Array
      const nextGame = () => {
        state.game === Object.keys(props.games).length-1 ? setState({ game: 0 }) : setState({ game: state.game+1 })
      }
      
//Toggles the previous game in the Gammes Array
      const prevGame = () => {
        state.game === 0 ? setState({ game: Object.keys(props.games).length-1 }) : setState({ game: state.game-1 })
      }

        return(
            <>
                <TouchableOpacity onPress={prevGame}>
                    <Text >PREV. GAME</Text>
                </TouchableOpacity>
                <Text>Choose Your Destiny.</Text>
                {/*Render a game depending upon the index in the Games array*/}
                {arr[state.game]}
                <TouchableOpacity onPress={nextGame}>
                    <Text >NEXT GAME</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <View>
            {/* When there is a user, render up the main menu with the games, otherwise render the Login Component */}
            {props.currentUser ?
             <><Text>Welcome {props.currentUser.username}!</Text>{props.games ? gamesList() :
              <Text> Loading Games.... </Text>}
              <Button title="Logout" onPress={props.logoutUser} /></> 
              :<Login/>}
            
        </View>
    )
}
/* User prop - controls whether its the main menu or the Login thats being Rendered 
   Games prop- controls when the function is called to sort the games into data in the Redux store*/
const MSTP = state => {
    return {
        currentUser: state.user,
        games: state.games
    }
}
/*Actions to get data needed from the API*/
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