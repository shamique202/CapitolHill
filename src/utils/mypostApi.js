import tokenService from './tokenService';

const BASE_URL = '/api/posts';

export function create(post) { 
  console.log(post)
// making a create function to DB & grabbing the tokens to allow user to post
    return fetch(BASE_URL, {
        method: 'POST',
        body: post, 
        // body: JSON.stringify(post),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
            // 'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials');
  });
}

export function getAll() {
	return fetch(BASE_URL, {
	  method: 'GET',
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken() // requires logged in users only
	  }
	})
	.then(res => {
	// Valid login if we have a status of 2xx (res.ok)
		if (res.ok) return res.json();
		throw new Error('bad Credentials');
	});
  }

  export function removePost(id) { 
      // remove/delete post from database =, feed page 
      // users must be logged in before removing any posts
    return fetch(`${BASE_URL}${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + tokenService.getToken()
      }
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error('Login to remove your post')
    })
  }