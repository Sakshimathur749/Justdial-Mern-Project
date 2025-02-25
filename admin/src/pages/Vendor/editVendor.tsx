import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { State, City } from 'country-state-city'; 
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const EditVendor = () => {
  const { slug } = useParams();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/vendor/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch vendor data');
        }
        const data = await response.json();
        console.log(data)
        setVendor(data);
      } catch (error) {
        console.error('Error fetching vendor details:', error);
        setErrorModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [slug]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Submit updated vendor data if needed
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
    <Breadcrumb pageName='Vendor Profile Page'/>
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

<div className="bg-white shadow-lg rounded-lg p-6">
    <div className="mb-6">
      <img
        src={`http://localhost:5173/src/images/profile_image/${vendor.profilepicture}` || 'default-image-url'}
        alt="Profile"
        className="w-full px-5 py-5 rounded-t-lg object-cover" style={{height:'200px'}}
      />
    </div>
    <div className="flex mb-6 space-x-4">
      <button
        onClick={() => handleTabChange('profile')}
        className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Profile Page
      </button>
      <button
        onClick={() => handleTabChange('leads')}
        className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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

    {activeTab === 'profile' && vendor && (
      <div className="space-y-4 px-5">
        <div className='flex gap-5 justify-start items-center'>
          <label className="block text-lg font-medium text-gray-700">Name:</label>
          <span className='text-lg'>{vendor.username}</span>
        </div>
        <div className='flex gap-5 justify-start items-center'>
          <label className="block text-lg font-medium text-gray-700">Email:</label>
          <span className='text-lg'>{vendor.email}</span>
        </div>
        <div className='flex gap-5 justify-start items-center'>
          <label className="block text-lg font-medium text-gray-700">Mobile Number:</label>
          <span className='text-lg'>{vendor.mobileNumber}</span>
        </div>
        <div className='flex gap-5 justify-start items-center'>
          <label className="block text-lg font-medium text-gray-700">City:</label>
          <span className='text-lg'>{vendor.city}</span>
        </div>
        <div className='flex gap-5 justify-start items-center'>
          <label className="block text-lg font-medium text-gray-700">Address:</label>
          <span className='text-lg'>{vendor.address}</span>
        </div>
        <div className='flex gap-5 justify-start items-center'>
          <label className="block text-lg font-medium text-gray-700">Bio:</label>
          <span className='text-lg'>{vendor.bio}</span>
        </div>
      </div>
    )}
  {activeTab === 'leads' && vendor && (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Leads</h3>
        <p>List of leads associated with the vendor</p>
      </div>
    )}
   {activeTab === 'businessListings' && vendor && (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Business Listings</h3>
        <p>List of business listings created by the vendor</p>
      </div>
    )}</div>
    </div>
  );
};

export default EditVendor;