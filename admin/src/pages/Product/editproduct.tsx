import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../css/app.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProductPage = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagePreview, setProductImagePreview] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [generalImage, setGeneralImage] = useState<File | null>(null);
  const [generalImagePreview, setGeneralImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      let isMounted = true;
      try {
        const response = await fetch(`http://localhost:5000/api/products/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        if (isMounted) {
          setProduct({
            title: data.title || '',
            category: data.categoryId.slug || '',
            subcategory: data.subcategoryId.slug || '',
            location: data.location || '',
            rating: data.rating || 1,
            phoneNumber: data.phoneNumber || '',
            websiteUrl: data.websiteUrl || '',
            about: data.about || '',
            status: data.status || 'Open',
            mapEmbedLink: data.mapEmbedLink || '',
            relevantTags: data.relevantTags || [],
            image: data.image || null,
            gallery: data.gallery || [],
            productImages: data.productImages || [],
            keywords: data.keywords || '',
          });
          setLoading(false);
          setKeywords(data.keywords || ''); 
          setSelectedCategory(data.categoryId.slug || '');
          setSelectedSubcategory(data.subcategoryId.slug || '');
          if (data.image) {
            const image:any =`http://localhost:5173/src/images/uploads/image/${data.image}`
            setGeneralImagePreview(image);
          }
          if(data.productImages && data.productImages.length > 0) {
            const productImages = data.productImages.map(
              (image: any) => `http://localhost:5173/src/images/uploads/productImages/${image}`
            );
            setProductImagePreview(productImages)
          }
          if (data.gallery && data.gallery.length > 0) {
            const galleryPreviews = data.gallery.map(
              (image: any) => `http://localhost:5173/src/images/uploads/gallery/${image}`
            );
            setGalleryImagePreviews(galleryPreviews);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('There was an error fetching the product. Please try again later.');
      }
    };

    fetchProduct();
  }, [slug, id]);
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/subcategories/${selectedCategory}`);
          if (!response.ok) throw new Error('Failed to fetch subcategories');
          const data = await response.json();
          setSubcategories(data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      fetchSubcategories();
    }
  }, [selectedCategory]);
  const handleChange = (event: any) => {
    setProduct((prevData: any) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory(''); 
  };
  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  };
  const handleGeneralImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setProduct((prevData: any) => ({
        ...prevData,
        images: {
          ...prevData.images,
          generalImage: file,
        },
      }));
      setGeneralImagePreview(URL.createObjectURL(file));
    }
  };  
  const handleProductImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = Array.from(event.target.files);
      setProductImagePreview(file.map((files: File) => URL.createObjectURL(files)));
      setProductImages(file)
    }
  };
  const handleGalleryImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setGalleryImages(files);
      setGalleryImagePreviews(files.map((file: File) => URL.createObjectURL(file)));
    }
  };
  const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keywordString = event.target.value;
    setKeywords(keywordString);
    setProduct((prevData: any) => ({
      ...prevData,
      keywords: keywordString.split(',').map((keyword: string) => keyword.trim()),
    }));
  };  
  const handleQuillChange = (value: string) => {
    setProduct((prevData: any) => ({ ...prevData, about: value }));
  };
  const handleRemoveImage = (index: number) => {
    const updatedGalleryPreviews = [...galleryImagePreviews];
    const updatedGalleryImages = [...galleryImages];
    updatedGalleryPreviews.splice(index, 1);
    updatedGalleryImages.splice(index, 1);
    setGalleryImagePreviews(updatedGalleryPreviews);
    setGalleryImages(updatedGalleryImages);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('categoryId', selectedCategory);
    formData.append('subcategoryId', selectedSubcategory);
    formData.append('location', product.location);
    formData.append('rating', product.rating.toString());
    formData.append('phoneNumber', product.phoneNumber);
    formData.append('websiteUrl', product.websiteUrl);
    formData.append('about', product.about);
    formData.append('status', product.status);
    formData.append('mapEmbedLink', product.mapEmbedLink);
    formData.append('relevantTags', product.relevantTags.join(','));
    formData.append('keywords', keywords);
   if (generalImage) {
      formData.append('image', product.image);
    }
    galleryImages.forEach((image: any) => {
      formData.append('gallery', image);
    });
    productImages.forEach((image: any) => {
      formData.append('productImages', image);
    });
    try {
      const response = await fetch(`http://localhost:5000/api/products/${slug}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setGeneralImagePreview(updatedProduct.image
          ? `http://localhost:5173/src/images/uploads/image/${updatedProduct.image}`
          : null
        );
        if (updatedProduct.gallery) {
          const galleryPreviews = updatedProduct.gallery.map(
            (image: any) => `http://localhost:5173/src/images/uploads/gallery/${image}`
          );
          setGalleryImagePreviews(galleryPreviews);
        }
        if(updatedProduct.productImages){
         const productImages= updatedProduct.productImages.map(
           (image: any) =>`http://localhost:5173/src/images/uploads/productImages/${updatedProduct.image}`
         )
          setProductImagePreview(productImages)
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
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory: any) => (
                <option key={subcategory._id} value={subcategory.slug}>
                  {subcategory.name}
                </option>
              ))}
            </select>
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
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={product.rating}
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
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={product.status}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Relevant Tags
          </label>
          <input
            type="text"
            name="relevantTags"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            value={
              Array.isArray(product.relevantTags)
                ? product.relevantTags.join(',')
                : ''
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            value={keywords}
            onChange={handleKeywordsChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            General Image
          </label>
          <input
            type="file"
            onChange={handleGeneralImageChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
          />
          {generalImagePreview && (
            <div className="mt-2">
              <img
                src={generalImagePreview}
                alt="General Image"
                height={80}
                width={150}
                className="rounded-lg border border-stroke shadow-sm"
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Product Image
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
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Gallery Images
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
        <div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Map Embed Link:
          </label>
          <input
            type="text"
            name="mapEmbedLink"
            className="mt-2 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent py-2 px-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            value={product.mapEmbedLink}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            About
          </label>
          <ReactQuill value={product.about} onChange={handleQuillChange} />
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