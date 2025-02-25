import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const [city, setCity] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [profileData, setProfileData] = useState<any>({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    address: '',
    bio: '',
    profileImage: '', 
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(profileData)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const vendorData = {
      username,
      email,
      mobileNumber,
      password,
      city: selectedCity,
      address: address,
      bio: bio,
    };
    try {
      const response = await fetch('http://localhost:5000/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });
      console.log(response)
      if (response.ok) {
        setSuccessModal(true);
        navigate('/vendor');
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        setErrorModal(true);
      }
    } catch (error) {
      setErrorModal(true);
      console.error('Error creating vendor:', error);
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="container mx-auto p-6">
      {successModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">Success!</h4>
            <p>Your category has been successfully submitted.</p>
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
      <div className="flex mb-6">
        <button
          onClick={() => handleTabChange('profile')}
          className={`px-6 py-2 mr-4 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Profile Page
        </button>
        <button
          onClick={() => handleTabChange('leads')}
          className={`px-6 py-2 mr-4 text-sm font-medium rounded-md ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Leads
        </button>
        <button
          onClick={() => handleTabChange('businessListings')}
          className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'businessListings' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Business Listings
        </button>
      </div>
     {activeTab === 'profile' && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <h2 className="text-xl font-semibold">{profileData.username}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span>{profileData.email}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="mobileNumber"
                  value={profileData.mobileNumber}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span>{profileData.mobileNumber}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span>{profileData.address}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleTextareaChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span>{profileData.bio}</span>
              )}
            </div>
          </div>
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          ):(
            <button
              onClick={handleSubmit}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      )}
      {activeTab === 'leads' && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold">Leads</h3>
          <p>List of leads associated with the vendor</p>
        </div>
      )}
      {activeTab === 'businessListings' && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold">Business Listings</h3>
          <p>List of business listings created by the vendor</p>
        </div>
      )}
    </div>
  );
};

export default Vendor;