import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import 'react-quill/dist/quill.snow.css';
import { State, City, Country } from 'country-state-city';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
type Hours = {open: string; close: string;};
const EditBusinessListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [image, setImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [productImages, setProductImages] = useState<any[]>([]);
  const [productImagePreview, setProductImagePreview] = useState<string[]>([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>('');
  const [selectedState, setSelectedState] = useState<any>('');
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [state, setState] = useState<any>([]);
  const [paymentModes, setPaymentModes] = useState<any[]>([]);
  const [businessService, setBusinessService] = useState<any[]>([]);
  const [hours, setHours] = useState<any>({});
  const [businessName, setBusinessName] = useState<string>('');
  const [addedBy, setAddedBy] = useState<string>('');
  const [personName, setPersonName] = useState<string>('');
  const [number, setNumber] = useState<any>('');
  const [aboutYear, setAboutYear] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
useEffect(() => {
    const fetchBusinessData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/business/listing/slug/${slug}`);
        const data = await response.json();
        console.log(data)
        console.log("image:",data.image,"GalleryImage:",data.gallery,"ProductImage:",data.ProductImages)        
        if (data) {
          setBusinessName(data.businessName);
          setAddedBy(data.addedBy);
          setPersonName(data.personName);
          setNumber(data.mobileNumber);
          setSelectedCategory(data.mainCategory);
          setSelectedSubcategory(data.subCategory);
          setSelectedCountry(data.location.country);
          setSelectedState(data.location.state);
          setSelectedCity(data.location.city);
          setImage(data.image)
          setGalleryImages(data.gallery);
          setProductImages(data.ProductImages);
          setHours(data.openingHours);
          setPaymentModes(data.paymentModes);
          setBusinessService(data.services);
          setAboutYear(new Date(data.aboutYear));
          if (data.image) {
            const image:any =`http://localhost:5173/src/images/uploads/image/${data.image}`
            setImagePreview(image);
          }
          if(data.ProductImages && data.ProductImages.length > 0) {
            const productImages = data.ProductImages.map(
              (image: any) => `http://localhost:5173/src/images/uploads/productImages/${image}`
            );
            setProductImages(productImages)
            setProductImagePreview(productImages)
          }
          if (data.gallery && data.gallery.length > 0) {
            const galleryPreviews = data.gallery.map(
              (image: any) => `http://localhost:5173/src/images/uploads/gallery/${image}`
            );
            setGalleryImagePreviews(galleryPreviews);
          }
          const stateCities = City.getCitiesOfState(data.location.country, data.location.state);
          setCities(stateCities);
          const countryStates = State.getStatesOfCountry(data.location.country);
          setState(countryStates);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchBusinessData();
    }
  }, [slug]);
  const handlePaymentModesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  if (paymentModes.includes(value)) {
    setPaymentModes(paymentModes.filter((mode) => mode !== value));
  } else {
    setPaymentModes([...paymentModes, value]);
  }
  };
  const handleBusinessServiceChange = (selectedOptions: any) => {
    setBusinessService(selectedOptions.map((option: any) => option.value));
  };
  const handleCategoryChange = async (e: any) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    setSelectedSubcategory('');
    try {
      const response = await fetch(`http://localhost:5000/api/subcategories/${categorySlug}`);
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  const handleRemoveImage = (index: number) => {
    const updatedGalleryPreviews = [...galleryImagePreviews];
    const updatedGalleryImages = [...galleryImages];
    updatedGalleryPreviews.splice(index, 1);
    updatedGalleryImages.splice(index, 1);
    setGalleryImagePreviews(updatedGalleryPreviews);
    setGalleryImages(updatedGalleryImages);
  };
  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
      setGalleryImagePreviews(file.map((files: File) => URL.createObjectURL(files)));
      setGalleryImages(file)
    }
  };
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
     setProductImagePreview(file.map((files: File) => URL.createObjectURL(files)));
      setProductImages(file)
    }
  };
  const handleHoursChange = (day: string, field: string, value: string) => {
    setHours((prev:any) => ({...prev,[day]: {...prev[day],[field]: value,},}));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('addedBy', addedBy);
    formData.append('businessName', businessName);
    formData.append('mainCategory', selectedCategory);
    formData.append('subCategory', selectedSubcategory);
    if (image) {
      formData.append('image', image);
    }
    galleryImages.forEach((image) => formData.append('gallery', image));
    productImages.forEach((image) => formData.append('productImages', image));
    formData.append('location[country]', selectedCountry);
    formData.append('location[state]', selectedState);
    formData.append('location[city]', selectedCity);
    formData.append('personName', personName);
    formData.append('mobileNumber', number);
    Object.keys(hours).forEach((day) => {
      formData.append(`openingHours[${day}][open]`, hours[day].open);
      formData.append(`openingHours[${day}][close]`, hours[day].close);
    });
    formData.append('services', JSON.stringify(businessService));
    formData.append('paymentModes', JSON.stringify(paymentModes));
    formData.append('aboutYear', aboutYear ? aboutYear.getFullYear().toString() : '');
    try {
      const response = await fetch(`http://localhost:5000/api/business/listing/${slug}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setImagePreview(updatedProduct.image
          ? `http://localhost:5173/src/images/uploads/image/${updatedProduct.image}`
          : null
        );
        if (updatedProduct.gallery) {
          const galleryPreviews = updatedProduct.gallery.map(
            (image: any) => `http://localhost:5173/src/images/uploads/gallery/${image}`
          );
          setGalleryImagePreviews(galleryPreviews);
        }
        if(updatedProduct.ProductImages){
         const productImages= updatedProduct.ProductImages.map(
           (image: any) =>`http://localhost:5173/src/images/uploads/productImages/${updatedProduct.image}`
         )
          setProductImagePreview(productImages)
        }
        navigate('/businesslisting');
      } else {
        alert('Error updating business');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Edit Business Listing" />
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Added By
          </label>
          <input
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter Added By"
            required
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Business Name
          </label>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Business Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Person Name
          </label>
          <input
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Person Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Mobile Number
          </label>
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Mobile Number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Subcategory
          </label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((subcategory) => (
              <option key={subcategory.slug} value={subcategory.slug}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Image
          </label>
          <input
            type="file"
            onChange={(e: any) => setImage(e.target.files[0])}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="General Image"
                height={80}
                width={150}
                className="rounded-lg border border-stroke shadow-sm"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Gallery Images (Max 10)
          </label>
          <input
            type="file"
            multiple
            onChange={handleGalleryImageChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {galleryImagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`gallery-image-${index}`}
                  height={80}
                  width={150}
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg border border-stroke shadow-sm"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Product Images (Max 5)
          </label>
          <input
            type="file"
            onChange={handleProductImageChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {productImagePreview.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`product-images-${index}`}
                  height={80}
                  width={150}
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg border border-stroke shadow-sm"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Business Location
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select State</option>
                {state.map((stateItem: any) => (
                  <option key={stateItem.isoCode} value={stateItem.isoCode}>
                    {stateItem.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Opening Hours
          </label>
          <div className="flex  gap-5 p-5" style={{ flexDirection: 'column' }}>
            {[
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ].map((day) => (
              <div className="flex gap-5 " key={day}>
                <label className="flex justify-center items-center text-sm font-medium text-gray-700 dark:text-white">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
                <input
                  type="time"
                  value={hours[day as DayOfWeek]?.open || ''}
                  onChange={(e) =>
                    handleHoursChange(day as DayOfWeek, 'open', e.target.value)
                  }
                  className="mt-2 w-1/6 px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="time"
                  value={hours[day as DayOfWeek]?.close || ''}
                  onChange={(e) =>
                    handleHoursChange(day as DayOfWeek, 'close', e.target.value)
                  }
                  className="mt-2 w-1/6 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Payment Modes
          </label>
          <div className="flex flex-wrap gap-4">
            {['cash', 'card', 'online', 'other'].map((mode) => (
              <div key={mode} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={mode}
                  checked={paymentModes.includes(mode)}
                  onChange={handlePaymentModesChange}
                  className="form-checkbox"
                />
                <span className="ml-2 capitalize">{mode}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Business Services
          </label>
          <Select
            isMulti
            options={categories.map((category) => ({
              value: category.slug,
              label: category.name,
            }))}
            value={
              businessService?.map((service) => ({
                value: service,
                label: service,
              })) || []
            }
            onChange={handleBusinessServiceChange}
          />
        </div>
        <div className="mb-4">
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
          className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBusinessListing;