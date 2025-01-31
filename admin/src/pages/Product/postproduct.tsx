import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import "../../css/app.css";

const ProductPostPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productData, setProductData] = useState<any>({
    image: null,
    category: "",
    title: "",
    location: "",
    rating: 1, 
    number: "",
    status: "Open", 
    relevantTags: "",
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setProductData({ ...productData, image: file });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!productData.number || !phoneRegex.test(productData.number)) {
      alert('Please provide a valid phone number');
      return;
    }
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("category", productData.category);
    formData.append("location", productData.location);
    formData.append("rating", productData.rating.toString());
    formData.append("phoneNumber", productData.number);
    formData.append("status", productData.status);
    formData.append("relevantTags", productData.relevantTags);
    if (productData.image instanceof File) {
      formData.append("image", productData.image);
    }
    try {
      const response = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
  
      const result = await response.json();
      console.log('Product created successfully:', result);
      alert('Product created successfully!');
      setProductData({
        image: null,
        category: "",
        title: "",
        location: "",
        rating: 1,
        number: "",
        status: "Open",
        relevantTags: "",
      });
      setImagePreview(null); 
   } catch (error) {
      console.error('Error submitting product:', error);
      alert('Error submitting the product!');
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Create Product Post" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent py-2 px-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Product Preview" className="w-full max-w-xs object-cover rounded-md" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-white">Category</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Restaurants</option>
            <option value="fashion">Shopping</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
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
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-white">Location</label>
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
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-white">Rating</label>
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
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
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
          {/* Show validation message if number is not valid */}
          {!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(productData.number) && productData.number.length > 0 && (
            <p className="text-red-500 text-sm">Please enter a valid phone number.</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white">Status</label>
          <select
            id="status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          >
            <option value="active">Open</option>
            <option value="inactive">Closed</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="relevantTags" className="block text-sm font-medium text-gray-700 dark:text-white">Relevant Tags</label>
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
