import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AboutMe() {
    const { register, handleSubmit, setValue } = useForm();
    const [userData, setUserData] = useState({});
   
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
                // Format birthday to yyyy-mm-dd
                let birthday = new Date(userData.birthday);
                if (isNaN(birthday)) {
                    birthday = new Date('1990-01-01');
                }
                const formattedBirthday = birthday.toISOString().split('T')[0];

                setValue('firstName', userData.firstName || '');
                setValue('lastName', userData.lastName || '');
                setValue('birthday', formattedBirthday);
                setValue('street', userData.address?.street || '');
                setValue('city', userData.address?.city || '');
                setValue('postalCode', userData.address?.postalCode || '');
                setValue('country', userData.address?.country || '');
                setValue('about', userData.about? userData.about : '');
                setUserData(userData);
           
              } catch (error) { 
                console.error('Error fetching profile:', error);
              }
        };
        fetchProfile();
    }, [setValue]);


    const onSubmit = async (data) => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const structuredData = {
          ...data,
          address: {
              street: data.street,
              city: data.city,
              postalCode: data.postalCode,
              country: data.country,
              images: []
          }
      };
      if (data.images && data.images.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }

        try {
            const uploadResponse = await axios.post(
                "http://localhost:3000/upload-file",
                formData
            );
            console.log(uploadResponse.data);

            // Extract the image URLs from the upload response
            const imageUrls = uploadResponse.data.imageUrls;
            console.log('Image URLs:', imageUrls); // Debugging line to check the image URLs

            if (Array.isArray(imageUrls) && imageUrls.length > 0) {
                structuredData.images = imageUrls;
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            return;
        }
    } else if (userData.images && userData.images.length > 0) {
        structuredData.images = [userData.images[0]];
    }

    console.log('Structured Data:', structuredData);

    
        const response = await axios.put('http://localhost:3000/users', structuredData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Profile updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating profile:', error);
    }
    };

    return (
        <div className='bg-background'>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-lightSand p-10 rounded-lg shadow-lg">
                {/* Profile Section */}
                <div className="flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-10">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        {userData.images && userData.images.length > 0 ? (
                                <img src={userData.images[0]} alt="Profile Pic" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span className="text-neutral">logo/profilepic</span>
                            )}
                        </div>
                        <input type="file" className="mt-4" 
                        {...register('images')}/>
                        
                    </div>

                    {/* Personal Info */}
                    <div className="flex flex-col space-y-6 w-full lg:w-auto">
                        <div>
                            <h2 className="text-lg font-bold text-neutral">First Name</h2>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="First Name"
                                {...register('firstName')}
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral">Last Name</h3>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Last Name"
                                {...register('lastName')}
                            />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-neutral">Birthday</p>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                {...register('birthday')}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col space-y-2 w-full lg:w-auto">
                        <h3 className="text-lg font-bold text-neutral">Address</h3>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Street"
                            {...register('street')}
                        />
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="City"
                            {...register('city')}
                        />
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Postal Code"
                            {...register('postalCode')}
                        />
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Country"
                            {...register('country')}
                        />
                    </div>
                </div>

                {/* About Me Section */}
                <div className="mt-10">
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="About me section"
                        rows="10"
                        {...register('about')}
                    >
                    </textarea>
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end mt-10">
                    <button type="submit" className="btn bg-primary text-white">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default AboutMe;