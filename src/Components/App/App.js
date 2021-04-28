import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
       searchResults : [],
      //  [{name:'name1', artist: 'artist1', album: 'album1', id: 1},
      //  {name:'name2', artist: 'artist2', album: 'album2', id: 2},
      //  {name:'name3', artist: 'artist3', album: 'album3', id: 3}],
       
       playlistName: 'My Playlist',
       playlistTracks: []
      //  [{name: 'playlistName1', artist: "playlistArtist1", album: "playlistAlbum1", id: 4},
      //  {name: 'playlistName1', artist: "playlistArtist1", album: "playlistAlbum1", id: 5}, 
      //  {name: 'playlistName1', artist: "playlistArtist1", album: "playlistAlbum1", id: 6}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Use the track’s id property to check if the current song is in the playlistTracks state.
  // If the id is new, add the song to the end of the playlist.
  // Set the new state of the playlist.

  addTrack(track){
    let tracks = this.state.playlistTracks;

    if( tracks && tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    
      tracks.push(track);

       //change current state
      this.setState({
        playlistTracks: tracks
      });
    }

    // Filters tracks that already are on the playlist
  // Uses the track’s id property to filter it out of playlistTracks
  // Sets the new state of the playlist
    removeTrack(track) {
      let tracks = this.state.playlistTracks;
      if(tracks){
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({
          playlistTracks: tracks
        });
      }
    }
    
    //   Accepts a name argument
  //  Sets the state of the playlist name to the input argument

    updatePlaylistName(name) {
      this.setState({
        playlistName: name
      });

    }
    
    savePlaylist() {
      
      let trackUris = this.state.playlistTracks.map((track) => track.uri);
      if (trackUris && trackUris.length) {
        Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
          this.getUserPlaylists();
          this.setState({
            playlistName: "New Playlist Name",
            playlistTracks: [],
          });
        });
      } else {
        alert("Your playlist is empty! Please add tracks.");
      }
    }

    search(term){
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults})
      });
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            
            <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack}/>
            
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} 
            onRemove = {this.removeTrack} onNameChange ={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
