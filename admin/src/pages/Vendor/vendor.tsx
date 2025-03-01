import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const [city, setCity] = useState('');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('mobileNumber', mobileNumber);
    formData.append('password', password);
    formData.append('city', city);
    formData.append('address', address);
    formData.append('bio', bio);
    formData.append('businessName', businessName);
    const token = localStorage.getItem('token');
    // formData.append('categoryId', categoryId); 
    if (profilePicture) {
      formData.append('profilepicture', profilePicture);
    }
   try {
      const response = await fetch('http://localhost:5000/api/vendor', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setSuccessModal(true);
        navigate('/vendor');
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        setErrorModal(true);
      }
    } catch (error) {
      console.error('Error creating vendor:', error);
      setErrorModal(true);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Create Vendor" />
      {successModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">Success!</h4>
            <p>Your vendor has been successfully submitted.</p>
            <button
              onClick={() => setSuccessModal(false)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {errorModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">Error!</h4>
            <p>There was an issue with your submission. Please try again.</p>
            <button
              onClick={() => setErrorModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 p-5"  style={{background:'#fff'}}>
        <div className="mb-4  w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Business Name"
          />
        </div>

        {/* Category Dropdown */}
        {/* <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Category
          </label>
          <Select
            options={categories.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
            onChange={(selectedOption) => setCategoryId(selectedOption.value)}
            placeholder="Select Category"
          />
        </div> */}
       <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            User Name
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Valid Phone Number"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            City
          </label>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Address"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Profile Picture
          </label>
          <input
            type="file"
            onChange={(e: any) => setProfilePicture(e.target.files[0])}
            className="mt-2 w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Describe yourself"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Vendor;