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
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedVendor, setUpdatedVendor] = useState<any>({}); 
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
        setVendor(data);
        setUpdatedVendor(data); 
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
    try {
      const response = await fetch(`http://localhost:5000/api/vendor/slug/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVendor), 
      });
      const data= response.json();
      if (response.ok) {
        setVendor(data)
        setUpdatedVendor(data);
      }else{ 
        throw new Error('Failed to update vendor data');}
      setSuccessModal(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating vendor:', error);
      setErrorModal(true);
    }
  };
  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedVendor((prev:any) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Vendor Profile Page" />
      {successModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">Success!</h4>
            <p>Your profile has been successfully updated.</p>
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
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <img
                src={
                  `http://localhost:5173/src/images/profile_image/${vendor.profilepicture}` ||
                  'default-image-url'
                }
                alt="Profile"
              />
            </div>
            <button  onClick={() => setIsEditing(true)} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                ></path>
              </svg>
              Edit
            </button>
          </div>
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
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={updatedVendor.username}
                    onChange={handleEditChange}
                    className="text-lg p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={updatedVendor.email}
                    onChange={handleEditChange}
                    className="text-lg p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Mobile Number:
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={updatedVendor.mobileNumber}
                    onChange={handleEditChange}
                    className="text-lg p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    City:
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={updatedVendor.city}
                    onChange={handleEditChange}
                    className="text-lg p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={updatedVendor.address}
                    onChange={handleEditChange}
                    className="text-lg p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Bio:
                  </label>
                  <textarea
                    name="bio"
                    value={updatedVendor.bio}
                    onChange={handleEditChange}
                    className="text-lg p-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md ml-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Name:
                  </label>
                  <span className="text-lg">{vendor.username}</span>
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Email:
                  </label>
                  <span className="text-lg">{vendor.email}</span>
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Mobile Number:
                  </label>
                  <span className="text-lg">{vendor.mobileNumber}</span>
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    City:
                  </label>
                  <span className="text-lg">{vendor.city}</span>
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Address:
                  </label>
                  <span className="text-lg">{vendor.address}</span>
                </div>
                <div className="flex gap-5 justify-start items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Bio:
                  </label>
                  <span className="text-lg">{vendor.bio}</span>
                </div>
              </>
            )}
          </div>
        )}
              {activeTab === 'leads' && vendor && (
        <div className="bg-white p-6">
          <h3 className="text-lg font-semibold">Leads</h3>
          <p>List of leads associated with the vendor</p>
        </div>
      )}

      {activeTab === 'businessListings' && vendor && (
        <div className="bg-white p-6">
          <h3 className="text-lg font-semibold">Business Listings</h3>
          <p>List of business listings created by the vendor</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default EditVendor;