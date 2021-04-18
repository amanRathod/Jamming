
import React from 'react';

import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"}/>
                <TrackList tracks = {this.props.PlaylistTracks}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
};

export default Playlist;