import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const EditSubCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState<any>(null);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);  
  useEffect(() => {
    const fetchSubCategory = async () => {
      const response = await fetch(`http://localhost:5000/api/subcategory/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setSubCategory(data);
        setName(data.name);
        setCategoryId(data.categoryId);
        if (data.image) {
          setImagePreview(`http://localhost:5173/src/images/subcategory_uploads/${data.image}`);
        }
      } else {
        console.error('Failed to fetch subcategory');
      }
    };
    fetchSubCategory();
  }, [slug]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageType', 'subcategory');
    formData.append("name", name);
    formData.append("categoryId", categoryId);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await fetch(`http://localhost:5000/api/subcategories/${slug}`, {
        method: "PUT",
        body: formData,
      });
      const responseData = await response.json();
      if (response.ok) {
        navigate('/category');
      } else {
        alert("Failed to update subcategory");
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };
  

  return (
    subCategory ? (
      <div className="container mx-auto p-6">
        <Breadcrumb  pageName="Edit SubCategory"/>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
            <input
            id="subcategory"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Category</label>
            <input
            id="category"
              type="text"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
               required            
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Image</label>
            <input
              type="file" onChange={handleImageChange} 
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            />
          </div>
          {imagePreview && (
              <div className="px-6.5">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="rounded-lg border border-stroke shadow-sm"
                />
              </div>
            )}
          <button type="submit" className="w-full mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">Save</button>
        </form>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default EditSubCategory;