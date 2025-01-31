import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../css/app.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>({});
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [image, setImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: string }>({ text: '', type: '' });
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
          setName(data.name);
          setSubcategories(data.subcategories.map((sub: any) => sub.name).join(', '));
          
          if (data.image) {
            setImagePreview(`http://localhost:5173/src/images/uploads/${data.image}`);
          }
        } else {
          setMessage({ text: 'Failed to load category data.', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'Error fetching category data.', type: 'error' });
      }
    };
    fetchCategory();
  }, [id]);
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('subcategories', subcategories);
  
    if (!image && category.image) {
      formData.append('existingImage', category.image);
    }
  
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        const updatedCategory = await response.json();
        setMessage({ text: 'Category updated successfully!', type: 'success' });
        navigate('/posted-category'); 
      } else {
        setMessage({ text: 'Failed to update category', type: 'error' });
      }
    } catch (error: any) {
      setMessage({ text: 'Error: ' + error.message, type: 'error' });
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb pageName="Edit Category" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-white">
            Category Name
          </label>
          <input
            id="category"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange} 
            className="mt-2 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent py-2 px-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Image Preview</label>
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-2 w-full max-w-xs rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700 dark:text-white">
            Subcategories (comma separated)
          </label>
          <input
            id="subcategories"
            type="text"
            value={subcategories} 
            onChange={(e) => setSubcategories(e.target.value)} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-primary"
            required
          />
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

export default EditCategory;