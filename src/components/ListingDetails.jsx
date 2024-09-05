import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ListingShopDetails.css';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();
  const [selectedCategory, setSelectedCategory] = useState("");
  const selectedCategoryWatch = watch("category", selectedCategory);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([""]);
  const [description, setDescription] = useState("");
  const materialsWatch = watch("materials", materials);
  const descriptionWatch = watch("description", description);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setListing(response.data);
        setMaterials(response.data.materials);
        setDescription(response.data.description);
        fetchCategoryName(response.data.category);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    const fetchCategoryName = async (categoryId) => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/id/${categoryId}`);
        setCategoryName(response.data.name); // Set category name
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
        const categoryName = response.data.map((category) => category.name);
        console.log("Categories:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchListing();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    setMaterials(materialsWatch);
    setDescription(descriptionWatch);
  }, [materialsWatch, descriptionWatch]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setValue("category", category);
  };

  const handleMaterialChange = (index, value) => {
    const newMaterials = [...materials];
    newMaterials[index] = value;
    setMaterials(newMaterials);
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, ""]);
  };

  const handleDeleteLastMaterial = () => {
    if (materials.length > 0) {
      setMaterials(materials.slice(0, -1));
    }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }

    console.log('Token being sent:', token); // Debugging line to check the token
    console.log('Data being sent:', data); // Debugging line to check the data
   

    try {
        const response = await axios.put(`http://localhost:3000/products/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Product added successfully:', response.data);
    } catch (error) {
        console.error('Error adding product:', error);
        if (error.response) {
            console.error('Server responded with:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }

    setIsEditing(false);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-5xl mx-auto bg-lightSand p-5 rounded-lg shadow-lg flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Left Section: Image Carousel */}
        <div className="w-full lg:w-1/2">
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay className="w-full">
                {listing.images && listing.images.map((image, index) => (
                  <div key={index} className="carousel-item">
                    <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </Carousel>
        </div>

       

        {/* Right Section: Details */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-4">
          {/* Edit and Delete Buttons */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="btn bg-primary text-lightSand hover:bg-accent"
              onClick={handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
        {/* Name, Price, and Stock Fields */}
        
        <div className="space-y-2">
            <p className="text-neutral font-semibold">NAME</p>
            {isEditing ? (
                <input
                    type="text"
                    className="p-2 border"
                    {...register('name', { required: true })}
                />
            ) : (
                <p className="text-neutral">{watch('name') || listing.name }</p>
            )}
        </div>

        <div className="space-y-2">
            <p className="text-neutral font-semibold">PRICE</p>
            {isEditing ? (
                <input
                    type="number"
                    className="p-2 border"
                    {...register('price', { required: true })}
                />
            ) : (
                <p className="text-neutral">{watch('price') || listing.price}</p>
            )}
        </div>

        <div className="space-y-2">
            <p className="text-neutral font-semibold">STOCK</p>
            {isEditing ? (
                <input
                    type="number"
                    className="p-2 border"
                    {...register('stock', { required: true })}
                />
            ) : (
                <p className="text-neutral">{watch('stock') || listing.stock}</p>
            )}
        </div>
    </div>
          <div className="space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <p className="text-neutral font-semibold">CATEGORY</p>
              <div className="flex flex-wrap space-x-2 overflow-x-auto">
                {isEditing ? (
                  <select
                    className="select select-bordered w-full max-w-xs"
                    {...register("category", { required: true })}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <button className="badge bg-accent text-white p-3">
                    {categoryName ||selectedCategory}
                  </button>
                )}
              </div>
            </div>

            {/* Materials */}
            <div className="space-y-1">
              <p className="text-neutral font-semibold">MATERIALS</p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-x-auto">
              {(isEditing ? materials : materialsWatch).map((material, index) =>
  isEditing ? (
    <input
      key={index}
      type="text"
      className="p-2 border"
      defaultValue={material}
      onChange={(e) => handleMaterialChange(index, e.target.value)}
      {...register(`materials[${index}]`)}
    />
  ) : (
    <li key={index}>◊ {material}</li>
  )
)}
              </ul>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="btn bg-secondary text-white hover:bg-accent"
                    onClick={handleAddMaterial}
                  >
                    Add Material
                  </button>
                  <button
                    type="button"
                    className="btn bg-red-500 text-white hover:bg-accent"
                    onClick={handleDeleteLastMaterial}
                  >
                    Delete Last Material
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-neutral font-semibold">DESCRIPTION</p>
              {isEditing ? (
                <textarea
                  className="textarea border-accent w-full p-2 border"
                  {...register("description")}
                  defaultValue={description}
                ></textarea>
              ) : (
                <p className="text-neutral leading-relaxed">
                  {description || "Your description goes here"}
                </p>
              )}
            </div>

            {/* Add Listing Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn bg-primary text-lightSand hover:bg-accent"
              >
                Edit listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ListingDetails;
