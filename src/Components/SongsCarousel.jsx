import React, { useState, useEffect } from 'react';
import SongCard from './SongCard'; 
import SongSelected from './SongSelected'; 
import { div } from 'motion/react-client';

function SongsCarousel() {
    const [artists, setArtists] = useState('oblivionnmightytrash');
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSong, setCurrentSong] = useState(null); 

    // Función para obtener canciones desde Deezer
    const fetchSongs = async () => {
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${artists}`
            );
            const data = await response.json();
            setSongs(data.data);  
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener canciones:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();  
    }, [artists]);

    
    if (loading) {
        return <div>Cargando canciones...</div>;
    }

    return (
        <>
            <div className="input-group mb-3">
                <input
                    type="text"  
                    id="artistInput"
                    className="form-control"
                    placeholder="Artist"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={() => {
                        const inputElement = document.getElementById('artistInput'); 
                        if (inputElement && inputElement.value.trim() !== '') {
                            setArtists(inputElement.value.trim());
                            console.log('Artista:', inputElement.value.trim());
                        } else {
                            setArtists('404');
                            console.warn('El campo de entrada está vacío.');
                        }
                    }}
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
           { <SongSelected song={currentSong} />}
            <div className="carousel-wrapper">

                <div className="carousel-container">
                    {songs.map((song) => (
                        <SongCard
                            key={song.id}
                            song={song}
                            onClick={() => setCurrentSong(song)} 
                        />
                    ))}
                </div>
            </div>
        </>

    );
}

export default SongsCarousel;