// import React, { useState, useEffect, useRef } from 'react';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import { useNavigate } from 'react-router-dom';
// import MultiStepForm from 'react-multistep-form';
// import { TextInput, SelectInput, TextAreaInput, FileInput } from 'react-multistep-form/components';
// import 'react-quill/dist/quill.snow.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';
// import ReactQuill from 'react-quill';

// type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
// type Hours = { open: string; close: string };

// const BusinessListing = () => {
//   const navigate = useNavigate();
//   const [businessName, setBusinessName] = useState<string>('');
//   const [mobileNumber, setMobileNumber] = useState<string>('');
//   const [address, setAddress] = useState<string>('');
//   const [mapEmbedLink, setMapEmbedLink] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [openingHours, setOpeningHours] = useState<Record<DayOfWeek, Hours>>({
//     monday: { open: '', close: '' },
//     tuesday: { open: '', close: '' },
//     wednesday: { open: '', close: '' },
//     thursday: { open: '', close: '' },
//     friday: { open: '', close: '' },
//     saturday: { open: '', close: '' },
//     sunday: { open: '', close: '' },
//   });
//   const [category, setCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//    const [selectedCategory, setSelectedCategory] = useState<any>('');
//     const [selectedSubcategory, setSelectedSubcategory] = useState<any>('');
//   const [about, setAbout] = useState<string>('');
//   const [image, setImage] = useState<File | null>(null);
//   const [galleryImages, setGalleryImages] = useState<any[]>([]);
//   const [relevantTags, setRelevantTags] = useState<string>('');
//   const [keywords, setKeywords] = useState<string>('');
//   const [paymentModes, setPaymentModes] = useState<string[]>([]);
//   const [websiteUrl, setWebsiteUrl] = useState<string>('');
//   const [services, setServices] = useState<string[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [subCategories, setSubCategories] = useState<any[]>([]);

