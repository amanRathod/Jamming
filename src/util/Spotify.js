
const clientid = '4e513971bdd249d88be01b4ac168a5b3';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {
    
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }

        //check for access token match
        const accessTokenInMatch = window.location.href.match(/access_token([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenInMatch && expiresInMatch){
            accessToken = accessTokenInMatch[1];
            const expiresIn = Number(expiresInMatch);

            //This clears the paramters, allow us to grab new access token when it expires.
            window.setTimeout(() => accessToken='', expiresIn*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
         return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).
        then(response => {
            return response.json();

        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name, trackUri) {
        if(!name || !trackUri.length){
            return;
        }

        const accessToken = Spotify.this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(data => {
            userId = data.id;
             fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({
                        name: name
                    })                

            })
            .then(response => response.json()).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST', 
                    body: JSON.stringify({uri: trackUri})
                });
            });
        });

    }

    

    
};


export default Spotify;
// let clientId = "4e513971bdd249d88be01b4ac168a5b3";
// const redirectUri = "http://localhost:3000/";
// const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

// let accessToken = undefined;
// let expiresIn = undefined;

// const Spotify = {
//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     }

//     //check for access token match
//     const accessTokenInMatch = window.location.href.match(/access_token=([^&]*)/);
//     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

//     if (accessTokenInMatch && expiresInMatch) {
//       accessToken = accessTokenInMatch[1];
//       expiresIn = expiresInMatch[1];

//       //This clears the paramters, allow us to grab new access token when it expires.
//       window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
//       window.history.pushState("Access Token", null, "/");
//     } else {
//       window.location = spotifyUrl;
//     }
//   },
//   search(term) {
//     const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
//     return fetch(searchUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//       .then(response => response.json())
//       .then(jsonResponse => {
//         if (!jsonResponse.tracks) return [];
//         return jsonResponse.tracks.items.map(track => {
//           return {
//             id: track.id,
//             name: track.name,
//             artist: track.artists[0].name,
//             album: track.album.name,
//             uri: track.uri
//           };
//         });
//       });
//   },
//   // Checks if there are values saved to the method's two arguments. If not, returns values
//   savePlaylist(name, trackUris) {
//     if (!name || !trackUris || trackUris.length === 0) return;
//     const userUrl = "https://api.spotify.com/v1/me";
//     const headers = {
//       Authorization: `Bearer ${accessToken}`
//     };
//     let userId = undefined;
//     let playlistID = undefined;
//     fetch(userUrl, {
//       headers: headers
//     })
//       .then(response => response.json())
//       .then(jsonResponse => (userId = jsonResponse.id))
//       .then(() => {
//         const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
//         fetch(createPlaylistUrl, {
//           method: "POST",
//           headers: headers,
//           body: JSON.stringify({
//             name: name
//           })
//         })
//           .then(response => response.json())
//           .then(jsonResponse => (playlistID = jsonResponse.id))
//           .then(() => {
//             const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`;
//             fetch(addPlaylistTracksUrl, {
//               method: "POST",
//               headers: headers,
//               body: JSON.stringify({
//                 uris: trackUris
//               })
//             });
//           });
//       });
//   }
// };

// export default Spotify;