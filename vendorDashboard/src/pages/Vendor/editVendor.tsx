import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { State, City } from 'country-state-city'; 
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const EditVendor = () => {
    const [vendor, setVendor] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(''); 
    const [updatedVendor, setUpdatedVendor] = useState<any>(null); 
    const [states, setStates] = useState<any>([]);
    const [cities, setCities] = useState<any>([]);
    const { slug } = useParams(); 
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const fetchVendorDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/vendor/slug/${slug}`);
          if (!response.ok) {
            throw new Error('Failed to fetch vendor details');
          }
          const data = await response.json();
          console.log(data)
          setVendor(data);
          setUpdatedVendor(data);
         const indiaStates = State.getStatesOfCountry('IN');
          setStates(indiaStates);
          if (data.state) {
            const citiesList = City.getCitiesOfState('IN', data.state);
            setCities(citiesList);
          }
        } catch (error) {
          setError('Error fetching vendor details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchVendorDetails();
    }, [slug]);
  
    const handleStateChange = (stateCode: string) => {
      setUpdatedVendor((prev: any) => ({
        ...prev,
        state: stateCode,
        city: '', 
       }));
     const citiesList = City.getCitiesOfState('IN', stateCode);
      setCities(citiesList);
    };
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setUpdatedVendor((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/vendor/slug/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVendor),
      });
  
      if (response.ok) {
        navigate('/vendor');
      } else {
        setError('Failed to update vendor details');
      }
    };
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;  
  
    return (
    <div>
      <Breadcrumb pageName='Edit Vendor'/>
      <form onSubmit={handleUpdate} className='flex flex-wrap gap-3'>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={updatedVendor?.fullName || ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className='mb-4 w-full md:w-2/5'> 
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={updatedVendor?.email || ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className='mb-4 w-full md:w-2/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={updatedVendor?.mobileNumber || ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className='mb-4 w-full md:w-2/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Password:</label>
          <input
            type="password"
            name="password"
            value={updatedVendor?.password || ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className='mb-4 w-full md:w-2/5'>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Marital Status:</label>
            <select
              name="maritalStatus"
              value={updatedVendor?.maritalStatus || ''}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            >
              <option className="mt-2 w-full" value="">Select Marital Status</option>
              <option className="mt-2 w-full" value="married">Married</option>
              <option className="mt-2 w-full" value="unmarried">Unmarried</option>
            </select>
          </div>
          <div className='mb-4 w-full md:w-2/5'>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Gender:</label>
            <select
              name="gender"
              value={updatedVendor?.gender || ''}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            >
              <option className="mt-2 w-full" value="">Select Gender</option>
              <option className="mt-2 w-full" value="male">Male</option>
              <option className="mt-2 w-full" value="female">Female</option>
              <option className="mt-2 w-full" value="other">Other</option>
            </select>
          </div>
        <div className='mb-4 w-full md:w-1/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">State:</label>
          <select
            name="state"
            value={updatedVendor?.state || ''}
            onChange={(e) => handleStateChange(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          >
            <option value="" className="mt-2 w-full">Select State</option>
            {states?.map((state: any) => (
              <option key={state.isoCode} value={state.isoCode} className="mt-2 w-full">
                {state.name}
              </option>
            ))}
          </select>
        </div>
                <div className='mb-4 w-full md:w-1/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">City:</label>
          <select
              name="city"
              value={updatedVendor?.city || ''}
              onChange={(e) => handleChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            >
              <option value="" className="mt-2 w-full">Select City</option>
              {cities?.map((city: any) => (
                <option key={city.id} value={city.id} className="mt-2 w-full">
                  {city.name}
                </option>
              ))}
            </select>
        </div>
        <div className='mb-4 w-full md:w-2/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            id='dob'
            value={updatedVendor?.dob ? formatDate(updatedVendor.dob) : ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className='mb-4 w-full md:w-2/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Zipcode:</label>
          <input
            type="text"
            name="zipCode"
            id='zipCode'
            value={updatedVendor?.zipCode || ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <div className='mb-4 w-full md:w-2/5'>
          <label className="block text-sm font-medium text-gray-700 dark:text-white"> Area Profile:</label>
          <input
            type="text"
            name="areaProfile"
            value={updatedVendor?.areaProfile || ''}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
        </div>
        <button type="submit"   className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">Update Vendor</button>
      </form>
    </div>
  );
};

export default EditVendor;