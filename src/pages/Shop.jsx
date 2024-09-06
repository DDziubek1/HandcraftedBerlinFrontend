import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
 const [products, setProducts] = useState([]);
 const [categories, setCategories] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [filteredProducts, setFilteredProducts] = useState([]);
 const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://handcraftedberlinbackend.onrender.com/products');
                const productsData = response.data;
                setProducts(productsData);
                console.log('Products:', productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
        console.log('Products:', products);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://handcraftedberlinbackend.onrender.com/categories');
                const categoriesData = response.data;
                setCategories(categoriesData);
                console.log('Categories:', categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
        console.log('Categories:', categories);
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, products]);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : "Unknown Category";
    };

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="flex justify-center bg-background">
<ul className="menu menu-xs  menu-horizontal gap-2   bg-lightSand   rounded-box grid grid-cols-3 lg:grid-cols-9">
    <li key="all"
    onClick={() => handleCategoryClick('all')}
    className={`menu-title  text-primary hover:text-lightSand hover:font-bold hover:border-secondary hover:bg-secondary rounded text-center cursor-pointer ${selectedCategory === 'all' ? 'bg-primary text-white' : ''}`}>All listings</li>
 {categories.map((category) => (
    <li className={`menu-title text-primary hover:text-lightSand hover:font-bold hover:border-secondary hover:bg-secondary rounded text-center cursor-pointer ${selectedCategory === category._id ? 'bg-primary text-white' : ''}`}
    key={category._id}
    onClick={() => handleCategoryClick(category._id)}>
        {category.name}
    </li>
))}
</ul>
</div>


<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2 mb-6 md:p-4">
    {filteredProducts.map((product) => (
        <div key={product._id}
         className="card bg-lightSand shadow-md p-2 md:p-4 cursor-pointer flex flex-col justify-between "
         onClick={() => handleProductClick(product._id)}>
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            <p className="badge badge-sm bg-primary mt-2 text-lightSand p-3 text-sm font-semibold">{getCategoryName(product.category)}</p>
            <h2 className="text-xl font-semibold mt-2 text-center text-primary">{product.name}</h2>
            <p className='text-secondary mt-2 font-semibold'>{product.description}</p>
            
            
            <p className="text-accent font-semibold mt-4 text-right">{product.price}€</p>
        </div>
    ))}
</div>
        </div>
    );
}

export default Shop;