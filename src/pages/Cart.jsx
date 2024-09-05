import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Cart = () => {
    const { id } = useParams();
     const [cartListings, setCartListings] = useState([]);
    const [total, setTotal] = useState(0);
 

    useEffect(() => {
        const fetchCartListings = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartListingsData = await Promise.all(
                cart.map(async (listingId) => {
                    try {
                        const response = await axios.get(`http://localhost:3000/products/${listingId}`);
                        return response.data;
                    } catch (error) {
                        console.error(`Error fetching listing with ID ${listingId}:`, error);
                        return null;
                    }
                })
            );
            setCartListings(cartListingsData.filter(listing => listing !== null));

            const total = cartListingsData.reduce((acc, listing) => acc + listing.price, 0);
            setTotal(total);
        };
        fetchCartListings();
    }, []);

   const handleRemoveFromCart = (listingId) => {
        const newCart = cartListings.filter(listing => listing._id !== listingId);
        setCartListings(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart.map(listing => listing._id)));
    };

    return (
        <div className="min-h-screen bg-background p-4">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartListings.map((cartListing) => (
                <div className="card bg-lightSand p-4 rounded shadow-md flex flex-col justify-between" key={cartListing._id}>
                    <img src={cartListing.images[0]} alt={cartListing.name} className="w-full h-48 object-cover" />
                    <h3 className="text-xl text-center font-bold text-primary pb-2">{cartListing.name}</h3>
                    <p className="text-xl text-center font-semibold text-secondary pb-4">{cartListing.description}</p>
                    <p className="text-accent text-right font-bold pb-4">Price: {cartListing.price.toFixed(2)}€</p>
                    <button onClick={() => handleRemoveFromCart(cartListing._id)} className="btn bg-primary text-white hover:bg-accent mt-2">Remove from Cart</button>
                </div>
            ))}
        </div>
        <div className="mt-8 p-4 bg-lightSand rounded shadow-md">
            <h2 className="text-xl font-bold text-primary text-center">Total Price: {total.toFixed(2)}€</h2>
           
        </div>
        <div className="flex justify-center mt-4">
        <button className="btn bg-primary text-white mb-6 hover:bg-accent"> Checkout</button>
        </div>
    </div>
    );
    }

    export default Cart;