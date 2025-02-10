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
  const [dob, setDob] = useState<any>(null);
  const [gender, setGender] = useState<any>('');
  const [city, setCity] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [matriculationStatus, setMatriculationStatus] = useState<any>('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [areaProfile, setAreaProfile] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const indiaStates = State.getStatesOfCountry('IN');
    setState(indiaStates);
  }, []);
  useEffect(() => {
    if (selectedState) {
      const citiesList = City.getCitiesOfState('IN', selectedState); 
      setCity(citiesList);
    }
  }, [selectedState]);
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];
  const matriculationStatusOptions = [
    { value: 'married', label: 'Married' },
    { value: 'unmarried', label: 'Unmarried' },
  ];  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const vendorData = {
      fullName,
      email,
      mobileNumber,
      password,
      maritalStatus: matriculationStatus?.value,
      gender: gender?.value,
      dob,
      state: selectedState,
      city: selectedCity,
      zipCode: zipcode,
      areaProfile,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });
      if (response.ok) {
        setSuccessModal(true);
        navigate('/vendor')
      } else {
        const errorData = await response.json();
        console.log("Error Data:", errorData);
        setErrorModal(true);
      }
    } catch (error) {
      setErrorModal(true);
      console.error("Error creating vendor:", error);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Create Vendor" />
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Full Name</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
          <input
            id="Email"
            name="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Mobile Number</label>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Matriculation Status</label>
          <Select
            options={matriculationStatusOptions}
            value={matriculationStatus}
            onChange={(e) => setMatriculationStatus(e)}
            placeholder="Select Matriculation Status"
            className="mt-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Gender</label>
          <Select
            options={genderOptions}
            value={gender}
            onChange={(e) => setGender(e)}
            placeholder="Select Gender"
            className="mt-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Date of Birth</label>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            placeholderText="Select Date"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">State</label>
          <select
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          >
            <option value="">Select State</option>
            {state?.map((states: any, index: any) => (
              <option key={index} value={states.isoCode}>
                {states.name}
              </option>
            ))}
          </select>
        </div>
        {selectedState && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              City
            </label>
            <select
              onChange={(e) => setSelectedCity(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            >
              <option value="">Select City</option>
              {city.map((cities: any) => (
                <option key={cities.id} value={cities.id}>
                  {cities.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Zipcode</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Zipcode"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Area Profile</label>
          <textarea
            id="areaProfile"
            name="areaProfile"
            value={areaProfile}
            onChange={(e) => setAreaProfile(e.target.value)} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Describe Area Profile"
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