import banner from '../assets/banner.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                const productsData = response.data;
                setProducts(productsData);
                console.log('Products:', productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                const usersData = response.data;
                setUsers(usersData);
                console.log('Users:', usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            };
        };
        fetchProducts();
        fetchUsers();

          }, []);

          const handleArtistClick = () => {
            navigate('/artists');
          };

          const handleProductClick = (product) => {
            navigate(`/shop/${product._id}`);
          };

    return (
        <div className="bg-background min-h-screen">
      <div className="flex flex-col h-98 md:flex-row items-center justify-start bg-background">
  <div className="text-center h-full md:w-1/3 bg-background order-2 p-2 md:order-1">
    <h1 className="text-4xl font-bold mt-12 text-primary">HandcraftedBerlin</h1>
    <p className="mt-4 text-primary">Discover Berlin's vibrant artisan community with HandcraftedBerlin, the online marketplace that connects local artists and craftspeople with those who appreciate unique, handmade creations.</p>
    <p className="text-primary mt-2">From jewelry and clothing to sculptures and paintings, HandcraftedBerlin brings the best of Berlin's craftsmanship right to your fingertips.</p>
    <p className="text-primary mt-4">Support local talent and find one-of-a-kind treasures—all in one beautifully crafted platform!</p>
    <button className="btn bg-primary text-white hover:bg-accent mt-6">Shop Now</button>
  </div>
    <div className="h-full md:w-2/3 order-1 md:order-2">
        <img src={banner3} alt="Banner" className="h-full w-full object-cover" />
        
  </div>
</div>
          
    
          
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
         
            <div className="card bg-lightSand shadow-xl">
            {users.length > 1 && users[1] ? (
        <>
            <figure className="h-48 bg-background">
                {users[1].images && users[1].images.length > 0 ? (
                    <img src={users[1].images[0]} alt="Artist" className="w-full h-full object-contain" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral">Loading...</div>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title text-primary font-bold">Artist Of The Day</h2>
                <p className="text-lg text-secondary font-semibold">
                    {users[1].about || 'Loading...'}
                </p>
                <h3 className="text-lg text-primary font-bold mt-4">
                    {users[1].firstName} {users[1].lastName}
                </h3>
                <button onClick={handleArtistClick} className="btn bg-secondary text-white hover:accent mt-6">Learn More</button>
            </div>
        </>
    ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral">Loading...</div>
    )}
            </div>
    
        
            <div className="card bg-lightSand shadow-xl">
              <figure className="h-48 bg-background">
                <img src={products.length > 0 && products[0] ? products[0].images[0] : 'Loading...'} alt="Product" className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-primary font-bold">Product Of The Day</h2>
                <p className="text-md text-secondary font-semibold">
                  {products.length > 0 && products[0] ? products[0].description : 'Loading...'}
                </p>
                <h3 className="text-lg font-bold mt-4 text-primary">{products.length > 0 && products[0] ? products[0].name : 'Loading...'}</h3>
                <button onClick={() => handleProductClick(products[0])}
                 className="btn bg-secondary text-white hover:bg-accent mt-6">Learn More</button>
              </div>
            </div>
    
      
            <div className="card bg-lightSand shadow-xl">
              <figure className="h-48 bg-gray-300"></figure>
              <div className="card-body">
                <h2 className="card-title text-primary font-bold">Most Upcoming Event</h2>
                <p className="text-md text-secondary font-semibold">
                  Description of the event.
                </p>
                <h3 className="text-lg font-bold mt-4 text-primary">Event</h3>
                <button className="btn bg-secondary text-white hover:bg-accent mt-6">Learn More</button>
              </div>
            </div>
          </section>
        </div>
      );
    }

export default Home;