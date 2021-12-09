// Login/Logout actions

export const postSignup = userObj => {

  }

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
          console.log(data)
          dispatch({
            type: "LOGIN_USER",
            payload: data
          })
        })
    }
  }