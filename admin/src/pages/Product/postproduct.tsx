import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../css/app.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
const ProductPostPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>({
    image: '',
    category: '',
    subcategory:'',
    title: '',
    location: '',
    rating: 1,
    number: '',
    status: 'Open',
    relevantTags: '',
    websiteUrl: '',
    about: '',
    mapEmbedLink: '',
    keywords: '',
    productImages: [],
    gallery:[]
  });
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

  const handleCategoryChange = async (e:any) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    setProductData((prevData: any) => ({ ...prevData, category: categorySlug }));
    setSelectedSubcategory('');
    try {
      const response = await fetch(`http://localhost:5000/api/subcategories/${categorySlug}`);
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSubcategoryChange = (e:any) => {
    const subcategorySlug = e.target.value;
    setSelectedSubcategory(e.target.value);
    setProductData((prevData: any) => ({ ...prevData, subcategory: subcategorySlug }));
  };
  const handleMainImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setProductData((prevData: any) => ({ ...prevData, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newProductImages = Array.from(files);
      setProductImagePreview(newProductImages.map((file) => URL.createObjectURL(file)));
      setProductData((prevData: any) => ({
        ...prevData,
        productImages: newProductImages,
      }));
    }
  };
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newGalleryImages = Array.from(files);
      setGalleryPreview(newGalleryImages.map((file) => URL.createObjectURL(file)));
      setProductData((prevData: any) => ({
        ...prevData,
        gallery: newGalleryImages,
      }));
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setProductData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const handleQuillChange = (value: string) => {
    setProductData((prevData: any) => ({ ...prevData, about: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedCategory || !selectedSubcategory) {
      alert('Please select a category and subcategory.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('categoryId', selectedCategory);  
    formData.append('subcategoryId', selectedSubcategory);
    formData.append('location', productData.location);
    formData.append('rating', productData.rating.toString());
    formData.append('phoneNumber', productData.number);
    formData.append('status', productData.status);
    formData.append('relevantTags', productData.relevantTags);  
    formData.append('websiteUrl', productData.websiteUrl);
    formData.append('mapEmbedLink', productData.mapEmbedLink);
    formData.append('about', productData.about);
    formData.append('keywords', productData.keywords); 
    if (productData.image instanceof File) {
      formData.append('image', productData.image);
    }
    productData.productImages.forEach((file: File) => {
      formData.append('productImages', file);
    });
    productData.gallery.forEach((file: File) => {
      formData.append('gallery', file);
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
  
      const result = await response.json();
      setSuccessModal(true);
      setProductData({
        image: '',
        category: '',
        subcategory: '',
        title: '',
        location: '',
        rating: 1,
        number: '',
        status: 'Open',
        relevantTags: '',
        websiteUrl: '',
        mapEmbedLink: '',
        about: '',
        keywords: '',
        productImages: [],
        gallery: []
      });
      setGalleryPreview([]);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting product:', error);
      setErrorModal(true); 
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Create Product Post" />
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
        <div className="mb-4" >
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Main Image
          </label>
          <input
            type="file"
            onChange={handleMainImagePreview} style={{background:'white'}} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            name="image"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Product Preview"
                height={80}
                width={150} style={{objectFit:'contain'}}
                className="rounded-lg border border-stroke shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Product Images (Multiple)
          </label>
          <input
            type="file" style={{background:'white'}} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            multiple
            name="productImages"
            onChange={handleProductImagesChange}
          />
          {productImagePreview.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {productImagePreview.map((fileUrl, index) => (
                <div key={index} className="w-full max-w-xs">
                  <img
                    src={fileUrl}
                    alt={`Product Image ${index + 1}`}
                    height={80}
                    width={150} style={{objectFit:'contain'}}
                    className="rounded-lg border border-stroke shadow-sm"                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Gallery Images
          </label>
          <input
            type="file" style={{background:'white'}} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            multiple
            name="gallery"
            onChange={handleGalleryChange}
          />
        </div>

        {galleryPreview.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {galleryPreview.map((fileUrl, index) => (
              <div key={index} className="w-full max-w-xs">
                <img
                  src={fileUrl}
                  alt={`Gallery Image ${index + 1}`}
                  height={80}
                  width={150} style={{objectFit:'contain'}}
                  className="rounded-lg border border-stroke shadow-sm"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Keywords (comma separated)
          </label>
          <input
            id="keywords"
            name="keywords"
            type="text"
            value={productData.keywords}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter keywords"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subcategory</label>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory.slug}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={productData.title}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={productData.location}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter location"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Phone Number
          </label>
          <input
            id="number"
            name="number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={productData.number}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter phone number"
            required
          />
          {!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(productData.number) &&
            productData.number.length > 0 && (
              <p className="text-red-500 text-sm">
                Please enter a valid phone number.
              </p>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="relevantTags"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Relevant Tags
          </label>
          <input
            id="relevantTags"
            name="relevantTags"
            type="text"
            value={productData.relevantTags}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            placeholder="Enter relevant tags (comma separated)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Map Embed Link:
          </label>
          <input
            type="text"
            name="mapEmbedLink"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            onChange={handleChange}
            value={productData.mapEmbedLink}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Website
          </label>
          <input
            type="url"
            name="websiteUrl"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            onChange={handleChange}
            value={productData.websiteUrl}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            About
          </label>
          <ReactQuill style={{background:'white'}} value={productData.about} onChange={handleQuillChange} />
        </div>
        <button
          type="submit"
          disabled={!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(productData.number)}
          className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductPostPage;