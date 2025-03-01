import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import 'react-quill/dist/quill.snow.css';
import { State, City, Country } from 'country-state-city';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
type DayOfWeek =  'monday'  | 'tuesday'  | 'wednesday'  | 'thursday'  | 'friday' | 'saturday' | 'sunday';
type Hours = { open: string; close: string };
const BusinessListing = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [image, setImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>('');
  const [selectedState, setSelectedState] = useState<any>('');
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [state, setState] = useState<any>([]);
  const [pinCode, setPinCode] = useState<string>('');
  const [paymentModes, setPaymentModes] = useState<any>([]);
  const [businessService, setBusinessService] = useState<any[]>([]);
  const [hours, setHours] = useState<Record<DayOfWeek, Hours>>({
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  });
  const [businessName, setBusinessName] = useState<string>('');
  const [addedBy, setAddedBy] = useState<string>('');
  const [personName, setPersonName] = useState<string>('');
  const [number, setNumber] = useState<any>('');
  const [aboutYear, setAboutYear] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [status, setStatus] = useState<string>('Open');
  const [relevantTags, setRelevantTags] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [mapEmbedLink, setMapEmbedLink] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  const handleSubcategoryChange = (e: any) => {
    setSelectedSubcategory(e.target.value);
  };
  const handleCategoryChange = async (e: any) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    setSelectedSubcategory('');
    try {
      const response = await fetch(
        `http://localhost:5000/api/subcategories/${categorySlug}`,
      );
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  useEffect(() => {
    if (selectedCountry) {
      const indiaStates = State.getStatesOfCountry(selectedCountry);
      setSelectedState('');
      setState(indiaStates);
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedState) {
      const citiesList = City.getCitiesOfState(selectedCountry, selectedState);
      console.log('citiesList:', citiesList); 
      setSelectedCity('');
      setCities(citiesList);
    }
  }, [selectedState, selectedCountry]);
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleGalleryImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    if (files.length + galleryImages.length > 10) {
      alert('You can only select up to 10 gallery images.');
      return;
    }
    setGalleryImages([...galleryImages, ...files]);
  };
  const handlePaymentModesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentModes([e.target.value]);
  };
  const handleBusinessServiceChange = (e: any) => {
    setBusinessService(e);
  };
  const handleHoursChange = (
    day: DayOfWeek,
    field: 'open' | 'close',
    value: string,
  ) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('addedBy', addedBy);
    formData.append('businessName', businessName);
    formData.append('categoryId', selectedCategory);
    formData.append('subcategoryId', selectedSubcategory);
    formData.append('image', image);
    galleryImages.forEach((image) => formData.append('gallery', image));
    formData.append('location[country]', selectedCountry);
    formData.append('location[state]', selectedState);
    formData.append('location[city]', selectedCity);
    formData.append('location[pinCode]', pinCode);
    console.log(selectedCity, selectedState,state,cities,City,pinCode,'city');
    formData.append('personName', personName);
    formData.append('mobileNumber', number);
    Object.keys(hours).forEach((day) => {
      formData.append(
        `openingHours[${day}][open]`,
        hours[day as DayOfWeek].open,
      );
      formData.append(
        `openingHours[${day}][close]`,
        hours[day as DayOfWeek].close,
      );
    });
    formData.append('services', JSON.stringify(businessService));
    formData.append('paymentModes', JSON.stringify(paymentModes));
    formData.append(
      'aboutYear',
      aboutYear ? aboutYear.getFullYear().toString() : '',
    );
    formData.append('rating', rating.toString());
    formData.append('status', status);
    formData.append('title', title);
    formData.append('relevantTags', relevantTags);
    formData.append('keywords', keywords);
    formData.append('websiteUrl', websiteUrl);
    formData.append('about', about);
    formData.append('mapEmbedLink', mapEmbedLink);
    try {
      const response = await fetch(
        'http://localhost:5000/api/business/listing',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        setSuccessModal(true);
        navigate('/bussinesslisting');
      } else {
        setErrorModal(true);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setErrorModal(true);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Business Listing" />
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
      <form onSubmit={handleSubmit} className='flex flex-wrap gap-3'>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Added By
          </label>
          <input
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
            id="addedBy"
            name="addedBy"
            type="text"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Added By"
            required
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
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
            required
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Person Name
          </label>
          <input
            id="personName"
            name="personName"
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Person Name"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Mobile Number
          </label>
          <input
            id="number"
            name="number"
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Relevant Tags
          </label>
          <input
            id="relevantTags"
            name="relevantTags"
            type="text"
            value={relevantTags}
            onChange={(e) => setRelevantTags(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Relevant Tags (comma separated)"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Keywords
          </label>
          <input
            id="keywords"
            name="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Keywords (comma separated)"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Website URL
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Website URL"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Payment Modes
          </label>
          <div className="mt-2">
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentModes.includes('cash')}
                onChange={handlePaymentModesChange}
              />
              Cash
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="card"
                checked={paymentModes.includes('card')}
                onChange={handlePaymentModesChange}
              />
              Card
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="online"
                checked={paymentModes.includes('online')}
                onChange={handlePaymentModesChange}
              />
              Online
            </label>
          </div>
        </div>
        <div className="mb-4 w-full md:w-2/5" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            About Year
          </label>
          <DatePicker
            selected={aboutYear}
            onChange={(date: any) => setAboutYear(date)}
            showYearPicker
            dateFormat="yyyy"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
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

export default BusinessListing;