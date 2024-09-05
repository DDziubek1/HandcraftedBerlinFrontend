import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set } from "react-hook-form";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ListingShopDetails.css';
const ListingShopDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                const listingData = response.data;
                setListing(listingData);
                console.log('Listing:', listingData);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };
        fetchListingDetails();
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                const categoriesData = response.data;
                setCategories(categoriesData);
                console.log('Categories:', categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        setCart(JSON.parse(savedCart) || []);
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : "Unknown Category";
    };


    const handleAddToCart = () => {
        const newCart = [...cart, listing._id];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    return (
        <div className="min-h-screen bg-background">
        <div className="flex justify-center items-center pt-8">
        <div className="w-2/3  bg-lightSand ">
        <div className="card lg:card-side  shadow-xl">
        <figure className="w-full lg:w-1/2">
              <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay className="w-full">
                {listing.images && listing.images.map((image, index) => (
                  <div key={index} className="carousel-item">
                    <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </Carousel>
            </figure>
  <div className="card-body">
  <div className="flex items-center">
  <p className="badge text-right bg-lightSand  text-primary  text-sm font-semibold  justify-end">{getCategoryName(listing.category)}</p>
  </div>
    <h2 className="card-title text-primary pt-2 pb-8">{listing.name}</h2>
    
    <span className=" text-secondary font-bold">Materials</span>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center ">
    {listing.materials && listing.materials.map((material, index) => (
        <p key={index} className="text-secondary font-semibold">{material}</p>
    ))}
</div>
    <span className=" text-primary font-bold pt-4">Description</span>
    <p className="">{listing.description}</p>
    <div className="flex items-center pt-2 gap-x-6 justify-end">
        <div>
    <span className=" text-primary font-bold pt-4">Stock</span>
    <p className=" text-accent font-semibold">{listing.stock}</p>
    </div><div>
    <span className=" text-primary font-bold pt-4">Price</span>
    <p className=" text-accent font-semibold">{listing.price}€</p>
    </div>
    </div>
    <div className="card-actions justify-end pt-6">
      <button onClick={() => handleAddToCart(listing._id)} className="btn bg-primary text-white hover:bg-accent  cursor-pointer ">Add to cart</button>
    </div>
  </div>

            </div>
        </div>
    </div>
</div>
    );
    }

export default ListingShopDetails;