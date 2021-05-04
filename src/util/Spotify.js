const clientid = ''; // Use your own client_id and dont share
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
            const expiresIn = Number(expiresInMatch[1]);

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
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
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
                uri: track.uri,
            }));
        });
    },
}
export default Spotify;
