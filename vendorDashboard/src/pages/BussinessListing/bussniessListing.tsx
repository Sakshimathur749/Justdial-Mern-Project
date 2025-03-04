import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import FormWizard from 'react-form-wizard-component';
import 'react-form-wizard-component/dist/style.css';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import ReactQuill from 'react-quill';

type DayOfWeek = | 'monday'  | 'tuesday'  | 'wednesday'  | 'thursday'  | 'friday'  | 'saturday'  | 'sunday';
type Hours = { open: string; close: string };

const BusinessListing = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [mapEmbedLink, setMapEmbedLink] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [openingHours, setOpeningHours] = useState<Record<DayOfWeek, Hours>>({
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>('');
  const [about, setAbout] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [relevantTags, setRelevantTags] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [paymentModes, setPaymentModes] = useState<string[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
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
  const handleBusinessServiceChange = (e: any) => {
    setServices(e);
  };
  const handleHoursChange = (
    day: DayOfWeek,
    field: 'open' | 'close',
    value: string,
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };
  const handlePaymentModesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPaymentMode = e.target.value;
   setPaymentModes([selectedPaymentMode]);
  };
  
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
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('businessName', businessName);
    formData.append('mobileNumber', mobileNumber);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('categoryId', selectedCategory);
    formData.append('subcategoryId', selectedSubcategory);
    formData.append('openingHours', JSON.stringify(openingHours));
    formData.append('mapEmbedLink', mapEmbedLink);
    formData.append('about', about);
    if (image) formData.append('image', image);
    galleryImages.forEach((img) => formData.append('gallery', img));
    formData.append('relevantTags', relevantTags);
    formData.append('keywords', keywords);
    formData.append('paymentModes', JSON.stringify(paymentModes));
    formData.append('websiteUrl', websiteUrl);
    formData.append('services', JSON.stringify(services));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:5000/api/business/listing',
        {
          headers:  { Authorization: `Bearer ${token}`,},
          method: 'POST',
          body: formData,
        },
      );
        const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setSuccessModal(true);
      } else {
        setErrorModal(true);
      }
    } catch (error) {
      setErrorModal(true);
      console.error('Error during submission:', error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Business Listing" />
      <form  className="flex flex-wrap gap-3">
        <div className="w-full bg-white px-10 py-5  ">
          <FormWizard  onComplete={handleSubmit}>
            <FormWizard.TabContent title="Personal details">
              <h3 className="text-xl font-semibold mb-4">Step 1</h3>
              <div className="flex flex-wrap justify-between text-start">
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium  text-gray-700 dark:text-white">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="mt-2 w-100 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                    placeholder="Enter Business Name"
                    required
                  />
                </div>
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-100 w-md-50 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                  />
                </div>
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Mobile Number
                  </label>
                  <input
                    id="number"
                    name="mobileNumber"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="mt-2 w-100 w-md-50 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                    placeholder="Enter Mobile Number"
                  />
                </div>
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Enter Current Address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 w-100 w-md-50 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                  />
                </div>
                <div className="mb-4 col-12">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Map Embed Link
                  </label>
                  <input
                    type="text"
                    name="mapEmbedLink"
                    value={mapEmbedLink}
                    placeholder="iframe Link  "
                    onChange={(e) => setMapEmbedLink(e.target.value)}
                    className="mt-2 w-100  px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                  />
                </div>
              </div>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Bussiness details">
              <h3 className="text-xl font-semibold mb-4">Step 2</h3>
              <div className="mb-4 col-12 text-start">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Opening Hours
                </label>
                <div className="p-5">
                  <div className="flex flex-wrap">
                    {[
                      'monday',
                      'tuesday',
                      'wednesday',
                      'thursday',
                      'friday',
                      'saturday',
                      'sunday',
                    ].map((day) => (
                      <div className="col-12 col-md-4 mb-3" key={day}>
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex gap-4 items-center">
                            <label className="text-sm pr-3 font-medium text-gray-700 dark:text-white">
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </label>
                            <input
                              type="time"
                              value={openingHours[day as DayOfWeek]?.open || ''}
                              onChange={(e) =>
                                handleHoursChange(
                                  day as DayOfWeek,
                                  'open',
                                  e.target.value,
                                )
                              }
                              className="mt-2 px-4 py-2 mr-3 border border-gray-300 rounded-md"
                            />
                            <input
                              type="time"
                              value={
                                openingHours[day as DayOfWeek]?.close || ''
                              }
                              onChange={(e) =>
                                handleHoursChange(
                                  day as DayOfWeek,
                                  'close',
                                  e.target.value,
                                )
                              }
                              className="mt-2 px-4 py-2 mr-3 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap  gap-8">
                <div className="mb-4 col-12  text-start ">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="mt-2 w-70 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 col-12 text-start ">
                  <label className="block text-sm font-medium text-gray-700">
                    Subcategory
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={handleSubcategoryChange}
                    className="mt-2 w-70 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories?.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory.slug}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 col-12 text-start ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Business Service
                  </label>
                  <Select
                    isMulti
                    options={[
                      { value: 'service1', label: 'Service 1' },
                      { value: 'service2', label: 'Service 2' },
                    ]}
                    onChange={handleBusinessServiceChange}
                    className="mt-2 w-70"
                  />
                </div>
              </div>
              <div className="mb-4 w-full text-start">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  About
                </label>
                <ReactQuill
                  style={{ background: 'white' }}
                  value={about}
                  onChange={setAbout}
                />
              </div>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Bussiness Images">
              <h3 className="text-xl font-semibold mb-4">Step 3</h3>
              <div className="mb-4 text-start">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Image
                </label>
                <input
                name='image'
                  type="file"
                  onChange={handleImageChange}
                  className="mt-2 w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Business"
                    className="mt-2 w-24 h-24 object-cover"
                  />
                )}
              </div>
              <div className="mb-4 text-start">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Gallery Images(Max 10)
                </label>
                <input
                name='gallery'
                  type="file"
                  multiple
                  onChange={handleGalleryImageChange}
                  className="mt-2 w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                />
                <div className="mt-2">
                  {galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt="Gallery"
                      className="inline-block w-24 h-24 object-cover mr-2"
                    />
                  ))}
                </div>
              </div>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Additional Info">
              <h3 className="text-xl font-semibold mb-4">Step 4</h3>
              <div className="flex flex-wrap justify-between text-start">
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Relevant Tags
                  </label>
                  <input
                    id="relevantTags"
                    name="relevantTags"
                    type="text"
                    value={relevantTags}
                    onChange={(e) => setRelevantTags(e.target.value)}
                    className="mt-2 w-100 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                    placeholder="Enter Relevant Tags (comma separated)"
                  />
                </div>
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Keywords
                  </label>
                  <input
                    id="keywords"
                    name="keywords"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="mt-2 w-100 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                    placeholder="Enter Keywords (comma separated)"
                  />
                </div>
                <div className="mb-4 col-12  ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Website URL
                  </label>
                  <input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="mt-2 w-100 px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                    placeholder="Enter Website URL"
                  />
                </div>
                <div className="mb-4 col-12">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Payment Modes
                  </label>
                  <div className="mt-2">
                    <select
                     value={paymentModes[0] || ''}
                      onChange={handlePaymentModesChange}
                      className="form-select mt-2 block w-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                </div>
              </div>
            </FormWizard.TabContent>
          </FormWizard>
        </div>
        {successModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold">Success!</h4>
              <p>Your business listing has been successfully submitted.</p>
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
      </form>
    </div>
  );
};

export default BusinessListing;