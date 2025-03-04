import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import 'react-quill/dist/quill.snow.css';
import { State, City, Country } from 'country-state-city';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
type Hours = {open: string; close: string;};
const EditBusinessListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [image, setImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>('');
  const [selectedState, setSelectedState] = useState<any>('');
  const [selectedCity, setSelectedCity] = useState<any>('');
  const [cities, setCities] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [paymentModes, setPaymentModes] = useState<any[]>([]);
  const [businessService, setBusinessService] = useState<any[]>([]);
  const [hours, setHours] = useState<any>({});
  const [businessName, setBusinessName] = useState<string>('');
  const [addedBy, setAddedBy] = useState<string>('');
  const [personName, setPersonName] = useState<string>('');
  const [number, setNumber] = useState<any>('');
  const [aboutYear, setAboutYear] = useState<Date | null>(null);
  const [pincode, setPincode] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [relevantTags, setRelevantTags] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [mapEmbedLink, setMapEmbedLink] = useState<string>('');
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
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/subcategories/${selectedCategory}`
          );
          const data = await response.json();
          setSubCategories(data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };
      fetchSubcategories();
    }
  }, [selectedCategory]);
  const handleSubcategoryChange = (e: any) => {
    setSelectedSubcategory(e.target.value);
  };
  const handleCategoryChange = async (e: any) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    setSelectedSubcategory('');
  };
useEffect(() => {
    const fetchBusinessData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/business/listing/slug/${slug}`);
        const data = await response.json();
        if (data) {
          setBusinessName(data.businessName);
          setAddedBy(data.addedBy);
          setPersonName(data.personName);
          setNumber(data.mobileNumber);
          setSelectedCategory(data.categoryId);
          setSelectedSubcategory(data.subcategoryId);
          setSelectedCountry(data.location.country);
          setSelectedState(data.location.state);
          setSelectedCity(data.location.city);
          setImage(data.image)
          setGalleryImages(data.gallery);
          setHours(data.openingHours);
          setPaymentModes(data.paymentModes);
          setBusinessService(data.services);
          setAboutYear(new Date(data.aboutYear));
          setPincode(data.location.pinCode);
          setTitle(data.title);
          setRating(data.rating);
          setStatus(data.status);
          setRelevantTags(data.relevantTags.join(', '));
          setKeywords(data.keywords.join(', '));
          setWebsiteUrl(data.websiteUrl);
          setAbout(data.about);
          setMapEmbedLink(data.mapEmbedLink);

          if (data.image) {
            const image:any =`http://localhost:5173/src/images/uploads/image/${data.image}`
            setImagePreview(image);
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
    setPaymentModes((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((mode) => mode !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  const handleBusinessServiceChange = (selectedOptions: any) => {
    setBusinessService(selectedOptions.map((option: any) => option.value));
  };
  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
      setGalleryImagePreviews(file.map((files: File) => URL.createObjectURL(files)));
      setGalleryImages(file)
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
    formData.append('categoryId', selectedCategory);
    formData.append('subcategoryId', selectedSubcategory);
    if (image) {
      formData.append('image', image);
    }
    galleryImages.forEach((image) => formData.append('gallery', image));
    formData.append('location[country]', selectedCountry);
    formData.append('location[state]', selectedState);
    formData.append('location[city]', selectedCity);
    formData.append('location[pinCode]', pincode);
    formData.append('title', title);
    formData.append('rating', rating.toString());
    formData.append('status', status);
    formData.append('relevantTags', relevantTags.split(',').map(tag => tag.trim()).join(','));
    formData.append('keywords', keywords.split(',').map(keyword => keyword.trim()).join(','));
    formData.append('websiteUrl', websiteUrl);
    formData.append('about', about);
    formData.append('mapEmbedLink', mapEmbedLink);
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
        navigate('/bussinesslisting');
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
      <form onSubmit={handleSubmit} className='flex flex-wrap gap-3'>
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
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Relevant Tags</label>
          <input
            value={relevantTags}
            onChange={(e) => setRelevantTags(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Relevant Tags"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Keywords</label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Keywords"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Website URL</label>
          <input
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Website URL"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Map Embed Link</label>
          <input
            value={mapEmbedLink}
            onChange={(e) => setMapEmbedLink(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Map Embed Link"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Subcategory
          </label>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
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
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Title"
          />
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4 w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Status</label>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Status"
          />
        </div>
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
                  className="rounded-lg border border-stroke shadow-sm object-fit-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Business Location
          </label>
          <div className="grid grid-cols-4 gap-4">
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
                {cities.map((city:any) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Pincode</label>
          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Pincode"
          />
        </div>

          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Opening Hours
          </label>
          <div className="flex flex-wrap gap-5 p-5" >
            {[
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ].map((day) => (
              <div className="flex flex-col gap-3 " key={day}>
                <label className="text-sm font-medium text-gray-700 dark:text-white">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
                <div className="flex gap-4">
                <input
                  type="time"
                  value={hours[day as DayOfWeek]?.open || ''}
                  onChange={(e) =>
                    handleHoursChange(day as DayOfWeek, 'open', e.target.value)
                  }
                  className="mt-2  px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="time"
                  value={hours[day as DayOfWeek]?.close || ''}
                  onChange={(e) =>
                    handleHoursChange(day as DayOfWeek, 'close', e.target.value)
                  }
                  className="mt-2  px-4 py-2 border border-gray-300 rounded-md"
                />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 w-full md:w-2/5">
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
        <div className="mb-4 mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">About</label>
          <ReactQuill
            value={about}
            onChange={(e:any) => setAbout(e.target.value)}
            style={{ background: 'white' }}
            placeholder="Enter About Information"
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