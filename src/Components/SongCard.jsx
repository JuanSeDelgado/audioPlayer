import React from 'react';

const SongCard = ({ song, onClick }) => {
    return (
      <div className="song-card" onClick={onClick}>
        <div
          className="song-card-bg"
          style={{ backgroundImage: `url(${song.album.cover_medium})` }}
        />
        <div className="song-card-overlay">
          <h5 className="song-title">{song.title}</h5>
          <p className="song-artist">{song.artist.name}</p> 
          <p className="song-album">{song.album.title}</p>
        </div>
      </div>
    );
  };

export default SongCard;
