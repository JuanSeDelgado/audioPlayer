import React, { useState, useEffect, useRef } from 'react';

const EasySongPlayer = () => {

    const [songs, setSongs] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const songsDomain = 'https://playground.4geeks.com';

    async function fetchSongs() {
        try {
            const response = await fetch('https://playground.4geeks.com/sound/songs');
            const data = await response.json();
            setSongs([...data.songs]);
        } catch (error) {
            console.error('Error al obtener canciones:', error);
        }
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSongIndex]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        setIsPlaying(true);
    };

    const handlePrevious = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow rounded w-300" style={{ maxWidth: '1200px', height: '500px' }}>
                <div className="card-body bg-grey text-center p-4 h-100 d-flex flex-column">
                    <h1 className="h1 mb-4">Normal Song Player</h1>
                    <div className="flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
                        <ul className='list-group'>
                            {songs && songs.map((song, index) => (
                                <li
                                    key={index}
                                    className={`list-group-item text-dark ${index === currentSongIndex ? 'active' : ''}`}
                                    onClick={() => {
                                        setCurrentSongIndex(index);
                                        setIsPlaying(true);
                                    }}
                                >
                                    {song.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <audio ref={audioRef} src={songs && `${songsDomain + songs[currentSongIndex]?.url}`} />
                    <div className="mt-3">
                        <button className="btn btn-primary mx-2" onClick={handlePrevious}><i class="fa-solid fa-backward"></i></button>
                        <button className="btn btn-primary mx-2" onClick={handlePlayPause}>{isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}</button>
                        <button className="btn btn-primary mx-2" onClick={handleNext}><i class="fa-solid fa-forward"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EasySongPlayer;