import React from 'react';

import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <center><h2>Results</h2></center>
                <TrackList tracks = {this.props.searchResults} isRemoval = {false} onAdd = {this.props.onAdd}/>
            </div>
        );
    }
};

export default SearchResults;