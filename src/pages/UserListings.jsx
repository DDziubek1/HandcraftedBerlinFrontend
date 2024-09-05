import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserListings = () => {
 const navigate = useNavigate();
const [listings, setListings] = useState([]);
const [userData, setUserData] = useState({});
 const handleAddNewListing = () => {
    navigate('/profile/listings/new');
    };
    
    useEffect(() => {
      const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.get('http://localhost:3000/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userData = response.data;
            setUserData(userData);
            console.log('User:', userData);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
        const fetchListings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const listingsData = response.data;
                console.log('Listings:', listingsData);

                const userListing = listingsData.filter(listing => listing.sellerId === userData._id);
                setListings(userListing);
                console.log('User Listings:', userListing);

            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchProfile();
        fetchListings();
    }, [userData._id]);

    const handleListingClick = (id) => {
        navigate(`/profile/listings/${id}`);
      };
    
    return (
        <div className='min-h-screen bg-background'>
        <div className="container mx-auto p-6 bg-background">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">User Listings</h1>
          <button onClick={handleAddNewListing}
           className="btn bg-primary text-white hover:bg-accent">Add New Listing</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="card bg-lightSand shadow-md p-4"
          onClick={() => handleListingClick(listing._id)}
          >
            <img src={listing.images[0]} alt={listing.name} className="w-full h-48 object-cover" />
            <h2 className="text-xl text-center font-semibold text-primary">{listing.name}</h2>
            <p className='text-secondary text-center font-semibold'>{listing.description}</p>
            <p className="text-accent text-center font-semibold">{listing.price}€</p>
          </div>
        ))}
        </div>
      </div>
  </div>

    );
    }

export default UserListings;