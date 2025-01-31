import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'; 
import '../../css/app.css';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        // Set the image preview if the product has an image
        if (data.image) {
          setImagePreview(`http://localhost:5173/src/images/uploads/${data.image}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('category', product.category);
    formData.append('location', product.location);
    formData.append('rating', product.rating.toString());
    formData.append('phoneNumber', product.phoneNumber);
    formData.append('status', product.status);
    formData.append('relevantTags', product.relevantTags.join(','));

    if (image) formData.append('image', image);

    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      console.log('Product updated:', updatedProduct);
      // Update the image preview after update
      setImagePreview(updatedProduct.image ? `http://localhost:5173/src/images/uploads/${updatedProduct.image}` : null);
      navigate('/posted-product');
    } else {
      console.error('Failed to update product');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file); // Create preview for the uploaded image
      setImagePreview(previewUrl); // Set the preview state
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Breadcrumb pageName="Edit Product" />
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
          <input
            type="text"
            name="title"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Category</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Location</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Rating</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="phoneNumber"
            value={product.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Status</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="status"
            value={product.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Relevant Tags</label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="relevantTags"
            value={product.relevantTags.join(',')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Image</label>
          <input type="file" onChange={handleImageChange} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"/>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="product"
              style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
            />
          )}
        </div>
        <button type="submit" className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProductPage;
