import { useState, useEffect } from "react";
import axios from "axios";

const Artists = () => {
const [artists, setArtists] = useState([]);
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                const artistsData = response.data;
                console.log('Artists:', artistsData);
                setArtists(artistsData);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []);

    return (
        
        <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 bg-background">
        <div className="flex flex-col justify-between items-center mb-6">
          <h1 className="text-2xl text-center font-bold text-primary">Artists</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist._id} className="card bg-lightSand shadow-md p-4">
            <img src={artist.images[0]} alt={artist.firstName} className="w-full h-48 object-contain" />
            <h2 className="text-xl text-center font-semibold text-primary">{artist.firstName} {artist.lastName}</h2>
            <p className='text-secondary text-center font-semibold'>{artist.about}</p>
          </div>
        ))}
        </div>
        </div>
    </div>
    );
    }

    export default Artists;