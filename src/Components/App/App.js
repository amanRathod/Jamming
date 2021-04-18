import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
       searchResults : [{name:'name1', artist: 'artist1', album: 'album1', id: 1},
       {name:'name2', artist: 'artist2', album: 'album2', id: 2},
       {name:'name3', artist: 'artist3', album: 'album3', id: 3}],
       
       playlistName: "My Playlist",
       playlistTracks: [{name: 'playlistName1', artist: "playlistArtist1", album: "playlistAlbum1", id: 4},
       {name: 'playlistName1', artist: "playlistArtist1", album: "playlistAlbum1", id: 5}, 
       {name: 'playlistName1', artist: "playlistArtist1", album: "playlistAlbum1", id: 6}
       ]}
  }

  addTrack(track) {
    if( this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      });
    this.addTrack = this.addTrack.bind(this);
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          
          <SearchBar />
          <div className="App-playlist">
            
            <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack}/>
            
            <Playlist playlistName = {this.playlistName} playlistTracks = {this.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
};
export default App;
