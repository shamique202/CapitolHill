import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

// NOTE THIS IS configured to send of a multi/part form request
// aka photo <--- 
function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      body: user,
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.log("if an eror occurs, check the server in terminal")
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  )
  // Setting our token in localStorage in our browser
  // then we'll be able to use with every request!
  // The above could have been written as
  //.then((token) => token.token);
}
function getUser() { // <--- identifying the user but they must be logged in 
  return tokenService.getUserFromToken();
}
function logout() { // <--- used now able to logout
  tokenService.removeToken();
}

function login(creds) { // <--- user identity and password authentication
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}
function getProfile(username) {
  return fetch(BASE_URL + username, {
    headers: { 
      Authorization: "Bearer " + tokenService.getToken(), }, // <-- logging response headers
}).then((res) => {
  if(res.ok) return res.json();
  if(res.status ===404) throw new Error("User not found!");
  throw new Error("Bad credentials"); // <-- catch block
}
)
}

export default {
  signup,
  logout,
  login,
  getUser,
  getProfile // <-- its function above
};


