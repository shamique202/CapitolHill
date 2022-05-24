import tokenService from "./tokenService";

const BASE_URL = "/api/";

export function create(id) { 
// making the create function in CRUD operation
  return fetch(`${BASE_URL}posts/${id}/likes`, { 
    // now for likes when user taps a like, it ges created
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Please login to a post"); 
// user must be already logged in to like anything
  });
}

export function removeLike(id) {
 //user must be logged in to remove the likes they clicked on
  return fetch(`${BASE_URL}likes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), 
// once liked is clicked the token is grabbed and produces the function (remove)
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Please login before removing a like");
  });
}