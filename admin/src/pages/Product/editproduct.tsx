import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../css/app.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);

  const handleQuillChange = (value: string) => {
    setProduct((prevData: any) => ({ ...prevData, about: value }));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  const handleImageChange = (event: any) => {
    if (event.target.files) {
      setProduct((prevProduct: any) => ({
        ...prevProduct,
        image: event.target.files[0],
      }));
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      setImagePreview(previewUrl);
    }
  };
  const handleGalleryImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setGalleryImages((prevImages: any) => [...prevImages, ...files]);
      const previewUrls = files.map(file => URL.createObjectURL(file));
      setGalleryImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    }
  };  
  
  const handleRemoveImage = async (index: number) => {
    const imageToRemove = galleryImagePreviews[index];
    if (!imageToRemove) {
      console.error('No image found at index:', index);
      return;
    }
    const imageName = imageToRemove.split('/').pop(); 
    if (!imageName) {
      console.error('Failed to extract image name');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/gallery/${imageName}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
        setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setGalleryImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };  
  
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
        if (data.image) {
          setImagePreview(`http://localhost:5173/src/images/uploads/${data.image}`);
        }
        if (data.gallery && data.gallery.length > 0) {
          const galleryPreviews = data.gallery.map((image:any) => 
            `http://localhost:5173/src/images/uploads/${image}`
          );
          setGalleryImagePreviews(galleryPreviews);
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
    formData.append('websiteUrl', product.websiteUrl);
    formData.append('about', product.about);
    formData.append('status', product.status);
    formData.append('relevantTags', product.relevantTags.join(','));
    galleryImages.forEach((image: any) => {
      formData.append('galleryImages', image);
    });
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
        setImagePreview(
          updatedProduct.image
            ? `http://localhost:5173/src/images/uploads/${updatedProduct.image}`
            : null
        );
  
        if (updatedProduct.gallery) {
          const galleryPreviews = updatedProduct.gallery.map(
            (image: any) => `http://localhost:5173/src/images/gallery/${image}`
          );
          setGalleryImagePreviews(galleryPreviews);
        }
  
        navigate('/posted-product');
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;


  return (
    <div>
      <Breadcrumb pageName="Edit Product" />
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Category
          </label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Location
          </label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Rating
          </label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Phone Number
          </label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="phoneNumber"
            value={product.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Status
          </label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="status"
            value={product.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Relevant Tags
          </label>
          <input
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            type="text"
            name="relevantTags"
            value={product.relevantTags.join(',')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="product"
              style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
            />
          )}
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white">
    Product Gallery
  </label>
  <input
    type="file"
    multiple
    onChange={handleGalleryImageChange}
    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
  />
  <div className="mt-4 grid grid-cols-3 gap-4">
    {galleryImagePreviews.map((preview, index) => (
      <div key={index} className="relative">
        <img
          src={preview}
          alt={`gallery-image-${index}`}
          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
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
            Website
          </label>
          <input
            type="url"
            name="websiteUrl"
            className="mt-2 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent py-2 px-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            value={product.websiteUrl}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            About
          </label>
          <ReactQuill value={product.about}  onChange={handleQuillChange} />
        </div>
        <button
          type="submit"
          className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
