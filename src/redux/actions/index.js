import AsyncStorage from '@react-native-async-storage/async-storage'

// Login/Logout actions

  export const fetchUser = () => {
    return dispatch => {
      AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          return fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(resp => resp.json())
            .then(data => {
              if (data.message) {
                AsyncStorage.clear()
              } else {
                dispatch({
                  type: "LOGIN_USER",
                  payload: data.user
                })
                dispatch(fetchGames())
              }
            })
        }
      })
    }
  }

  export const logoutUser = () => ({
    type: 'LOGOUT_USER'
  })

  export const postLogin = (state) => {
    console.log(state)
    return dispatch => {
      return fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({state})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message){
            alert(data.message)
          } else {
            AsyncStorage.setItem("token", data.jwt)
            dispatch({
              type: "LOGIN_USER",
              payload: data.user
            })
            dispatch(fetchGames())
          }
        })
    }
  }

  export const postSignup = userObj => {
    return dispatch => {
      return fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({userObj})
      })
        .then(resp => resp.json())
        .then(data => {
            console.log("Here")
          if (data.message) {
            alert(data.message)
          } else {
            AsyncStorage.setItem("token", data.jwt)
            dispatch(fetchUser())
          }
        })
    }
  }

  // Load up Form data for the games

  export const fetchGames = () => {
    return dispatch => {
      AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          return fetch("http://localhost:3000/characters", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(resp => resp.json())
            .then(data => {
              if (data.message) {
                AsyncStorage.clear()
              } else {
                console.log(data)
                dispatch({
                  type: "FETCH_GAMES",
                  payload: data
                })
              }
            })
        }
      })
    }
  }

  // Character Note Actions
  export const postCharNote = (noteObj) => {
    return (dispatch) => {
      AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          return fetch('http://localhost:3000/character_notes/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({noteObj}),
            }).then(resp => resp.json())
              .then(data => {
                  alert(data.message)
                  console.log(data)
              })
        }
      })
    }
  }

  export const fetchCharNotes = (obj) => {
    console.log(obj)
    return dispatch => {
      AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          return fetch(`http://localhost:3000/${obj.game}/${obj.character}/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
            }).then(resp => resp.json())
              .then(data => {
                dispatch({
                    type: "FETCH_CHAR_NOTES",
                    payload: data
                })
              })
        }
      })
    }
  }
  
  // Matchup Note Actions

  export const postMuNote = (noteObj) => {
    console.log(noteObj)
    return (dispatch) => {
      AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          return fetch('http://localhost:3000/matchup_notes/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({noteObj}),
            }).then(resp => resp.json())
              .then(data => {
                  alert(data.message)
                  console.log(data)
              })
        }
      })
    }
  }

  export const fetchMuNotes = (data) => {
    return (dispatch) => {
      AsyncStorage.getItem('token')
      .then((token) => {
        if(token){
          fetch(`http://localhost:3000/${data.game}/${data.character}/${data.opponent}/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
            }).then(resp => resp.json())
              .then(data => {
                dispatch({
                    type: "FETCH_MU_NOTES",
                    payload: data
                })
              })
        }
      })
    }
  }

  export const refreshCurrentNote = () => {
      return {
          type: "REFRESH_CURRENT_NOTE"
      }
  }

  //Bullet Point Actions

export const postBulletPoint = (pointObj, currentNote) => {
  return dispatch => {
    AsyncStorage.getItem('token')
    .then((token) => {
      if (token) {
        fetch('http://localhost:3000/bullet_points/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({pointObj}),
            }).then(resp => resp.json())
              .then(data => {
                  alert(data.message)
                  pointObj.type === "char" ?  dispatch(fetchCharNotes(currentNote)) : dispatch(fetchMuNotes(currentNote))
              })
      }
    })
  }
}