//   useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           const response = await fetch('http://localhost:5000/api/categories');
//           const data = await response.json();
//           setCategories(data);
//         } catch (error) {
//           console.error('Error fetching categories:', error);
//         }
//       };
//       fetchCategories();
//     }, []);
//     const handleSubcategoryChange = (e: any) => {
//       setSelectedSubcategory(e.target.value);
//     };
//     const handleCategoryChange = async (e: any) => {
//       const categorySlug = e.target.value;
//       setSelectedCategory(categorySlug);
//       setSelectedSubcategory('');
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/subcategories/${categorySlug}`,
//         );
//         const data = await response.json();
//         setSubCategories(data);
//       } catch (error) {
//         console.error('Error fetching subcategories:', error);
//       }
//     };
//   const handleBusinessServiceChange = (e: any) => {
//     setServices(e);
//   };
//   const tabChanged = ({
//     prevIndex,
//     nextIndex,
//   }: {
//     prevIndex: number;
//     nextIndex: number;
//   }) => {
//     console.log("prevIndex", prevIndex);
//     console.log("nextIndex", nextIndex);
//   };
//  const handleHoursChange = (
//     day: DayOfWeek,
//     field: 'open' | 'close',
//     value: string,
//   ) => {
//     setOpeningHours((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [field]: value,
//       },
//     }));
//   };
//     const handlePaymentModesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setPaymentModes([e.target.value]);
//     };
//   const handleImageChange = (e: any) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };
//   const handleGalleryImageChange = (e: any) => {
//     const files = Array.from(e.target.files);
//     if (files.length + galleryImages.length > 10) {
//       alert('You can only select up to 10 gallery images.');
//       return;
//     }
//     setGalleryImages([...galleryImages, ...files]);
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('businessName', businessName);
//     formData.append('mobileNumber', mobileNumber);
//     formData.append('address', address);
//     formData.append('mapEmbedLink', mapEmbedLink);
//     formData.append('email', email);
//     formData.append('openingHours', JSON.stringify(openingHours));
//     formData.append('category', category);
//     formData.append('subcategory', subcategory);
//     formData.append('about', about);
//     if (image) formData.append('image', image);
//     galleryImages.forEach((img) => formData.append('galleryImages', img));
//     formData.append('relevantTags', relevantTags);
//     formData.append('keywords', keywords);
//     formData.append('paymentModes', JSON.stringify(paymentModes));
//     formData.append('websiteUrl', websiteUrl);
//     formData.append('services', JSON.stringify(services));

//     try {
//       const response = await fetch('http://localhost:5000/api/business/listing', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         navigate('/businesslisting');
//       } else {
//         alert('Failed to create business listing');
//       }
//     } catch (error) {
//       console.error('Error during submission:', error);
//       alert('Error occurred while submitting the form.');
//     }
//   };
//   return (
//     <div className="container mx-auto p-6">
//       <Breadcrumb pageName="Business Listing" />
//       <form onSubmit={handleSubmit}  className="flex flex-wrap gap-3">
//         <div className="w-full">
//         <FormWizard onTabChange={tabChanged}  onComplete={()=>handleSubmit}>
//             <FormWizard.TabContent title="Personal details">
//             <h3 className="text-xl font-semibold mb-4">Step 1</h3>
//               <div className="mb-4 w-1/2 md: w-full">
//                 <label className="block text-sm font-medium  text-gray-700 dark:text-white">
//                   Business Name
//                 </label>
//                 <input
//                   id="businessName"
//                   name="businessName"
//                   type="text"
//                   value={businessName}
//                   onChange={(e) => setBusinessName(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 border mr-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
//                   placeholder="Enter Business Name"
//                   required
//                 />
//               </div>
//               <div className="mb-4 w-1/2 md: w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={email}
//                   placeholder="Enter Email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 ml-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
//                 />
//               </div>
//               <div className="mb-4 w-1/2 md: w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Mobile Number
//                 </label>
//                 <input
//                   id="number"
//                   name="mobileNumber"
//                   type="tel"
//                   value={mobileNumber}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 mr-3 border border-gray-300 rounded-md"
//                   placeholder="Enter Mobile Number"
//                 />
//               </div>
//               <div className="mb-4 w-1/2 md: w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={address}
//                   placeholder="Enter Current Address"
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 ml-3 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="mb-4 w-full md: w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Map Embed Link
//                 </label>
//                 <input
//                   type="text"
//                   name="mapEmbedLink"
//                   value={mapEmbedLink}
//                   placeholder="iframe Link  "
//                   onChange={(e) => setMapEmbedLink(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <button
//                 type="button" 
//                 className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
//               >
//                 Next
//               </button>
//             </FormWizard.TabContent>
            
//             <FormWizard.TabContent title="Bussiness details">
//             <h3 className="text-xl font-semibold mb-4">Step 2</h3>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Opening Hours
//                 </label>
//                 <div className="flex flex-wrap gap-5 p-5">
//                   {[
//                     'monday',
//                     'tuesday',
//                     'wednesday',
//                     'thursday',
//                     'friday',
//                     'saturday',
//                     'sunday',
//                   ].map((day) => (
//                     <div className="flex flex-col gap-3 " key={day}>
//                       <label className="text-sm font-medium text-gray-700 dark:text-white">
//                         {day.charAt(0).toUpperCase() + day.slice(1)}
//                       </label>
//                       <div className="flex gap-4">
//                         <input
//                           type="time"
//                           value={openingHours[day as DayOfWeek]?.open || ''}
//                           onChange={(e) =>
//                             handleHoursChange(
//                               day as DayOfWeek,
//                               'open',
//                               e.target.value,
//                             )
//                           }
//                           className="mt-2  px-4 py-2 border border-gray-300 rounded-md"
//                         />
//                         <input
//                           type="time"
//                           value={openingHours[day as DayOfWeek]?.close || ''}
//                           onChange={(e) =>
//                             handleHoursChange(
//                               day as DayOfWeek,
//                               'close',
//                               e.target.value,
//                             )
//                           }
//                           className="mt-2 px-4 py-2 border border-gray-300 rounded-md"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label
//                   htmlFor="category"
//                   className="block text-sm font-medium text-gray-700 dark:text-white"
//                 >
//                   Category
//                 </label>
//                 <select
//                   value={selectedCategory}
//                   onChange={handleCategoryChange}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories?.map((category) => (
//                     <option key={category._id} value={category.slug}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Subcategory
//                 </label>
//                 <select
//                   value={selectedSubcategory}
//                   onChange={handleSubcategoryChange}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                   required
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subCategories?.map((subcategory) => (
//                     <option key={subcategory._id} value={subcategory.slug}>
//                       {subcategory.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Business Service
//                 </label>
//                 <Select
//                   isMulti
//                   options={[
//                     { value: 'service1', label: 'Service 1' },
//                     { value: 'service2', label: 'Service 2' },
//                   ]}
//                   onChange={handleBusinessServiceChange}
//                   className="mt-2"
//                 />
//               </div>
//               <div className="mb-4 w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   About
//                 </label>
//                 <ReactQuill
//                   style={{ background: 'white' }}
//                   value={about}
//                   onChange={setAbout}
//                 />
//               </div>
//               <button
//                 type="button"
//                 className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
//               >
//                 Next
//               </button>
//             </FormWizard.TabContent>

//             <FormWizard.TabContent title="Bussiness Images">
//             <h3 className="text-xl font-semibold mb-4">Step 2</h3>
//               <div className="mb-4 w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Image
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//                 {image && (
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt="Business"
//                     className="mt-2 w-24 h-24 object-cover"
//                   />
//                 )}
//               </div>
//               <div className="mb-4 w-full">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Gallery Images(Max 10)
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleGalleryImageChange}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//                 <div className="mt-2">
//                   {galleryImages.map((image, index) => (
//                     <img
//                       key={index}
//                       src={URL.createObjectURL(image)}
//                       alt="Gallery"
//                       className="inline-block w-24 h-24 object-cover mr-2"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <button
//                 type="button" 
//                 className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
//               >
//                 Next
//               </button>
//             </FormWizard.TabContent>

//             <FormWizard.TabContent title="Additional Info">
//             <h3 className="text-xl font-semibold mb-4">Step 4</h3>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Relevant Tags
//                 </label>
//                 <input
//                   id="relevantTags"
//                   name="relevantTags"
//                   type="text"
//                   value={relevantTags}
//                   onChange={(e) => setRelevantTags(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter Relevant Tags (comma separated)"
//                 />
//               </div>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Keywords
//                 </label>
//                 <input
//                   id="keywords"
//                   name="keywords"
//                   type="text"
//                   value={keywords}
//                   onChange={(e) => setKeywords(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter Keywords (comma separated)"
//                 />
//               </div>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Website URL
//                 </label>
//                 <input
//                   id="websiteUrl"
//                   name="websiteUrl"
//                   type="url"
//                   value={websiteUrl}
//                   onChange={(e) => setWebsiteUrl(e.target.value)}
//                   className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter Website URL"
//                 />
//               </div>
//               <div className="mb-4 w-full md:w-2/5">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-white">
//                   Payment Modes
//                 </label>
//                 <div className="mt-2">
//                   <label>
//                     <input
//                       type="radio"
//                       value="cash"
//                       checked={paymentModes.includes('cash')}
//                       onChange={handlePaymentModesChange}
//                     />
//                     Cash
//                   </label>
//                   <label className="ml-4">
//                     <input
//                       type="radio"
//                       value="card"
//                       checked={paymentModes.includes('card')}
//                       onChange={handlePaymentModesChange}
//                     />
//                     Card
//                   </label>
//                   <label className="ml-4">
//                     <input
//                       type="radio"
//                       value="online"
//                       checked={paymentModes.includes('online')}
//                       onChange={handlePaymentModesChange}
//                     />
//                     Online
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
//               >
//                 Next
//               </button>
//             </FormWizard.TabContent>
//           </FormWizard>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BusinessListing;