import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ListingShopDetails.css';
function Listing() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();
  const [selectedCategory, setSelectedCategory] = useState("");
  const selectedCategoryWatch = watch("category", selectedCategory);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([""]);
  const [description, setDescription] = useState("");
  const materialsWatch = watch("materials", materials);
  const descriptionWatch = watch("description", description);
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
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

    fetchCategories();
  }, []);

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

    try {
      const formData = new FormData();
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }

      const uploadResponse = await axios.post(
        "http://localhost:3000/upload-file",
        formData
      );
      console.log(uploadResponse.data);

      // Extract the image URLs from the upload response
      const imageUrls = uploadResponse.data.imageUrls;
      console.log('Image URLs:', imageUrls); // Debugging line to check the image URLs

      // Ensure data.images is an array and append the new image URLs
      if (!Array.isArray(data.images)) {
        data.images = [];
      }
      data.images = imageUrls;
      console.log('Updated data.images:', data.images); // Debugging line to check the updated images array

      // Update the form data with the new image URLs
      setValue('images', data.images);

     

      const productData = {
        ...data,
        images: imageUrls,
      };
      console.log('Product data:', productData);
      const response = await axios.post('http://localhost:3000/products', productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error:', error);
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

const handleImageChange = (e) => {
  const files = e.target.files;
  const images = Array.from(files).map((file) => URL.createObjectURL(file));
  setPreviewImages(images);
};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-5xl mx-auto bg-lightSand p-5 rounded-lg shadow-lg flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Left Section: Photo */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
        <div>
        <label>Upload your image</label>
        <input type="file" {...register('images')} multiple
        onChange={handleImageChange}/>
      </div>
      <div className="w-full">
      {previewImages.length > 0 ? (
                  <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay className="w-full ">
                    {previewImages.map((image, index) => (
                      <div key={index} className="carousel-item">
                        <img src={image} alt={`Slide ${index}`} className="w-full h-64 md:h-96 lg:h-128 object-cover" />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="flex justify-center items-center h-64 md:h-96 lg:h-128">
                    <p className="text-white">NO IMAGES TO SHOW</p>
                  </div>
                )}
        </div>

        
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
                <p className="text-neutral">{watch('name')}</p>
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
                <p className="text-neutral">{watch('price')}</p>
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
                <p className="text-neutral">{watch('stock')}</p>
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
                    {selectedCategory}
                  </button>
                )}
              </div>
            </div>

            {/* Materials */}
            <div className="space-y-1">
              <p className="text-neutral font-semibold">MATERIALS</p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-x-auto">
                {materials.map((material, index) =>
                  isEditing ? (
                    <input
                      key={index}
                      type="text"
                      className="p-2 border"
                      defaultValue={material}
                      onChange={(e) =>
                        handleMaterialChange(index, e.target.value)
                      }
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
                Add listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Listing;
