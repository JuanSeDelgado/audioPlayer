import React, { useRef, useEffect } from 'react';

const SongSelected = ({ song }) => {
    const audioRef = useRef(null); // Referencia para el elemento de audio

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load(); 
            audioRef.current.play();
        }
    }, [song]); // Ejecutar cada vez que cambie la canción

    if (!song) return null;

    return (
        <div className="song-selected d-inline-flex align-items-center border rounded-3 p-3 gap-4"> {/* Ajustado sin usar Bootstrap */}
            <img src={song.album.cover_medium} alt={song.title} />
            <div>
                <h5 className='text-light'>{song.title}</h5>
                <p className='text-light'>{song.artist.name}</p>
                <audio ref={audioRef} controls style={{ width: '100%' }}>
                    <source src={song.preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default SongSelected;