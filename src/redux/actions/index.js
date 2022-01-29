// Login/Logout actions

  export const fetchUser = () => {
    return dispatch => {
      const token = localStorage.token;
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
              localStorage.clear()
            } else {
              dispatch({
                type: "LOGIN_USER",
                payload: data.user
              })
            }
          })
      }
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
            localStorage.setItem("token", data.jwt)
            dispatch({
              type: "LOGIN_USER",
              payload: data.user
            })
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
            localStorage.setItem("token", data.jwt)
            dispatch(fetchUser())
          }
        })
    }
  }

  // Load up Form data for the games